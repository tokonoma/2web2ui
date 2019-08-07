import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate } from 'src/helpers/date';
import { Button } from '@sparkpost/matchbox';
import styles from './PendingCancelGlobalBanner.module.scss';

export class PendingCancelGlobalBanner extends Component {
  render() {

    return (
      <div className={styles.banner}>
        <span>Your account will be cancelled on </span>
        {formatDate(new Date())}
        <span>, and you will no longer be able to send email or login. Changed your mind?</span>
        <Button color='orange' flat><div style={{ color: 'white', border: '2px solid white' }}>Don't Cancel</div></Button>
      </div>
    );
  }
}

export default connect(({ account }) => ({ account }))(PendingCancelGlobalBanner);
