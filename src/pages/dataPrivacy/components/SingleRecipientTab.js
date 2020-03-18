import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { RadioGroup } from 'src/components';
import { Field } from 'redux-form';
import SubaccountSection from 'src/components/subaccountSection';
import { TextFieldWrapper } from 'src/components';
import { Label } from 'src/components/matchbox';
import { required, email, maxLength } from 'src/helpers/validation';
import { Button, Panel } from '@sparkpost/matchbox';
import { submitRTBFRequest, submitOptOutRequest } from 'src/actions/dataPrivacy';
import ButtonWrapper from 'src/components/buttonWrapper';

const requestTypes = [
  {
    value: 'rtbf',
    label: 'Right to be forgotten',
  },
  {
    value: 'opt-out',
    label: 'Opt-out of third-party use',
  },
];

const subaccountItems = {
  shared: { id: null, name: 'Master and all subaccounts' },
  subaccount: { id: -2, name: 'Subaccount' },
  master: { id: 0, name: 'Master account' },
};

const createOptions = [
  { label: 'Master Account', value: 'master' },
  { label: 'Master and All Subaccounts', value: 'shared' },
  { label: 'Select a Subaccount', value: 'subaccount' },
];

export function SingleRecipientTab(props) {
  const onSubmit = values => {
    const subaccountId = !Boolean(values.assignTo)
      ? null
      : values.assignTo === 'subaccount'
      ? values.subaccount.id
      : subaccountItems[values.assignTo]['id'];
    switch (values.requestType) {
      case 'rtbf':
        props
          .submitRTBFRequest({
            recipients: [values.address],
            request_date: new Date().toISOString(),
            subaccountId: subaccountId,
          })
          .then(() => props.reset());
        break;
      case 'opt-out':
      default:
        props
          .submitOptOutRequest({
            recipients: [values.address],
            request_date: new Date().toISOString(),
            subaccountId: subaccountId,
          })
          .then(() => props.reset());
        break;
    }
  };
  return (
    <Panel.Section>
      <form onSubmit={props.handleSubmit(onSubmit)}>
        <div style={{ marginTop: '1rem' }}>
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
          <SubaccountSection
            newTemplate={true}
            disabled={false}
            validate={[required]}
            createOptions={createOptions}
          />
        </div>

        <ButtonWrapper>
          <Button color="orange" type="submit">
            Submit Request
          </Button>
          <div style={{ marginLeft: '1rem', display: 'inline' }}>
            <Button onClick={props.reset}>Cancel</Button>
          </div>
        </ButtonWrapper>
      </form>
    </Panel.Section>
  );
}
const formOptions = {
  form: 'DATA_PRIVACY_SINGLE_RECIPIENT',
  enableReinitialize: true,
};
export default connect(null, { submitRTBFRequest, submitOptOutRequest })(
  reduxForm(formOptions)(SingleRecipientTab),
);
