import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toggle } from '@sparkpost/matchbox';
import { setEnabledStatus } from 'src/actions/alerts';
import { showAlert } from 'src/actions/globalAlert';
import styles from './AlertToggle.module.scss';

export class AlertToggle extends Component {
  state = {
    enabled: false
  }

  componentDidMount() {
    this.setState({ enabled: this.props.enabled });
  }

  handleToggle = () => {
    const { id, subaccountId, setEnabledStatus, showAlert } = this.props;
    const { enabled } = this.state;

    this.setState({ enabled: !enabled });

    return setEnabledStatus({ id, subaccountId, enabled: !enabled }).then(() => {
      showAlert({ type: 'success', message: 'Alert updated' });
    }).catch(() => {
      this.setState({ enabled: this.props.enabled }); // Revert to initial value
    });
  }

  render() {
    const { enabled } = this.state;
    const { id, pending } = this.props;

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
