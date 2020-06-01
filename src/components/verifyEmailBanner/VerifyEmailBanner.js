import React from 'react';
import { connect } from 'react-redux';
import { Banner, Button } from 'src/components/matchbox';
import { showAlert } from 'src/actions/globalAlert';
import { verifyEmail } from 'src/actions/currentUser';

export function VerifyEmailBanner(props) {
  const { verifyEmail, showAlert, verifying } = props;

  const handleClick = () =>
    verifyEmail().then(() =>
      showAlert({
        type: 'success',
        message: 'Please click the link in the email we sent you to verify your email.',
      }),
    );

  return (
    <Banner status="info" title="Verify your email address" mb="500">
      <p>Please click the link in the email we sent you to verify your email address.</p>

      <Banner.Actions>
        <Button onClick={handleClick} disabled={verifying}>
          {verifying ? 'Sending...' : 'Resend Email'}
        </Button>
      </Banner.Actions>
    </Banner>
  );
}

const mapDispatchToProps = {
  verifyEmail,
  showAlert,
};

export default connect(undefined, mapDispatchToProps)(VerifyEmailBanner);
