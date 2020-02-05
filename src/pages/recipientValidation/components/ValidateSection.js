import React, { useEffect } from 'react';
import CreditCardSection from 'src/components/billing/CreditCardSection';
import { Button } from '@sparkpost/matchbox';
import { connect } from 'react-redux';
import { updatePaymentInitialValues } from 'src/selectors/accountBillingForms';
import { selectIsSelfServeBilling } from 'src/selectors/accountBillingInfo';
import { getBillingCountries } from 'src/actions/billing';

function ValidateSection({
  credit_card,
  billingCountries,
  getBillingCountries,
  isManuallyBilled,
  submitButtonName = 'Validate',
  submitDisabled,
  formname: FORMNAME,
}) {
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
      <Button size="large" primary submit disabled={submitDisabled}>
        {/* functionality to validate to be added in AC-1196 and AC-1197*/}
        {submitButtonName}
      </Button>
    </>
  );
}

const mapStateToProps = state => {
  return {
    initialValues: updatePaymentInitialValues(state),
    billingCountries: state.billing.countries,
    isManuallyBilled: !selectIsSelfServeBilling(state),
  };
};

export default connect(mapStateToProps, { getBillingCountries })(ValidateSection);
