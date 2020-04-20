import React from 'react';
import classnames from 'classnames';
import { Table } from 'src/components/matchbox';
import useHibanaToggle from 'src/hooks/useHibanaToggle';
import HeaderLabel from './HeaderLabel';
import styles from './SummaryTable.module.scss';

function OGHead({ columns, onSort, order }) {
  return (
    <thead>
      <Table.Row>
        {columns.map(({ align = 'left', dataKey, label, sortable, width }) => (
          <Table.HeaderCell
            className={classnames(styles.Header, {
              [styles.CenterAlign]: align === 'center',
              [styles.RightAlign]: align === 'right',
            })}
            key={`header-${dataKey}`}
            width={width}
          >
            <HeaderLabel
              dataKey={dataKey}
              label={label}
              onSort={onSort}
              order={order}
              sortable={sortable}
            />
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </thead>
  );
}

function HibanaHead({ columns, onSort, order }) {
  return (
    <thead>
      <Table.Row header>
        {columns.map(({ align = 'left', dataKey, label, sortable, width }) => (
          <Table.HeaderCell style={{ 'text-align': align }} key={`header-${dataKey}`} width={width}>
            <HeaderLabel
              dataKey={dataKey}
              label={label}
              onSort={onSort}
              order={order}
              sortable={sortable}
            />
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </thead>
  );
}

export default function Head(props) {
  return useHibanaToggle(OGHead, HibanaHead)(props);
}
