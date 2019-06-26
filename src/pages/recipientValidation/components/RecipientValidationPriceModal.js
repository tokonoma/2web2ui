import React from 'react';
import { Panel, Button, Table } from '@sparkpost/matchbox';
import { Close } from '@sparkpost/matchbox-icons';
import { RECIPIENT_VALIDATION_TIERS } from 'src/constants';
import { formatFullNumber } from 'src/helpers/units';

import styles from './RecipientValidationPriceModal.module.scss';

const RecipientValidationPriceModal = ({ onClose }) => (
  <Panel
    className={styles.modalContainer}
    accent
  >
    <div style={{ float: 'right' }}><Button onClick={() => onClose()} flat><Close /></Button></div>
    <div className={styles.bodyContainer}>
      <h3>How was this calculated?</h3>
      <Table className={styles.table}>
        <tbody>
          <Table.Row className={styles.tableHeader}>
            <Table.Cell className={styles.tableCell}>
                Number of Emails
            </Table.Cell>
            <Table.Cell className={styles.tableCell}>
                Cost
            </Table.Cell>
          </Table.Row>
          {RECIPIENT_VALIDATION_TIERS.map((row) =>
            <Table.Row key={`row-${row.volumeMin}-${row.volumeMax}`}>
              <Table.Cell className={styles.tableCell}>
                <strong>{formatFullNumber(row.volumeMin)}</strong>
                {row.volumeMax < Infinity //Last row with volumeMax of Infinity has different wording
                  ? <> to <strong>{formatFullNumber(row.volumeMax)}</strong></>
                  : <>+</>}
              </Table.Cell>
              <Table.Cell className={styles.tableCell}>
                <span><strong>{row.displayedCost}</strong> per email address</span>
              </Table.Cell>
            </Table.Row>
          )}
        </tbody>
      </Table>
    </div>
  </Panel>
);

export default RecipientValidationPriceModal;
