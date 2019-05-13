import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import { ActionList, Button, Popover, Tag } from '@sparkpost/matchbox';
import { TableCollection, PageLink } from 'src/components';
import AlertToggle from './AlertToggle';
import { MoreHoriz } from '@sparkpost/matchbox-icons';
import { METRICS } from '../constants/metrics';
import _ from 'lodash';

const filterBoxConfig = {
  show: true,
  exampleModifiers: ['enabled', 'metric'],
  itemToStringKeys: ['name', 'id', 'enabled', 'metric'],
  keyMap: { metric: 'alert_metric' }
};

class AlertCollection extends Component {
  getDetailsLink = ({ id, subaccount_id }) => `/alerts/edit/${id}${setSubaccountQuery(subaccount_id)}`

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
        onClick: () => this.props.toggleDelete({ id, name, subaccount_id }),
        section: 2
      }
    ];

    return [
      <Fragment>
        <PageLink to={this.getDetailsLink({ id, subaccount_id })}>{name}</PageLink>
      </Fragment>,
      <Tag>{_.get(METRICS, alert_metric, alert_metric)}</Tag>,
      <AlertToggle enabled={enabled} id={id} subaccountId={subaccount_id} />,
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
