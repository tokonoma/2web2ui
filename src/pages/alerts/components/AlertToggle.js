import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toggle } from '@sparkpost/matchbox';
import { setEnabledStatus } from 'src/actions/alerts';
import { showAlert } from 'src/actions/globalAlert';
import styles from './AlertToggle.module.scss';

export class AlertToggle extends Component {

  handleToggle = () => {
    const { id, subaccountId, setEnabledStatus, showAlert, enabled } = this.props;
    return setEnabledStatus({ id, subaccountId, enabled: !enabled }).then(() => {
      showAlert({ type: 'success', message: 'Alert updated' });
    });
  }

  render() {
    const { id, pending, enabled } = this.props;
    return (
      <div className={styles.Wrapper}>
        <Toggle
          id={id}
          compact
          checked={enabled}
          disabled={pending}
          onChange={this.handleToggle}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pending: state.alerts.setEnabledStatusPending
});

export default connect(mapStateToProps, { setEnabledStatus, showAlert })(AlertToggle);
