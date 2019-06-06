import React, { Component } from 'react';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import { Button, Table, Tag, Panel } from '@sparkpost/matchbox';
import { TableCollection, PageLink } from 'src/components';
import AlertToggle from './AlertToggle';
import { Delete } from '@sparkpost/matchbox-icons';
import { METRICS } from '../constants/metrics';
import styles from './AlertCollection.module.scss';
import { formatDateTime } from 'src/helpers/date';
import _ from 'lodash';
import DisplayDate from '../../reports/messageEvents/components/DisplayDate';//TODO Move this into generic component

const filterBoxConfig = {
  show: true,
  itemToStringKeys: ['name'],
  placeholder: 'Search...',
  wrapper: (props) => (
    <div className = {styles.FilterBox}>
      {props}
    </div>)
};

class AlertCollectionNew extends Component {
  //TODO Add last triggered date and replace link
  getDetailsLink = ({ id, subaccount_id }) => `/alerts/edit/${id}${setSubaccountQuery(subaccount_id)}`

  getColumns() {
    const columns = [
      { label: 'Alert Name', sortKey: 'name', width: '40%', className: styles.TabbedCellBody },
      { label: 'Metric', sortKey: 'alert_metric' },
      { label: 'Last Triggered', sortKey: '' },
      { label: 'Status', sortKey: 'enabled' },
      null
    ];

    return columns;
  }

  getRowData = ({ alert_metric, enabled, id, name, subaccount_id }) => {

    const deleteFn = () => this.props.handleDelete({ id, name, subaccount_id });
    //TODO remove when real data is available through API
    const timestamp = '2019-06-05T20:29:59.000Z';
    const lastTriggeredDate = formatDateTime(timestamp);
    return [
      <div className = {styles.TabbedCellHeader}>
        <PageLink to={this.getDetailsLink({ id, subaccount_id })}>{name}</PageLink>
      </div>,
      <Tag>{_.get(METRICS, alert_metric, alert_metric)}</Tag>,
      <DisplayDate timestamp={timestamp} formattedDate={lastTriggeredDate} />,
      <AlertToggle enabled={enabled} id={id} subaccountId={subaccount_id} />,
      <Button flat onClick = {deleteFn}><Delete className = {styles.Icon}/></Button>
    ];
  }

  TableWrapper = (props) => (
    <>
      <div className={styles.TableWrapper}>
        <Table>{props.children}</Table>
      </div>
    </>
  );

  render() {
    const { alerts } = this.props;

    return (
      <TableCollection
        wrapperComponent={this.TableWrapper}
        columns={this.getColumns()}
        rows={alerts}
        getRowData={this.getRowData}
        pagination={true}
        filterBox={filterBoxConfig}
        defaultSortColumn='name'
        defaultSortDirection='desc'
      >
        {
          ({ filterBox, collection, pagination }) =>
            <>
            <Panel title='All Alerts'>
              {filterBox}
              {collection}
            </Panel>
            {pagination}
          </>
        }
      </TableCollection>
    );
  }
}

export default AlertCollectionNew;
