import React from 'react';
import cx from 'classnames';
import { snakeToFriendly } from 'src/helpers/string';

import { Table } from 'src/components/matchbox';
import DisplayDate from 'src/components/displayDate/DisplayDate';

import OGStyles from './HistoryTable.module.scss';
import hibanaStyles from './HistoryTableHibana.module.scss';
import useHibanaOverride from 'src/hooks/useHibanaOverride';

const Header = () => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);
  return (
    <thead>
      <Table.Row>
        <th width="2px" />
        <Table.HeaderCell className={styles.HeaderCell} width="35%">
          Time
        </Table.HeaderCell>
        <Table.HeaderCell className={styles.HeaderCell} width="auto">
          Event
        </Table.HeaderCell>
      </Table.Row>
    </thead>
  );
};

const Row = ({ onClick, selected, type, timestamp, formattedDate }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);
  return (
    <Table.Row onClick={onClick} className={cx(styles.Row, selected && styles.selected)}>
      <td className={styles.Bar} />
      <Table.Cell>
        <DisplayDate timestamp={timestamp} formattedDate={formattedDate} />
      </Table.Cell>
      <Table.Cell>{snakeToFriendly(type)}</Table.Cell>
    </Table.Row>
  );
};

const TableWrapper = ({ children }) => <Table>{children}</Table>;

export { Header, TableWrapper, Row };
