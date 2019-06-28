import React from 'react';
import { connect } from 'react-redux';
import { fetch as fetchAccount, renewAccount } from 'src/actions/account';
import { Panel, Button } from '@sparkpost/matchbox';
import { showAlert } from 'src/actions/globalAlert';
import config from 'src/config';
import Brightback from 'src/components/brightback/Brightback';
import { formatDate } from 'src/helpers/date';
import { Link } from 'react-router-dom';

const ACCOUNT_CANCEL_LINK = '/account/cancel';

export class CancellationPanel extends React.Component {

  onRenewAccount = () => {
    const { renewAccount, fetchAccount, showAlert } = this.props;
    return renewAccount().then(() => {
      showAlert({ type: 'success', message: 'Your account will not be cancelled.' });
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
            <Button color='orange' disabled={cancelLoading} onClick={this.onRenewAccount}>Don't cancel my account!</Button>
          </div>
        </Panel>
      );
    }

    return (
      <Panel sectioned title="Request Account Cancellation">
        <p>
          If you choose to cancel your account, it will be cancelled at the end of your billing cycle. You can change your
          mind at any time until 8am UTC on the date of cancellation.
        </p>
        <p>
          <span>Before your cancellation date:</span>
          <ul>
            <li>
              You can continue to send up to your monthly limit.
            </li>
            <li>
              You may not go into overage.
            </li>
            <li>
              You may not use our recipient validation feature.
            </li>
          </ul>
        </p>
        <p>
          <span>After your cancellation date:</span>
          <ul>
            <li>
              You will no longer be able to log in using your account credentials.
            </li>
            <li>
              You will no longer be able to send email or make API calls using your API keys.
            </li>
            <li>
              Any dedicated IPs on your account will be unrecoverable and may be assigned to other SparkPost accounts.
            </li>
          </ul>
        </p>
        <div>
          <Brightback
            config={config.brightback.cancelConfig}
            condition={true}
            render={({ to, enabled }) => (
              <Button color='orange' to={enabled ? to : ACCOUNT_CANCEL_LINK} component={enabled ? null : Link}>Cancel Account</Button>
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
