import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import { _getTableData } from 'src/actions/summaryChart';
import typeaheadCacheSelector from 'src/selectors/reportFilterTypeaheadCache';
import { hasSubaccounts } from 'src/selectors/subaccounts';

import { TableCollection, Unit, PanelLoading } from 'src/components';
import GroupByOption from './GroupByOption';
import { Empty } from 'src/components';
import { Panel, Table, Box } from 'src/components/matchbox';
import { GROUP_CONFIG } from '../constants/tableConfig';
import _ from 'lodash';

import styles from './ReportTable.module.scss';

const tableWrapper = props => {
  return (
    <Panel>
      <Table freezeFirstColumn>{props.children}</Table>
    </Panel>
  );
};

export const ReportTable = props => {
  const {
    _getTableData,
    hasSubaccounts,
    metrics,
    tableData = [],
    tableLoading,
    typeaheadCache,
  } = props;

  //TODO RB CLEANUP: Change value. Default has to be 'aggregate' for now due to sharing reducer with non-hibana summary report
  const groupBy = props.groupBy === 'aggregate' ? 'placeholder' : props.groupBy;

  const getColumnHeaders = () => {
    const primaryCol = {
      key: 'group-by',
      label: GROUP_CONFIG[groupBy].label,
      className: cx(styles.HeaderCell, styles.FirstColumnHeader),
      sortKey: GROUP_CONFIG[groupBy].keyName,
    };

    const metricCols = metrics.map(({ label, key }) => ({
      key,
      label: <Box textAlign={'right'}>{label}</Box>,
      className: cx(styles.HeaderCell, styles.NumericalHeader),
    }));

    return [primaryCol, ...metricCols];
  };

  const getSubaccountFilter = subaccountId => {
    if (subaccountId === 0) {
      return { type: 'Subaccount', value: 'Master Account (ID 0)', id: 0 };
    }

    const subaccount = _.find(typeaheadCache, { type: 'Subaccount', id: subaccountId });
    const value = _.get(subaccount, 'value') || `Deleted (ID ${subaccountId})`;
    return { type: 'Subaccount', value, id: subaccountId };
  };

  const getRowData = () => {
    const group = GROUP_CONFIG[groupBy];

    return row => {
      const filterKey = row[group.keyName];
      const newFilter =
        group.label === 'Subaccount'
          ? getSubaccountFilter(filterKey)
          : { type: group.label, value: filterKey };

      const primaryCol = newFilter.value;
      const metricCols = metrics.map(({ key, unit }) => (
        <Box textAlign={'right'} key={key}>
          <Unit value={row[key]} unit={unit} />
        </Box>
      ));

      return [primaryCol, ...metricCols];
    };
  };

  const getDefaultSortColumn = () => {
    return metrics[0].key;
  };

  const renderTable = () => {
    if (groupBy === 'placeholder') {
      return null;
    }
    if (tableLoading) {
      return <PanelLoading minHeight={'250px'} />;
    }

    if (!tableData.length) {
      return <Empty message="There is no data to display" />;
    }

    const rowKeyName = GROUP_CONFIG[groupBy].keyName;
    return (
      <TableCollection
        rowKeyName={rowKeyName}
        columns={getColumnHeaders()}
        getRowData={getRowData()}
        pagination
        defaultPerPage={10}
        rows={tableData}
        defaultSortColumn={getDefaultSortColumn()}
        defaultSortDirection="desc"
        wrapperComponent={tableWrapper}
      />
    );
  };

  return (
    <>
      <Panel marginBottom={0}>
        <Panel.Section>
          <GroupByOption
            _getTableData={_getTableData}
            groupBy={groupBy}
            hasSubaccounts={hasSubaccounts}
            tableLoading={tableLoading}
          />
        </Panel.Section>
      </Panel>
      <div data-id={'summary-table'}>{renderTable()}</div>
    </>
  );
};

const mapStateToProps = state => ({
  typeaheadCache: typeaheadCacheSelector(state),
  hasSubaccounts: hasSubaccounts(state),
  ...state.summaryChart,
});

export default connect(mapStateToProps, { _getTableData })(ReportTable);
