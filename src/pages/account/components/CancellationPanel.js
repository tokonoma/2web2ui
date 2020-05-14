import React from 'react';
import { connect } from 'react-redux';
import { fetch as fetchAccount, renewAccount } from 'src/actions/account';
import { Heading } from 'src/components/text';
import { ButtonWrapper } from 'src/components';
import { Button, Panel, Stack } from 'src/components/matchbox';
import { showAlert } from 'src/actions/globalAlert';
import { GUIDE_IDS } from 'src/constants';
import { formatDate } from 'src/helpers/date';
import { withRouter } from 'react-router-dom';
import { reportGuideLoadingError } from 'src/helpers/errorTracker';
const ACCOUNT_CANCEL_LINK = '/account/cancel';

export class CancellationPanel extends React.Component {
  onRenewAccount = () => {
    const { renewAccount, fetchAccount, showAlert } = this.props;
    return renewAccount().then(() => {
      showAlert({ type: 'success', message: 'Your account will not be cancelled.' });
      return fetchAccount();
    });
  };

  handleCancelAccount = () => {
    try {
      window.pendo.showGuideyId(GUIDE_IDS.CANCEL_ACCOUNT);
    } catch (error) {
      reportGuideLoadingError(error);
      this.props.history.push(ACCOUNT_CANCEL_LINK);
    }
  };

  render() {
    const { account } = this.props;
    const { pending_cancellation, cancelLoading } = account;

    if (pending_cancellation) {
      return (
        <Panel sectioned title="Pending Account Cancellation">
          <Stack>
            <Heading as="h3" looksLike="h6">
              Account is set to cancel {formatDate(pending_cancellation.effective_date)}
            </Heading>

            <p>
              You can undo your cancellation at anytime <strong>before</strong> 8:00 UTC on your
              cancel date. We hope you decide to stay!
            </p>
          </Stack>

          <ButtonWrapper>
            <Button variant="primary" disabled={cancelLoading} onClick={this.onRenewAccount}>
              Don't cancel my account!
            </Button>
          </ButtonWrapper>
        </Panel>
      );
    }

    return (
      <Panel title="Request Account Cancellation">
        <Panel.Section>
          <Stack>
            <p>
              If you choose to cancel your account, it will be cancelled at the end of your billing
              cycle. You can change your mind at any time until 8am UTC on the date of cancellation.
            </p>
            <div>
              <span>Before your cancellation date:</span>
              <ul>
                <li>You can continue to send up to your monthly limit.</li>
                <li>You may not go into overage.</li>
                <li>You may not use our recipient validation feature.</li>
              </ul>
            </div>
            <div>
              <span>After your cancellation date:</span>
              <ul>
                <li>You will no longer be able to log in using your account credentials.</li>
                <li>
                  You will no longer be able to send email or make API calls using your API keys.
                </li>
                <li>
                  Any dedicated IPs on your account will be unrecoverable and may be assigned to
                  other SparkPost accounts.
                </li>
              </ul>
            </div>
          </Stack>
        </Panel.Section>
        <Panel.Section>
          <Button variant="destructive" onClick={this.handleCancelAccount}>
            Cancel Account
          </Button>
        </Panel.Section>
      </Panel>
    );
  }
}

const mapStateToProps = ({ account }) => ({
  account,
});

export default withRouter(
  connect(mapStateToProps, { fetchAccount, renewAccount, showAlert })(CancellationPanel),
);
