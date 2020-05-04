import React from 'react';
import { Close } from '@sparkpost/matchbox-icons';
import { RecipientValidationPriceTable } from 'src/components';
import { Button, Panel, Modal } from 'src/components/matchbox';

import OGStyles from './RVPriceModal.module.scss';
import hibanaStyles from './RVPriceModalHibana.module.scss';
import useHibanaOverride from 'src/hooks/useHibanaOverride';

export default function RVPriceModal({ isOpen, handleOpen }) {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <Modal open={isOpen} onClose={() => handleOpen(false)}>
      <Panel className={styles.modalContainer}>
        <div style={{ float: 'right' }}>
          <Button size="large" onClick={() => handleOpen(false)} flat className={styles.Close}>
            <Close size={30} />
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
