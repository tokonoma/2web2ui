import React from 'react';
import { Button, Grid, UnstyledLink, Modal,Panel } from '@sparkpost/matchbox';
import { Close } from '@sparkpost/matchbox-icons';
import { Link } from 'react-router-dom';
import { calculateNewCost } from 'src/pages/billing/helpers/totalRecipientValidationCost';
import RecipientValidationPriceTable from './RecipientValidationPriceTable';

import styles from './UploadedListForm.module.scss';
import { formatFullNumber } from 'src/helpers/units';

class UploadedListForm extends React.Component {
  state = {
    showPriceModal: false
  }

  renderRVPriceModal = () => (
    <Panel
      className={styles.modalContainer}
      accent
    >
      <div style={{ float: 'right' }}>
        <Button onClick={this.handleModal(false)} flat>
          <Close />
        </Button>
      </div>
      <div className={styles.bodyContainer}>
        <h3>How was this calculated?</h3>
        <RecipientValidationPriceTable
          cellProps={{
            style: {
              padding: '8px 0'
            }
          }}
        />
      </div>
    </Panel>
  );

  handleModal = (showPriceModal = false) => () => this.setState({ showPriceModal });

  render() {
    const { count = 123321, currentUsage = 1234321, handleSubmit } = this.props;

    return (
      <div style={{ padding: '12px' }}>
        <p className={styles.descriptionParagraph}>
          <span>Your list has been uploaded successfully and the cost to validate is below. </span>
          <strong>Would you like to proceed?</strong>
        </p>
        <Grid>
          <Grid.Column xs={12} md={4}>
            <div>Your list has</div>
            <div className={styles.CountBox}><span className={styles.Number}>{formatFullNumber(count)}</span> emails</div>
          </Grid.Column>
          <Grid.Column xs={12} mdOffset={1} md={7}>
            <div>and will cost</div>
            <div className={styles.Cost}>{calculateNewCost(currentUsage, count)}</div>
            <UnstyledLink onClick={this.handleModal(true)} >How was this calculated?</UnstyledLink>
          </Grid.Column>
        </Grid>
        <div className={styles.ButtonRow}>
          <Button className={styles.ActionButton} onClick={handleSubmit} color='orange'>Validate</Button>
          <Button className={styles.ActionButton} outline component={Link} to='/recipient-validation'>No, thanks</Button>
        </div>
        <Modal open={this.state.showPriceModal} onClose={this.handleModal(false)}>
          {this.renderRVPriceModal()}
        </Modal>
      </div>
    );
  }
}

export default UploadedListForm;
