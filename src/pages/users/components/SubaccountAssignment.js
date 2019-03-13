import React from 'react';
import { Field } from 'redux-form';
import { CheckboxWrapper, SubaccountTypeaheadWrapper } from 'src/components';
import { required } from 'src/helpers/validation';
import { ROLES } from 'src/constants';

const SubaccountAssignment = ({ selectedRole, useSubaccountChecked }) => {
  const reportingRoleSelected = selectedRole === ROLES.REPORTING;
  return (
    <>
      <Field
        id="useSubaccount"
        name="useSubaccount"
        label="Assign to subaccount"
        disabled={!reportingRoleSelected}
        component={CheckboxWrapper}
        type="checkbox"
      />
      {reportingRoleSelected &&
        useSubaccountChecked && (
        <Field
          id="subaccount"
          name="subaccount"
          component={SubaccountTypeaheadWrapper}
          validate={required}
          helpText="These users may not be re-assigned to a different subaccount or role after creation."
        />
      )}
    </>
  );
};

export default SubaccountAssignment;
