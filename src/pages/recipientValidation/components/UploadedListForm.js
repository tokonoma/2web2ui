import React, { useState } from 'react';
import { Button, Grid, UnstyledLink, Modal,Panel } from '@sparkpost/matchbox';
import { Close } from '@sparkpost/matchbox-icons';
import { Link } from 'react-router-dom';
import { calculateNewCost } from 'src/pages/billing/helpers/totalRecipientValidationCost';
import RecipientValidationPriceTable from './RecipientValidationPriceTable';

import styles from './UploadedListForm.module.scss';
import { formatFullNumber } from 'src/helpers/units';

const UploadedListForm = ({ job, onSubmit, currentUsage }) => {

  const [ modalOpen, setModalOpen ] = useState(false);
  const { addressCount, filename } = job;

  const handleModal = (showPriceModal = false) => () => setModalOpen(showPriceModal);

  const renderRVPriceModal = () => (
    <Panel
      className={styles.modalContainer}
      accent
    >
      <div style={{ float: 'right' }}>
        <Button onClick={handleModal(false)} flat>
          <Close />
        </Button>
      </div>
      <div className={styles.bodyContainer}>
        <h3>How was this calculated?</h3>
        <RecipientValidationPriceTable
          cellProps={{
            className: styles.rvModalCell
          }}
        />
      </div>
    </Panel>
  );

  return (
    <div className={styles.formContainer}>
      <h2>{filename}</h2>
      <p className={styles.descriptionParagraph}>
        <span>Your list has been uploaded successfully and the cost to validate is below. </span>
        <strong>Would you like to proceed?</strong>
      </p>
      <Grid>
        <Grid.Column xs={12} md={4}>
          <div>Your list has</div>
          <div className={styles.CountBox}><span className={styles.Number}>{formatFullNumber(addressCount)}</span> emails</div>
        </Grid.Column>
        <Grid.Column xs={12} mdOffset={1} md={7}>
          <div>and will cost</div>
          <div className={styles.Cost}>{calculateNewCost(currentUsage, addressCount)}</div>
          <UnstyledLink onClick={handleModal(true)} >How was this calculated?</UnstyledLink>
        </Grid.Column>
      </Grid>
      <div className={styles.ButtonRow}>
        <Button className={styles.ActionButton} onClick={onSubmit} color='orange'>Validate</Button>
        <Button className={styles.ActionButton} outline component={Link} to='/recipient-validation'>No, thanks</Button>
      </div>
      <Modal open={modalOpen} onClose={handleModal(false)}>
        {renderRVPriceModal()}
      </Modal>
    </div>
  );
};


export default UploadedListForm;
