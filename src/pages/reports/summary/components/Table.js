import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import { _getTableData } from 'src/actions/summaryChart';
import { addFilters } from 'src/actions/reportOptions';
import typeaheadCacheSelector from 'src/selectors/reportFilterTypeaheadCache';
import { hasSubaccounts } from 'src/selectors/subaccounts';

import { TableCollection, TableHeader, Unit, Loading } from 'src/components';
import GroupByOption from './GroupByOption';
import { Empty } from 'src/components';
import { Panel, UnstyledLink } from '@sparkpost/matchbox';
import { GROUP_CONFIG } from './tableConfig';
import _ from 'lodash';

import styles from './Table.module.scss';
import qs from 'qs';
import { stringifyTypeaheadfilter } from 'src/helpers/string';
import { selectSummaryChartSearchOptions } from 'src/selectors/reportSearchOptions';

export class Table extends Component {

  handleRowClick = (item, e) => {
    this.props.addFilters([item]);
    e.preventDefault();
  };

  getColumnHeaders() {
    const { metrics, groupBy } = this.props;
    const isAggColumn = groupBy === 'aggregate';

    const primaryCol = isAggColumn
      ? null
      : {
        label: GROUP_CONFIG[groupBy].label,
        className: styles.HeaderCell,
        sortKey: GROUP_CONFIG[groupBy].keyName
      };

    const metricCols = metrics.map(({ label, key }) => ({
      key,
      label: <div className={styles.RightAlign}>{label}</div>,
      className: cx(styles.HeaderCell, styles.NumericalHeader),
      sortKey: isAggColumn ? null : key
    }));

    return [primaryCol, ...metricCols];
  }

  getSubaccountFilter = (subaccountId) => {
    const { typeaheadCache } = this.props;

    if (subaccountId === 0) {
      return { type: 'Subaccount', value: 'Master Account (ID 0)', id: 0 };
    }

    const subaccount = _.find(typeaheadCache, { type: 'Subaccount', id: subaccountId });
    const value = _.get(subaccount, 'value') || `Deleted (ID ${subaccountId})`;
    return { type: 'Subaccount', value, id: subaccountId };
  };

  getRowData = () => {
    const { metrics, groupBy, searchOptions } = this.props;
    const group = GROUP_CONFIG[groupBy];

    return (row) => {
      const filterKey = row[group.keyName];
      const filter = (group.label === 'Subaccount')
        ? this.getSubaccountFilter(filterKey)
        : { type: group.label, value: filterKey };

      const currentFilters = searchOptions.filters || [];
      const mergedFilters = _.uniqWith([ ...currentFilters, stringifyTypeaheadfilter(filter)], _.isEqual);
      const linkParams = qs.stringify({ ...searchOptions, filters: mergedFilters }, { arrayFormat: 'repeat' });

      const primaryCol = groupBy === 'aggregate' ? 'Aggregate Total' : <UnstyledLink onClick={(e) => this.handleRowClick(filter, e)} to={`/reports/summary/?${linkParams}`}>{filter.value} </UnstyledLink>;
      const metricCols = metrics.map((metric) => (
        <div className={styles.RightAlign}>
          <Unit value={row[metric.key]} unit={metric.unit}/>
        </div>
      ));

      return [primaryCol, ...metricCols];
    };
  }

  getDefaultSortColumn = () => {
    const { metrics } = this.props;
    return metrics[0].key;
  }

  renderAggregateTable() {
    const { tableData } = this.props;

    return (
      <TableCollection
        headerComponent={() => <TableHeader columns={this.getColumnHeaders()}/>}
        getRowData={this.getRowData()}
        rows={tableData}
      />
    );
  }

  renderGroupByTable() {
    const { tableData, groupBy } = this.props;
    const rowKeyName = GROUP_CONFIG[groupBy].keyName;

    return (
      <TableCollection
        rowKeyName={rowKeyName}
        columns={this.getColumnHeaders()}
        getRowData={this.getRowData()}
        pagination
        defaultPerPage={10}
        rows={tableData}
        defaultSortColumn={this.getDefaultSortColumn()}
        defaultSortDirection='desc'
      />
    );
  }

  renderTable() {
    const { tableData, tableLoading, groupBy } = this.props;

    if (tableLoading) {
      return (
        <div className={styles.LoadingSection}>
          <div className={styles.Loading}><Loading /></div>
        </div>
      );
    }

    if (!tableData.length) {
      return <Empty message='There is no data to display' />;
    }

    return (
      groupBy === 'aggregate'
        ? this.renderAggregateTable()
        : this.renderGroupByTable()
    );
  }

  render() {
    const { groupBy, hasSubaccounts, tableLoading, _getTableData } = this.props;
    return (
      <Panel>
        <Panel.Section>
          <GroupByOption
            _getTableData={_getTableData}
            groupBy={groupBy}
            hasSubaccounts={hasSubaccounts}
            tableLoading={tableLoading} />
        </Panel.Section>
        {this.renderTable()}
      </Panel>
    );
  }
}

const mapStateToProps = (state) => ({
  typeaheadCache: typeaheadCacheSelector(state),
  hasSubaccounts: hasSubaccounts(state),
  searchOptions: selectSummaryChartSearchOptions(state),
  ...state.summaryChart
});
export default connect(mapStateToProps, { _getTableData, addFilters })(Table);
