import React from 'react';
import { Table } from '@sparkpost/matchbox';
import { RECIPIENT_VALIDATION_TIERS } from 'src/constants';
import { formatFullNumber } from 'src/helpers/units';
import styles from './RecipientValidationPriceTable.module.scss';

export const RecipientValidationPriceTable = ({ cellProps, col1Props, col2Props }) => (
  <Table>
    <tbody>
      <Table.Row className={styles.tableHeader}>
        <Table.Cell {...cellProps} {...col1Props}>
          <strong>Number of Emails</strong>
        </Table.Cell>
        <Table.Cell {...cellProps} {...col2Props}>
          <strong>Cost</strong>
        </Table.Cell>
      </Table.Row>
      {RECIPIENT_VALIDATION_TIERS.map((row) =>
        <Table.Row key={`row-${row.volumeMin}-${row.volumeMax}`}>
          <Table.Cell {...cellProps} {...col1Props}>
            <strong>{formatFullNumber(row.volumeMin)}</strong>
            {row.volumeMax < Infinity //Last row with volumeMax of Infinity has different wording
              ? <> to <strong>{formatFullNumber(row.volumeMax)}</strong></>
              : <>+</>}
          </Table.Cell>
          <Table.Cell {...cellProps} {...col2Props}>
            <span><strong>{row.displayedCost}</strong> per email address</span>
          </Table.Cell>
        </Table.Row>
      )}
    </tbody>
  </Table>
);

export default RecipientValidationPriceTable;
