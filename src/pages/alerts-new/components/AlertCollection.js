import React, { Component, Fragment } from 'react';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
// import { Button, Popover, ActionList } from '@sparkpost/matchbox';
import { TableCollection, PageLink } from 'src/components';
// import { MoreHoriz } from '@sparkpost/matchbox-icons';

class AlertCollection extends Component {
  getDetailsLink = ({ id, subaccount_id }) => `/alerts/edit/${id}${setSubaccountQuery(subaccount_id)}`

  getColumns() {
    const columns = [
      { label: 'Name', sortKey: 'name' },
      { label: 'Conditions' },
      { label: 'Enabled', sortKey: 'enabled' },
      null
    ];

    return columns;
  }

  getRowData = ({ enabled, id, name }) => [
    <Fragment>
      <PageLink>{name} - {id}</PageLink>
    </Fragment>,
    <Fragment>
      {enabled ? 'enabled' : 'disabled'}
    </Fragment>,
    <div style={{ textAlign: 'right' }}>
        actions
    </div>
  ]

  render() {
    const { alerts } = this.props;
    return (
      <TableCollection
        columns={this.getColumns()}
        rows={alerts}
        getRowData={this.getRowData}
        pagination={true}
        // filterBox={filterBoxConfig}
        defaultSortColumn='name'
        defaultSortDirection='desc'
      />
    );
  }
}

export default AlertCollection;
