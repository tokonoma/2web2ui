import React from 'react';
import classNames from 'classnames';
import { useHibana } from 'src/context/HibanaContext';
import { Table } from 'src/components/matchbox';
import Callout from 'src/components/callout';
import Loading from 'src/components/loading'; // todo, move to src/components
import Billboard from './Billboard';
import styles from './SummaryTable.module.scss';

const Body = ({ columns, data, empty, error, loading, perPage }) => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  const colSpan = columns.length;

  if (loading) {
    return (
      <Billboard colSpan={colSpan}>
        <Loading />
      </Billboard>
    );
  }

  if (error) {
    return (
      <Billboard colSpan={colSpan}>
        <Callout title="Unable to Load Data" children={error} />
      </Billboard>
    );
  }

  if (empty) {
    return (
      <Billboard colSpan={colSpan}>
        <Callout title="No Data Available" />
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
