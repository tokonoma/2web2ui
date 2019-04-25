import React, { Component } from 'react';
import { Page } from '@sparkpost/matchbox';
import { TableCollection, ApiErrorBanner, Loading } from 'src/components';
import { Templates } from 'src/components/images';
import PageLink from 'src/components/pageLink';
import { ROLES } from 'src/constants';
import { resolveTemplateStatus } from 'src/helpers/templates';
import { Actions, LastUpdated, Name, Status, Subaccount } from './components/ListComponents';

export default class ListPage extends Component {
  componentDidMount() {
    this.props.listTemplates();
  }

  columns = [
    {
      component: Name,
      header: {
        label: 'Name',
        sortKey: 'name'
      },
      visible: () => true
    },
    {
      component: Status,
      header: {
        label: 'Status',
        sortKey: (template) => [
          resolveTemplateStatus(template).publishedWithChanges,
          template.published
        ]
      },
      visible: () => true
    },
    {
      component: Subaccount,
      header: {
        label: 'Subaccount',
        sortKey: ({ subaccount_id, shared_with_subaccounts }) => (
          subaccount_id || shared_with_subaccounts
        )
      },
      visible: ({ hasSubaccounts, userAccessLevel }) => (
        hasSubaccounts && userAccessLevel !== ROLES.SUBACCOUNT_REPORTING
      )
    },
    {
      component: LastUpdated,
      header: {
        label: 'Last Updated',
        sortKey: 'last_update_time'
      },
      visible: () => true
    },
    {
      component: Actions,
      header: {
        content: null
      },
      visible: () => true
    }
  ]

  renderRow = (columns) => (props) => (
    columns.map(({ component: Component }) => <Component {...props} />)
  )

  render() {
    const { canModify, error, listTemplates, loading, templates } = this.props;
    const visibleColumns = this.columns.filter(({ visible }) => visible(this.props));

    if (loading) {
      return <Loading />;
    }

    return (
      <Page
        primaryAction={(
          canModify
            ? { Component: PageLink, content: 'Create Template', to: '/templates/create' }
            : undefined
        )}
        title='Templates'
        empty={{
          show: !error && templates.length === 0,
          image: Templates,
          title: 'Manage your email templates',
          content: <p>Build, test, preview and send your transmissions.</p>
        }}
      >
        {error ? (
          <ApiErrorBanner
            message={'Sorry, we seem to have had some trouble loading your templates.'}
            errorDetails={error.message}
            reload={listTemplates}
          />
        ) : (
          <TableCollection
            columns={visibleColumns.map(({ header }) => header)}
            rows={templates}
            getRowData={this.renderRow(visibleColumns)}
            pagination
            filterBox={{
              show: true,
              exampleModifiers: ['id', 'name'],
              itemToStringKeys: ['name', 'id', 'subaccount_id']
            }}
            defaultSortColumn="last_update_time"
            defaultSortDirection="desc"
          />
        )}
      </Page>
    );
  }
}
