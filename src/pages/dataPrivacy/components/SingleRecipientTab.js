import React from 'react';
import { reduxForm } from 'redux-form';
import { RadioGroup } from 'src/components';
import { Field } from 'redux-form';
import SubaccountSection from 'src/components/subaccountSection';
import { TextFieldWrapper } from 'src/components';
import { Label } from 'src/components/matchbox';
import { required, email, maxLength } from 'src/helpers/validation';
import { Button } from '@sparkpost/matchbox';

const requestTypes = [
  {
    value: 'rtbf',
    label: 'Right to be forgotten',
  },
  {
    value: 'oo-third-party',
    label: 'Opt-out of third-party use',
  },
];

export function SingleRecipientTab() {
  return (
    <form handleSubmit={() => {}}>
      <div style={{ padding: '1rem', paddingBottom: 0, paddingTop: '2rem' }}>
        <Field
          component={RadioGroup}
          name="requestType"
          title="Select Compliance Type"
          options={requestTypes}
          disabled={false}
        />
        <Label id="email-address-field">Email Address</Label>

        <Field
          id="email-address-field"
          name="address"
          style={{ width: '60%' }}
          component={TextFieldWrapper}
          placeholder={'email@example.com'}
          validate={[required, email, maxLength(254)]}
          normalize={(value = '') => value.trim()}
        />
      </div>
      <SubaccountSection newTemplate={true} disabled={false} />
      <div style={{ padding: '1rem' }}>
        <Button color="orange">Submit Request</Button>
        <div style={{ marginLeft: '1rem', display: 'inline' }}>
          <Button>Cancel</Button>
        </div>
      </div>
    </form>
  );
}
const formOptions = {
  form: 'DATA_PRIVACY_SINGLE_RECIPIENT',
  enableReinitialize: true,
};
export default reduxForm(formOptions)(SingleRecipientTab);
