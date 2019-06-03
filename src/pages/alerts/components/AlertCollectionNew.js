import React, { Component, Fragment } from 'react';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import { Button, Tag } from '@sparkpost/matchbox';
import { TableCollection, PageLink } from 'src/components';
import AlertToggle from './AlertToggle';
import { Delete } from '@sparkpost/matchbox-icons';
import { METRICS } from '../constants/metrics';
import _ from 'lodash';

const filterBoxConfig = {
  show: true,
  itemToStringKeys: ['name'],
  placeholder: 'Search...'
};

class AlertCollectionNew extends Component {
  //TODO Add last triggered date
  getDetailsLink = ({ id, subaccount_id }) => `/alerts/edit/${id}${setSubaccountQuery(subaccount_id)}`

  getColumns() {
    const columns = [
      { label: 'Name', sortKey: 'name', width: '40%' },
      { label: 'Metric', sortKey: 'alert_metric' },
      { label: 'Last Triggered', sortKey: '' },
      { label: 'Enabled', sortKey: 'enabled' },
      null
    ];

    return columns;
  }

  getRowData = ({ alert_metric, enabled, id, name, subaccount_id }) => {

    const deleteFn = () => this.props.toggleDelete({ id, name, subaccount_id });

    return [
      <Fragment>
        <PageLink to={this.getDetailsLink({ id, subaccount_id })}>{name}</PageLink>
      </Fragment>,
      <Tag>{_.get(METRICS, alert_metric, alert_metric)}</Tag>,
      <></>,
      <AlertToggle enabled={enabled} id={id} subaccountId={subaccount_id} />,
      <Button flat onClick = {deleteFn}><Delete/></Button>
    ];
  }

  render() {
    const { alerts } = this.props;

    return (
      <TableCollection
        title = {'All Alerts'}
        isV2Table={true}
        columns={this.getColumns()}
        rows={alerts}
        getRowData={this.getRowData}
        pagination={true}
        filterBox={filterBoxConfig}
        defaultSortColumn='name'
        defaultSortDirection='desc'
      />
    );
  }
}

export default AlertCollectionNew;
