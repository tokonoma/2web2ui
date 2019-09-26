import React from 'react';
import { Field } from 'redux-form';
import { Panel, Button } from '@sparkpost/matchbox';
import PageLink from 'src/components/pageLink/PageLink';
import LabelledValue from 'src/components/labelledValue/LabelledValue';
import { CheckboxWrapper } from 'src/components/reduxFormWrappers';
import RoleRadioGroup from './RoleRadioGroup';
import { ROLES } from 'src/constants';

export const EditForm = ({
  onSubmit,
  user,
  currentUser,
  isAccountSingleSignOnEnabled,
  subaccount,
  submitting
}) => {

  const ssoHelpText = <span>Enabling single sign-on will delete this user's password. If they switch back to password-based authentication, they'll need to reset their password on login.</span>;
  const subaccountReportingUser = user.access === ROLES.SUBACCOUNT_REPORTING;

  const roleSection = subaccountReportingUser
    ? (<>
        <p> This user has access to reporting features and read-only template access, limited to a single subaccount. Its role can’t be changed. </p>
        <LabelledValue label="Subaccount" name="subaccountInfo">
          <PageLink to={`/account/subaccounts/${subaccount.id}`}>{subaccount.name}</PageLink> ({subaccount.id})
        </LabelledValue>
      </>)
    : (<Field
      name="access"
      allowSubaccountAssignment={false}
      disabled={user.isCurrentUser}
      allowSuperUser={currentUser.access === ROLES.SUPERUSER}
      component={RoleRadioGroup}
    />);

  return <Panel>
    <form onSubmit={onSubmit}>
      <Panel.Section>
        {roleSection}
      </Panel.Section>
      {isAccountSingleSignOnEnabled &&
        (<Panel.Section>
          <Field
            component={CheckboxWrapper}
            helpText={ssoHelpText}
            label="Enable single sign-on authentication for this user"
            name="is_sso"
            type="checkbox"
          />
        </Panel.Section>)
      }

      <Panel.Section>
        <Button primary disabled={submitting} submit>
          {'Update user'}
        </Button>
      </Panel.Section>
    </form>
  </Panel>;
};

export default EditForm;
