import React from 'react';
import classNames from 'classnames';
import { Box, Table } from 'src/components/matchbox';
import { useHibana } from 'src/context/HibanaContext';
import styles from './SummaryTable.module.scss'; // TODO: Remove style import when OG theme is removed

function Billboard({ children, colSpan }) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  return (
    <tbody>
      <Table.Row>
        <Table.Cell className={classNames(!isHibanaEnabled && styles.Billboard)} colSpan={colSpan}>
          <Box height="220px">{children}</Box>
        </Table.Cell>
      </Table.Row>
    </tbody>
  );
}

export default Billboard;
