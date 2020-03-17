import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { RadioGroup } from 'src/components';
import { Field } from 'redux-form';
import SubaccountSection from 'src/components/subaccountSection';
import { TextFieldWrapper } from 'src/components';
import { Label } from 'src/components/matchbox';
import { required, email, maxLength } from 'src/helpers/validation';
import { Button } from '@sparkpost/matchbox';
import { submitRTBFRequest, submitOptOutRequest } from 'src/actions/dataPrivacy';

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

export function SingleRecipientTab(props) {
  const onSubmit = values => {
    switch (values.requestType) {
      case 'rtbf':
        props.submitRTBFRequest({
          recipients: [values.address],
          request_date: new Date().toISOString(),
        });
        break;

      default:
        props.submitOptOutRequest({
          recipients: [values.address],
          request_date: new Date().toISOString(),
        });
        break;
    }
  };
  return (
    <form onSubmit={props.handleSubmit(onSubmit)}>
      <div style={{ padding: '1rem', paddingBottom: 0, paddingTop: '2rem' }}>
        <Field
          component={RadioGroup}
          name="requestType"
          title="Select Compliance Type"
          options={requestTypes}
          disabled={false}
          validate={[required]}
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
      <SubaccountSection newTemplate={true} disabled={false} validate={[required]} />
      <div style={{ padding: '1rem' }}>
        <Button color="orange" type="submit">
          Submit Request
        </Button>
        <div style={{ marginLeft: '1rem', display: 'inline' }}>
          <Button onClick={props.reset}>Cancel</Button>
        </div>
      </div>
    </form>
  );
}
const formOptions = {
  form: 'DATA_PRIVACY_SINGLE_RECIPIENT',
  enableReinitialize: true,
};
export default connect(null, { submitRTBFRequest, submitOptOutRequest })(
  reduxForm(formOptions)(SingleRecipientTab),
);
