import React from 'react';
import { Field } from 'redux-form';
import { Panel, Button } from '@sparkpost/matchbox';
import PageLink from 'src/components/pageLink/PageLink';
import LabelledValue from 'src/components/labelledValue/LabelledValue';
import { CheckboxWrapper } from 'src/components/reduxFormWrappers';
import RoleRadioGroup from './RoleRadioGroup';

export const EditForm = ({
  onSubmit,
  user,
  currentUser,
  isAccountSingleSignOnEnabled,
  subaccount,
  submitting
}) => {

  const ssoHelpText = isAccountSingleSignOnEnabled
    ? <span>Enabling single sign-on will delete this user's password. If they switch back to password-based authentication, they'll need to reset their password on login.</span>
    : <span>Single sign-on has not been configured for your account. Enable in your <PageLink to="/account/settings">account's settings</PageLink>.</span>;

  const subaccountReportingUser = user.access === 'subaccount_reporting';

  const roleSection = subaccountReportingUser
    ? (<>
        <p> This user is assigned to a subaccount. Its role can’t be changed </p>
        <LabelledValue label="Subaccount name">
          <PageLink to={`/account/subaccounts/${subaccount.id}`}>{subaccount.name}</PageLink>
        </LabelledValue>
        <LabelledValue label="Subaccount ID">
          {subaccount.id}
        </LabelledValue>
      </>)
    : (<Field
      name="access"
      disabled={user.isCurrentUser}
      allowSuperUser={currentUser.access === 'superuser'}
      component={RoleRadioGroup}
    />);

  return <Panel>
    <form onSubmit={onSubmit}>
      <Panel.Section>
        {roleSection}
      </Panel.Section>
      <Panel.Section>
        <Field
          component={CheckboxWrapper}
          disabled={!isAccountSingleSignOnEnabled}
          helpText={ssoHelpText}
          label="Enable single sign-on authentication for this user"
          name="is_sso"
          type="checkbox"
        />
      </Panel.Section>
      <Panel.Section>
        <Button primary disabled={submitting} submit>
          {'Update user'}
        </Button>
      </Panel.Section>
    </form>
  </Panel>;
};

export default EditForm;
