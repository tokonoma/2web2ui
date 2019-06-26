import React from 'react';
import { connect } from 'react-redux';
import { fetch as fetchAccount, renewAccount } from 'src/actions/account';
import { Panel, Button } from '@sparkpost/matchbox';
import { showAlert } from 'src/actions/globalAlert';
import config from 'src/config';
import Brightback from 'src/components/brightback/Brightback';
import { formatDate } from 'src/helpers/date';

export class CancellationPanel extends React.Component {

  onRenewAccount = () => {
    const { renewAccount, fetchAccount, showAlert } = this.props;
    return renewAccount().then(() => {
      showAlert({ type: 'success', message: 'Your account has been renewed.' });
      return fetchAccount();
    });
  }

  render() {
    const { account } = this.props;
    const { pending_cancellation, cancelLoading } = account;

    if (pending_cancellation) {
      return (
        <Panel sectioned title="Pending Account Cancellation">
          <h6>Account is set to cancel {formatDate(pending_cancellation.effective_date)}</h6>
          <p>You can undo your cancellation at anytime <strong>before</strong> 8:00 UTC on your cancel date. We hope you decide to stay!</p>
          <div>
            <Button color='orange' disabled={cancelLoading} onClick={this.onRenewAccount}>Undo Cancellation</Button>
          </div>
        </Panel>
      );
    }

    return (
      <Panel sectioned title="Request Account Cancellation">
        <p>
          If you cancel, you can send emails up to your monthly limit before
          your cancel date, but you cannot overage past that. You will not be
          able to validate email addresses using recipient validation. Any
          dedicated IPs assigned to your account will be unrecoverable after your
          cancel date and might be assigned to other SparkPost accounts.
        </p>
        <div>
          <Brightback
            config={config.brightback.cancelConfig}
            condition={true}
            render={({ to }) => (
              <Button color='orange' to={to}>Cancel Account</Button>
            )}
          />
        </div>
      </Panel>
    );
  }
}

const mapStateToProps = ({ account }) => ({
  account
});

export default connect(mapStateToProps, { fetchAccount, renewAccount, showAlert })(CancellationPanel);
