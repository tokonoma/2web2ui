import React from 'react';
import classNames from 'classnames';
import { useHibana } from 'src/context/HibanaContext';
import { Table } from 'src/components/matchbox';
import { Empty } from 'src/components';
import { PanelSectionLoading } from 'src/components/loading';
import Billboard from './Billboard';
import styles from './SummaryTable.module.scss';

const Body = ({ columns, data, empty, error, loading, perPage }) => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (loading) {
    return (
      <Billboard>
        <PanelSectionLoading minHeight="175px" />
      </Billboard>
    );
  }
  if (error) {
    return (
      <Billboard>
        <Empty message="Unable to Load Data" />
      </Billboard>
    );
  }

  if (empty) {
    return (
      <Billboard>
        <Empty message="No Data Available" />
      </Billboard>
    );
  }

  return (
    <tbody>
      {data.slice(0, perPage).map((rowOfData, rowIndex) => (
        <Table.Row key={`row-${rowIndex}`}>
          {columns.map(({ align = 'left', component: Component, dataKey }) => {
            const classes = classNames(
              !isHibanaEnabled && classNames(styles.Cell, { [styles.DataCell]: !Component }),
            );
            return (
              <Table.Cell className={classes} style={{ textAlign: align }} key={`cell-${dataKey}`}>
                {Component ? <Component {...rowOfData} /> : rowOfData[dataKey]}
              </Table.Cell>
            );
          })}
        </Table.Row>
      ))}
    </tbody>
  );
};

export default Body;
