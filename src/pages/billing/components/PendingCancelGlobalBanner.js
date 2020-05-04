import React from 'react';
import { connect } from 'react-redux';
import { formatDate } from 'src/helpers/date';
import { Button, UnstyledLink } from 'src/components/matchbox';
import { Close, AccessTime } from '@sparkpost/matchbox-icons';
import OGStyles from './PendingCancelGlobalBanner.module.scss';
import HibanaStyles from './PendingCancelGlobalBannerHibana.module.scss';
import useHibanaOverride from 'src/hooks/useHibanaOverride';

import { fetch as fetchAccount, renewAccount } from 'src/actions/account';
import { hideGlobalBanner, showAlert } from 'src/actions/globalAlert';

export function PendingCancelGlobalBanner(props) {
  const {
    account: { pending_cancellation },
    style,
    hideGlobalBanner,
    renewAccount,
    fetchAccount,
    showAlert,
  } = props;
  const styles = useHibanaOverride(OGStyles, HibanaStyles);

  const handleClose = () => {
    hideGlobalBanner();
  };

  const handleRenewAccount = () => {
    return renewAccount().then(() => {
      showAlert({ type: 'success', message: 'Your account will not be cancelled.' });
      return fetchAccount();
    });
  };

  if (!pending_cancellation) {
    return null;
  }

  return (
    <div className={styles.banner} style={style}>
      <span className={styles.CenterContainer}>
        <AccessTime />
        <span> Your account will be cancelled on </span>
        {formatDate(pending_cancellation.effective_date)}
        <span>, and you will no longer be able to send email or login. Changed your mind? </span>
        <UnstyledLink className={styles.RenewButton} onClick={handleRenewAccount}>
          Don't Cancel
        </UnstyledLink>
      </span>
      <span className={styles.RightContainer}>
        <Button className={styles.Close} flat onClick={handleClose}>
          <Close />
        </Button>
      </span>
    </div>
  );
}

export default connect(({ account }) => ({ account }), {
  renewAccount,
  showAlert,
  hideGlobalBanner,
  fetchAccount,
})(PendingCancelGlobalBanner);
