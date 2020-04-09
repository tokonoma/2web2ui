import React from 'react';
import { Close } from '@sparkpost/matchbox-icons';
import { RecipientValidationPriceTable } from 'src/components';
import { Button, Panel, Modal } from 'src/components/matchbox';
import styles from './RVPriceModal.module.scss';

export default function RVPriceModal({ isOpen, handleOpen }) {
  return (
    <Modal open={isOpen} onClose={() => handleOpen(false)}>
      <Panel className={styles.modalContainer} accent>
        <div style={{ float: 'right' }}>
          <Button onClick={() => handleOpen(false)} flat>
            <Close />
          </Button>
        </div>
        <div className={styles.bodyContainer}>
          <h3>How was this calculated?</h3>
          <RecipientValidationPriceTable
            cellProps={{
              className: styles.rvModalCell,
            }}
          />
        </div>
      </Panel>
    </Modal>
  );
}
