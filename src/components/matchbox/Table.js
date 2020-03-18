import React from 'react';
import { Table as OGTable } from '@sparkpost/matchbox';
import { Table as HibanaTable } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

HibanaTable.displayName = 'HibanaTable';
HibanaTable.Cell.displayName = 'HibanaTableCell';
HibanaTable.HeaderCell.displayName = 'HibanaTableHeaderCell';
HibanaTable.Row.displayName = 'HibanaTableRow';
OGTable.displayName = 'OGTable';
OGTable.Cell.displayName = 'OGTableCell';
OGTable.HeaderCell.displayName = 'OGTableHeaderCell';
OGTable.Row.displayName = 'OGTableRow';

export function Table(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGTable {...omitSystemProps(props)} />;
  }
  return <HibanaTable {...props} />;
}

export function Cell(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGTable.Cell {...omitSystemProps(props)} />;
  }
  return <HibanaTable.Cell {...props} />;
}

export function HeaderCell(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGTable.HeaderCell {...omitSystemProps(props)} />;
  }
  return <HibanaTable.HeaderCell {...props} />;
}

export function Row(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGTable.Row {...omitSystemProps(props)} />;
  }
  return <HibanaTable.Row {...props} />;
}

Cell.displayName = 'Table.Cell';
HeaderCell.displayName = 'Table.HeaderCell';
Row.displayName = 'Table.Row';

Table.Cell = Cell;
Table.HeaderCell = HeaderCell;
Table.Row = Row;

export default Table;
