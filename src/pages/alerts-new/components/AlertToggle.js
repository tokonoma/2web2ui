import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toggle } from '@sparkpost/matchbox';
import { setEnabledStatus } from 'src/actions/alerts';
import { showAlert } from 'src/actions/globalAlert';

class AlertToggle extends Component {
  state = {
    enabled: false
  }

  componentDidMount() {
    this.setState({ enabled: this.props.enabled });
  }

  componentDidUpdate({ enabled: prevEnabled }) {
    const { enabled } = this.props;

    // Update checkbox value when list updates (do i need this)
    if (enabled !== prevEnabled) {
      this.setState({ enabled });
    }
  }

  handleToggle = () => {
    const { id, subaccountId, setEnabledStatus, showAlert } = this.props;
    const { enabled } = this.state;

    this.setState({ enabled: !enabled });

    return setEnabledStatus({ id, subaccountId, enabled: !enabled }).then(() => {
      showAlert({ type: 'success', message: 'Alert updated' });
    }).catch(() => {
      // Revert to initial value
      this.setState({ enabled: this.props.enabled });
    });
  }

  render() {
    const { enabled } = this.state;
    const { id, pending } = this.props;

    return (
      <Toggle
        id={id}
        compact
        checked={enabled}
        disabled={pending}
        onChange={this.handleToggle}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  pending: state.alerts.setEnabledStatusPending
});

export default connect(mapStateToProps, { setEnabledStatus, showAlert })(AlertToggle);

/* <Toggle
  id={`alert-${id}`}
  defaultChecked={enabled}
  // disabled={rowUpdatePending}
  // value={enabled ? 'checked' : null}
  compact
  onChange={() => handleEnabledToggle({ id, enabled, subaccountId: subaccount_id })}
/> */
