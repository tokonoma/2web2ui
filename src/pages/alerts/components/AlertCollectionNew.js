import React, { Component } from 'react';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import { Button, Table, Tag, Panel } from '@sparkpost/matchbox';
import { TableCollection, PageLink } from 'src/components';
import AlertToggle from './AlertToggle';
import { Delete } from '@sparkpost/matchbox-icons';
import { METRICS } from '../constants/metrics';
import styles from './AlertCollection.module.scss';
import _ from 'lodash';

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

    const deleteFn = () => this.props.toggleDelete({ id, name, subaccount_id });

    return [
      <div className = {styles.TabbedCellHeader}>
        <PageLink to={this.getDetailsLink({ id, subaccount_id })}>{name}</PageLink>
      </div>,
      <Tag>{_.get(METRICS, alert_metric, alert_metric)}</Tag>,
      <></>,
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
