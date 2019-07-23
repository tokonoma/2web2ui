import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toggle } from '@sparkpost/matchbox';
import { setMutedStatus } from 'src/actions/alerts';
import { showAlert } from 'src/actions/globalAlert';
import styles from './AlertToggle.module.scss';

export class AlertToggle extends Component {
  state = {
    muted: this.props.muted
  }

  handleToggle = () => {
    const { id, setMutedStatus, showAlert } = this.props;
    const { muted } = this.state;

    this.setState({ muted: !muted });

    return setMutedStatus({ id, muted: !muted }).then(() => {
      showAlert({ type: 'success', message: 'Alert updated' });
    }).catch(() => {
      this.setState({ muted: this.props.muted }); // Revert to initial value
    });
  }

  render() {
    const { muted } = this.state;
    const { id, pending } = this.props;

    return (
      <div className={styles.Wrapper}>
        <Toggle
          id={id.toString()}
          compact
          checked={muted}
          disabled={pending}
          onChange={this.handleToggle}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pending: state.alerts.setMutedStatusPending
});

export default connect(mapStateToProps, { setMutedStatus, showAlert })(AlertToggle);
