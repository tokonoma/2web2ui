import React from 'react';
import { connect } from 'react-redux';
import { Page, Panel } from 'src/components/matchbox';
import { updateUser } from 'src/actions/users';
import { get as getCurrentUser } from 'src/actions/currentUser';
import { confirmPassword } from 'src/actions/auth';
import { Loading } from 'src/components';
import VerifyEmailBanner from 'src/components/verifyEmailBanner/VerifyEmailBanner';
import { useHibana } from 'src/context/HibanaContext';
import NameForm from './components/NameForm';
import ThemeToggleForm from './components/ThemeToggleForm';
import PasswordForm from './components/PasswordForm';
import TfaManager from './components/TfaManager';
import { AccessControl } from 'src/components/auth';
import { LabelledValue } from 'src/components';
import ErrorTracker from 'src/helpers/errorTracker';
import { all, not } from 'src/helpers/conditions';
import { isAccountUiOptionSet } from 'src/helpers/conditions/account';
import { isHeroku, isAzure, isSso } from 'src/helpers/conditions/user';

export function ProfilePage(props) {
  const [{ isHibanaEnabled, setIsHibanaEnabled, showAlert }] = useHibana();

  const updateTheme = () => {
    setIsHibanaEnabled(!isHibanaEnabled).then(() => {
      showAlert({ type: 'success', message: 'App design updated.' });
    });
  };

  const updateProfile = values => {
    const { username } = props.currentUser;
    const data = { first_name: values.firstName, last_name: values.lastName };

    return props.updateUser(username, data).then(
      // update success, re-fetch current user but ignore re-fetch errors
      () =>
        props.getCurrentUser().catch(err => {
          ErrorTracker.report('silent-ignore-refetch-current-user', err);
        }),
    );
  };

  const updatePassword = values => {
    const { username } = props.currentUser;
    const { currentPassword, newPassword } = values;

    return props
      .confirmPassword(username, currentPassword)
      .then(() => props.updateUser(username, { password: newPassword }));
  };

  const { isPending } = props;
  const { email, email_verified, username, verifyingEmail } = props.currentUser;

  if (isPending) return <Loading />;

  return (
    <Page title="Profile">
      {email_verified === false && <VerifyEmailBanner verifying={verifyingEmail} />}

      <Panel>
        <Panel.Section>
          <LabelledValue label="Username" value={username} />
          <LabelledValue label="Email Address" value={email} />
        </Panel.Section>
      </Panel>

      <AccessControl condition={isAccountUiOptionSet('hibana.hasThemeControls')}>
        <Panel>
          <Panel.Section>
            <ThemeToggleForm onChange={updateTheme} />
          </Panel.Section>
        </Panel>
      </AccessControl>

      <AccessControl condition={all(not(isAzure), not(isHeroku))}>
        <AccessControl condition={not(isSso)}>
          <TfaManager />
        </AccessControl>

        <Panel title="Edit Profile">
          <NameForm onSubmit={updateProfile} />
        </Panel>

        <AccessControl condition={not(isSso)}>
          <Panel title="Update Password">
            <PasswordForm onSubmit={updatePassword} />
          </Panel>
        </AccessControl>
      </AccessControl>
    </Page>
  );
}

const mapStateToProps = ({ account, currentUser }) => ({
  account,
  currentUser,
  isPending: currentUser.userOptionsPending,
});

const mapDispatchToProps = {
  confirmPassword,
  getCurrentUser,
  updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
