import { Table as OGTable } from '@sparkpost/matchbox';
import { Table as HibanaTable } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

HibanaTable.displayName = 'HibanaTable';
HibanaTable.Cell.displayName = 'HibanaTableCell';
HibanaTable.HeaderCell.displayName = 'HibanaTableHeaderCell';
HibanaTable.Row.displayName = 'HibanaTableRow';
OGTable.displayName = 'OGTable';
OGTable.Cell.displayName = 'OGTableCell';
OGTable.HeaderCell.displayName = 'OGTableHeaderCell';
OGTable.Row.displayName = 'OGTableRow';

export function Table(props) {
  return useHibanaToggle(OGTable, HibanaTable)(props)();
}

export function Cell(props) {
  return useHibanaToggle(OGTable.Cell, HibanaTable.Cell)(props)();
}

export function HeaderCell(props) {
  return useHibanaToggle(OGTable.HeaderCell, HibanaTable.HeaderCell)(props)(['width']);
}

export function Row(props) {
  return useHibanaToggle(OGTable.Row, HibanaTable.Row)(props)();
}

Cell.displayName = 'Table.Cell';
HeaderCell.displayName = 'Table.HeaderCell';
Row.displayName = 'Table.Row';

Table.Cell = Cell;
Table.HeaderCell = HeaderCell;
Table.Row = Row;

export default Table;
