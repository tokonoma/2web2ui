import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { RadioGroup, TextFieldWrapper } from 'src/components';
import { Field } from 'redux-form';
import SubaccountSection from 'src/components/subaccountSection';
import { required, email, maxLength } from 'src/helpers/validation';
import { Button, Panel } from '@sparkpost/matchbox';
import { submitRTBFRequest, submitOptOutRequest } from 'src/actions/dataPrivacy';
import ButtonWrapper from 'src/components/buttonWrapper';
import styles from './SingleRecipientTab.module.scss';

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
  shared: null,
  subaccount: -2,
  master: 0,
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
      : subaccountItems[values.assignTo];
    const include_subaccounts = values.assignTo === 'shared';
    switch (values.requestType) {
      case 'rtbf':
        props
          .submitRTBFRequest({
            recipients: [values.email],
            subaccountId: subaccountId,
            include_subaccounts: include_subaccounts,
          })
          .then(() => props.reset());
        break;
      case 'opt-out':
      default:
        props
          .submitOptOutRequest({
            recipients: [values.email],
            subaccountId: subaccountId,
            include_subaccounts: include_subaccounts,
          })
          .then(() => props.reset());
        break;
    }
  };
  return (
    <Panel.Section>
      <div className={styles.FormContainer}>
        <form onSubmit={props.handleSubmit(onSubmit)}>
          <Field
            component={RadioGroup}
            name="requestType"
            title="Select Compliance Type"
            options={requestTypes}
            disabled={props.dataPrivacyRequestPending}
            validate={[required]}
          />
          <label htmlFor="email" className={styles.ScreenReaderOnly}>
            Recipient Email Address
          </label>

          <Field
            name="email"
            style={{ width: '60%' }}
            component={TextFieldWrapper}
            placeholder={'email@example.com'}
            label={'Recipient Email Address'}
            disabled={props.dataPrivacyRequestPending}
            validate={[required, email, maxLength(254)]}
            normalize={(value = '') => value.trim()}
          />
          <SubaccountSection
            newTemplate={true}
            disabled={props.dataPrivacyRequestPending}
            validate={[required]}
            createOptions={createOptions}
          />

          <ButtonWrapper>
            <Button color="orange" type="submit" disabled={props.dataPrivacyRequestPending}>
              Submit Request
            </Button>
            <div className={styles.ClearButtonContainer}>
              <Button onClick={props.reset}>Clear</Button>
            </div>
          </ButtonWrapper>
        </form>
      </div>
    </Panel.Section>
  );
}
const formOptions = {
  form: 'DATA_PRIVACY_SINGLE_RECIPIENT',
  enableReinitialize: true,
};
const mapStateToProps = state => {
  return {
    dataPrivacyRequestPending: state.dataPrivacy.dataPrivacyRequestPending,
  };
};
export default connect(mapStateToProps, { submitRTBFRequest, submitOptOutRequest })(
  reduxForm(formOptions)(SingleRecipientTab),
);
