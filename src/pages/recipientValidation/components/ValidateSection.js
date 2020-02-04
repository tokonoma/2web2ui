import React, { useEffect } from 'react';
import CreditCardSection from 'src/components/billing/CreditCardSection';
import { Button } from '@sparkpost/matchbox';
import { connect } from 'react-redux';
import { FORMS } from 'src/constants';
import { reduxForm } from 'redux-form';
import { updatePaymentInitialValues } from 'src/selectors/accountBillingForms';
import { selectIsSelfServeBilling } from 'src/selectors/accountBillingInfo';
import { getBillingCountries } from 'src/actions/billing';

const FORMNAME = FORMS.RV_ADDPAYMENTFORM;

function ValidateSection({
  handleSubmit,
  credit_card,
  handleValidate,
  billingCountries,
  getBillingCountries,
  isManuallyBilled,
  submitButtonName = 'Validate',
}) {
  const onSubmit = () => {
    handleValidate();
  };
  useEffect(() => {
    getBillingCountries();
  }, [getBillingCountries]);
  if (isManuallyBilled) {
    return (
      <Button
        external
        primary
        to="https://www.sparkpost.com/recipient-validation/#recipient-validation-form"
      >
        Contact Sales
      </Button>
    );
  }
  return (
    <>
      <CreditCardSection
        creditCard={credit_card}
        handleCardToggle={() => {}}
        formname={FORMNAME}
        countries={billingCountries || []}
      />
      <Button color="orange" type="submit" onClick={handleSubmit(onSubmit)}>
        {/* functionality to validate to be added in AC-1196 and AC-1197*/}
        {submitButtonName}
      </Button>
    </>
  );
}

const formOptions = { form: FORMNAME, enableReinitialize: true };
const mapStateToProps = state => {
  return {
    initialValues: updatePaymentInitialValues(state),
    billingCountries: state.billing.countries,
    isManuallyBilled: !selectIsSelfServeBilling(state),
  };
};

export default connect(mapStateToProps, { getBillingCountries })(
  reduxForm(formOptions)(ValidateSection),
);
