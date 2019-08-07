import React, { Component } from 'react';
import { Button, Table, Tag, Panel, Tooltip } from '@sparkpost/matchbox';
import { TableCollection, PageLink, DisplayDate } from 'src/components';
import AlertToggle from './AlertToggleNew';
import { Delete } from '@sparkpost/matchbox-icons';
import { METRICS } from '../constants/formConstants';
import styles from './AlertCollection.module.scss';

const filterBoxConfig = {
  show: true,
  exampleModifiers: ['name'],
  itemToStringKeys: ['name'],
  wrapper: (props) => (
    <div className = {styles.FilterBox}>
      {props}
    </div>)
};

class AlertCollectionNew extends Component {

  getDetailsLink = ({ id }) => `/alerts-new/details/${id}`;

  getColumns() {
    const columns = [
      { label: 'Alert Name', sortKey: 'name', width: '40%' },
      { label: 'Metric', sortKey: 'metric' },
      { label: 'Last Triggered', sortKey: 'last_triggered_timestamp' },
      { label: 'Active', sortKey: 'muted' },
      null
    ];

    return columns;
  }

  getRowData = ({ metric, muted, id, name, last_triggered_timestamp, last_triggered_formatted }) => {
    const deleteFn = () => this.props.handleDelete({ id, name });
    return [
      <PageLink to={this.getDetailsLink({ id })} className={styles.AlertNameLink}>{name}</PageLink>,
      <Tag>{METRICS[metric]}</Tag>,
      <DisplayDate timestamp={last_triggered_timestamp} formattedDate={last_triggered_formatted || 'Never Triggered'} />,
      <AlertToggle muted={muted} id={id} />,
      <Tooltip dark content='Delete' width='auto' horizontalOffset='-8px'>
        <Button flat onClick={deleteFn}>
          <Delete className={styles.Icon}/>
        </Button>
      </Tooltip>
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
              <Panel.Section>
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
