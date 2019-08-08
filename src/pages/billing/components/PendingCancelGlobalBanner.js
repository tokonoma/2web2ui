import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate } from 'src/helpers/date';
import { Button } from '@sparkpost/matchbox';
import { Close, AccessTime } from '@sparkpost/matchbox-icons';
import styles from './PendingCancelGlobalBanner.module.scss';
import { fetch as fetchAccount, renewAccount } from 'src/actions/account';
import { hideGlobalBanner, showAlert } from 'src/actions/globalAlert';

export class PendingCancelGlobalBanner extends Component {
  handleClose = () => {
    const { hideGlobalBanner } = this.props;
    hideGlobalBanner();
  }

  handleRenewAccount = () => {
    const { renewAccount, fetchAccount, showAlert } = this.props;
    return renewAccount().then(() => {
      showAlert({ type: 'success', message: 'Your account will not be cancelled.' });
      return fetchAccount();
    });
  }

  render() {
    const { account } = this.props;
    const { pending_cancellation } = account;
    if (!pending_cancellation) {
      return null;
    }

    return (
      <div className={styles.banner}>
        <span className={styles.CenterContainer}>
          <AccessTime />
          <span> Your account will be cancelled on </span>
          {formatDate(pending_cancellation.effective_date)}
          <span>, and you will no longer be able to send email or login. Changed your mind? </span>
          <Button className={styles.RenewButton} flat onClick={this.handleRenewAccount}>Don't Cancel</Button>
        </span>
        <Button className={styles.Close} flat onClick={this.handleClose}><Close/></Button>
      </div>
    );
  }
}

export default connect(({ account }) => ({ account }), { renewAccount, showAlert, hideGlobalBanner, fetchAccount })(PendingCancelGlobalBanner);
