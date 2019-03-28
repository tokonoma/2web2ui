import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SubaccountTag, TableCollection, ApiErrorBanner, Loading } from 'src/components';
import { Templates } from 'src/components/images';
import { Page } from '@sparkpost/matchbox';
import { Name, Status, Actions, LastUpdated } from './components/ListComponents';
import { resolveTemplateStatus } from 'src/helpers/templates';
import { ROLES } from 'src/constants';

const primaryAction = {
  content: 'Create Template',
  to: '/templates/create',
  Component: Link
};

export default class ListPage extends Component {

  componentDidMount() {
    this.props.listTemplates();
  }

  renderError() {
    return (
      <ApiErrorBanner
        message={'Sorry, we seem to have had some trouble loading your templates.'}
        errorDetails={this.props.error.message}
        reload={this.props.listTemplates}
      />
    );
  }

  getRowData = ({ shared_with_subaccounts, ...rowData }) => {
    const { hasSubaccounts, userAccessLevel } = this.props;
    const { subaccount_id } = rowData;
    const canViewSubaccounts = userAccessLevel !== ROLES.SUBACCOUNT_REPORTING;

    const subaccountCell = subaccount_id || shared_with_subaccounts
      ? <SubaccountTag all={shared_with_subaccounts} id={subaccount_id} />
      : null;

    return [
      <Name {...rowData} />,
      <Status {...rowData} />,
      ...(hasSubaccounts && canViewSubaccounts ? [subaccountCell] : []),
      <LastUpdated {...rowData}/>,
      <Actions {...rowData} />
    ];
  }

  getColumns() {
    const { hasSubaccounts, userAccessLevel } = this.props;
    const canViewSubaccounts = userAccessLevel !== ROLES.SUBACCOUNT_REPORTING;
    return [
      { label: 'Name', width: '28%', sortKey: 'name' },
      { label: 'Status', width: '18%', sortKey: (template) => [resolveTemplateStatus(template).publishedWithChanges, template.published]},
      ...(hasSubaccounts && canViewSubaccounts ? [{
        label: 'Subaccount', width: '18%', sortKey: (template) => [template.subaccount_id, template.shared_with_subaccounts]
      }] : []),
      { label: 'Last Updated', sortKey: 'last_update_time' },
      null
    ];
  }

  renderCollection() {
    return (
      <TableCollection
        columns={this.getColumns()}
        rows={this.props.templates}
        getRowData={this.getRowData}
        pagination
        filterBox={{
          show: true,
          exampleModifiers: ['id', 'name'],
          itemToStringKeys: ['name', 'id', 'subaccount_id']
        }}
        defaultSortColumn='name'
      />
    );
  }

  render() {
    const { canModify, count, loading, error } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <Page
        primaryAction={canModify ? primaryAction : undefined}
        title='Templates'
        empty={{
          show: count === 0,
          image: Templates,
          title: 'Manage your email templates',
          content: <p>Build, test, preview and send your transmissions.</p>
        }} >
        {error ? this.renderError() : this.renderCollection()}
      </Page>
    );
  }
}
