import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import { Button, Popover, ActionList, Tag } from '@sparkpost/matchbox';
import { TableCollection, PageLink } from 'src/components';
import { MoreHoriz } from '@sparkpost/matchbox-icons';
import { METRICS } from '../constants/metrics';
import _ from 'lodash';

const filterBoxConfig = {
  show: true,
  itemToStringKeys: ['name', 'id', 'enabled', 'alert_metric'],
  exampleModifiers: ['enabled', 'alert_metric']
};

class AlertCollection extends Component {
  getDetailsLink = ({ id, subaccount_id }) => `/alerts-new/edit/${id}${setSubaccountQuery(subaccount_id)}`

  getColumns() {
    const columns = [
      { label: 'Name', sortKey: 'name', width: '25%' },
      { label: 'Metric', sortKey: 'alert_metric' },
      { label: 'Enabled', sortKey: 'enabled' },
      null
    ];

    return columns;
  }

  getRowData = ({ alert_metric, enabled, id, name, subaccount_id }) => {
    const actions = [
      {
        content: 'Edit Alert',
        to: this.getDetailsLink({ id, subaccount_id }),
        component: Link,
        section: 1
      },
      {
        content: 'Delete Alert',
        onClick: () => this.props.toggleDelete(id, subaccount_id),
        section: 2
      }
    ];

    return [
      <Fragment>
        <PageLink to={this.getDetailsLink({ id, subaccount_id })}>{name}</PageLink>
      </Fragment>,
      <Tag>{_.get(METRICS, `${alert_metric}.label`, alert_metric)}</Tag>,
      <Tag color={enabled ? 'blue' : null}>
        {enabled ? 'Enabled' : 'Disabled'}
      </Tag>,
      <div style={{ textAlign: 'right' }}>
        <Popover left trigger={<Button flat size='large'><MoreHoriz size={21}/></Button>}>
          <ActionList actions={actions}/>
        </Popover>
      </div>
    ];
  }

  render() {
    const { alerts } = this.props;

    return (
      <TableCollection
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

export default AlertCollection;
