import React, { Component } from 'react';
import _ from 'lodash';
import { TableCollection, Empty, LongTextContainer } from 'src/components';
import { Percent } from 'src/components/formatters';
import { safeRate } from 'src/helpers/math';
import AddFilterLink from '../../components/AddFilterLink';

const columns = [
  { label: 'Reason', sortKey: 'reason', width: '45%' },
  { label: 'Domain', sortKey: 'domain' },
  { label: 'Total Delays', sortKey: 'count_delayed' },
  { label: 'Delayed First Attempt (%)', sortKey: 'count_delayed_first' }
];

export class DelaysDataTable extends Component {
  getRowData = (rowData) => {
    const { totalAccepted } = this.props;
    const { reason, domain, count_delayed, count_delayed_first } = rowData;
    return [
      <LongTextContainer text={reason} />,
      <AddFilterLink newFilter={{ type: 'Recipient Domain', value: domain }} reportType={'delayed'} content={domain}/>,
      count_delayed,
      <span>{count_delayed_first} (<Percent value={safeRate(count_delayed_first, totalAccepted)} />)</span>
    ];
  }

  render() {
    const { rows } = this.props;

    if (_.isEmpty(rows)) {
      return <Empty message={'No delayed messages to report'} />;
    }

    return <TableCollection
      columns={columns}
      rows={rows}
      getRowData={this.getRowData}
      pagination
      defaultSortColumn='count_delayed'
      defaultSortDirection='desc'
    />;
  }
}

export default DelaysDataTable;
