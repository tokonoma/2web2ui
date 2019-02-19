import React from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';
import { RadioGroup } from 'src/components/reduxFormWrappers';
import { CheckboxWrapper, SubaccountTypeaheadWrapper } from 'src/components';
import { required } from 'src/helpers/validation';
import { FORMS, REPORTING_USER_ROLE } from 'src/constants/';

const SubaccountAssignment = ({ selectedRole, useSubaccountChecked }) => {
  const reportingRoleSelected = selectedRole === REPORTING_USER_ROLE;
  return <>
    <Field id='useSubaccount' name='useSubaccount' label='Assign to subaccount' disabled={!reportingRoleSelected} component={CheckboxWrapper} />
    {reportingRoleSelected && useSubaccountChecked && <Field name='subaccount' component={SubaccountTypeaheadWrapper} validate={required} helpText='These users may not be re-assigned to a different subaccount or role after creation.' /> }
  </>;
};

const SubaccountAssignmentConnected = connect((state) => ({
  selectedRole: formValueSelector(FORMS.INVITE_USER)(state, 'access'),
  useSubaccountChecked: formValueSelector(FORMS.INVITE_USER)(state, 'useSubaccount')
}))(SubaccountAssignment);

const ROLES = [
  {
    label: <strong>Admin</strong>,
    value: 'admin',
    helpText: 'Has access to all functionality in the UI. Has the ability to add additional administrators and create / invite users with a role of Reporting.'
  },
  {
    label: <strong>Reporting</strong>,
    value: 'reporting',
    helpText: 'Has no access to functionality in the UI. Permissions include access to view all reports, and view all templates except being allowed to change them.',
    children: <SubaccountAssignmentConnected />
  },
  {
    label: <strong>Super User</strong>,
    value: 'superuser'
  }

];

export default function RoleRadioGroup({
  disabled = false,
  allowSuperUser = false,
  ...rest
}) {

  const roles = ROLES.filter((role) => allowSuperUser || role.value !== 'superuser');
  const options = roles.map((role) => ({ ...role, disabled }));

  return (
    <RadioGroup
      title="Role"
      grid={{ xs: 12, sm: 12, md: 6 }}
      options={options}
      {...rest}
    />
  );
}

