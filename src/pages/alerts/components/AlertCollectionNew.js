import React, { Component } from 'react';
import { Button, Table, Tag, Panel } from '@sparkpost/matchbox';
import { TableCollection, PageLink, DisplayDate } from 'src/components';
import AlertToggle from './AlertToggleNew';
import { Delete } from '@sparkpost/matchbox-icons';
import { METRICS } from '../constants/metricsV1';
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
  //TODO replace link
  getDetailsLink = ({ id }) => `/alerts/edit/${id}`;

  getColumns() {
    const columns = [
      { label: 'Alert Name', sortKey: 'name', width: '40%', className: styles.TabbedCellHeader },
      { label: 'Metric', sortKey: 'metric' },
      { label: 'Last Triggered', sortKey: 'last_triggered_timestamp' },
      { label: 'Status', sortKey: 'muted' },
      null
    ];

    return columns;
  }

  getRowData = ({ metric, muted, id, name, last_triggered_timestamp, last_triggered_formatted }) => {
    const deleteFn = () => this.props.handleDelete({ id, name });
    return [
      <div className = {styles.TabbedCellBody}>
        <PageLink to={this.getDetailsLink({ id })}>{name}</PageLink>
      </div>,
      <Tag>{_.get(METRICS, metric, metric)}</Tag>,
      <DisplayDate timestamp={last_triggered_timestamp} formattedDate={last_triggered_formatted || 'Never Triggered'} />,
      <AlertToggle muted={muted} id={id} />,
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
        defaultSortColumn='last_triggered_timestamp'
        defaultSortDirection='desc'
      >
        {
          ({ filterBox, collection, pagination }) =>
            <>
            <Panel >
              <Panel.Section className = {styles.Title}>
                <h3>All Alerts</h3>
              </Panel.Section>

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
