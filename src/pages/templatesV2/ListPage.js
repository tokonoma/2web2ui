import React, { Component } from 'react';
import { Page } from '@sparkpost/matchbox';
import { ApiErrorBanner, Loading, TableCollection } from 'src/components';
import { Templates } from 'src/components/images';
import PageLink from 'src/components/pageLink';
import { resolveTemplateStatus } from 'src/helpers/templates';
import { Action, LastUpdated, Name, Status } from './components/ListComponents';

import styles from './ListPage.module.scss';

export default class ListPage extends Component {
  componentDidMount() {
    this.props.listTemplates();
  }

  deleteTemplate = () => {
    alert('Deleting');
  };
  columns = [
    {
      component: Name,
      header: {
        label: 'Template Name',
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
      component: LastUpdated,
      header: {
        label: 'Last Updated',
        sortKey: 'last_update_time'
      },
      visible: () => true
    },
    {
      component: Action,
      header: null,
      visible: () => true
    }
  ];

  renderRow = (columns) => (props) => (
    columns.map(({ component: Component }) => <Component {...props} />)
  );

  render() {
    const { canModify, error, listTemplates, loading, templates } = this.props;
    const visibleColumns = this.columns.filter(({ visible }) => visible(this.props));

    if (loading) {
      return <Loading/>;
    }

    return (
      <Page
        primaryAction={(
          canModify
            ? { Component: PageLink, content: 'Create New', to: '/templates/create' }
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
          <>
            <p className={styles.LeadText}>
              Create re-usable templates that allow for dynamic personalized content. Easily communicate with your team by having a set of named templates to reference.
              Building a library of "go-to" templates for recurrent use-cases to reduce workload for your team.
            </p>
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
              saveCsv={false}
            />
          </>
        )}
      </Page>
    );
  }
}
