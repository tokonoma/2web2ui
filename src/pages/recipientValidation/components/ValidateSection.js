import React, { useEffect } from 'react';
import CreditCardSection from 'src/components/billing/CreditCardSection';
import { Button } from 'src/components/matchbox';
import { connect } from 'react-redux';
import { updatePaymentInitialValues } from 'src/selectors/accountBillingForms';
import { isManuallyBilled } from 'src/selectors/accountBillingInfo';
import { getBillingCountries } from 'src/actions/billing';

function ValidateSection({
  credit_card,
  billingCountries,
  getBillingCountries,
  isManuallyBilled,
  submitButtonName = 'Validate',
  submitDisabled,
  formname: FORMNAME,
  handleCardToggle,
  defaultToggleState,
  isProductOnSubscription,
}) {
  useEffect(() => {
    getBillingCountries();
  }, [getBillingCountries]);
  return (
    <>
      {!isManuallyBilled && (
        <CreditCardSection
          creditCard={credit_card}
          handleCardToggle={handleCardToggle}
          formname={FORMNAME}
          countries={billingCountries || []}
          defaultToggleState={defaultToggleState}
        />
      )}
      {isManuallyBilled && !isProductOnSubscription ? (
        <Button
          external
          variant="primary"
          primary
          to="https://www.sparkpost.com/recipient-validation/#recipient-validation-form"
        >
          Contact Sales
        </Button>
      ) : (
        <Button variant="primary" primary submit disabled={submitDisabled}>
          {submitButtonName}
        </Button>
      )}
    </>
  );
}

const mapStateToProps = state => {
  return {
    initialValues: updatePaymentInitialValues(state),
    billingCountries: state.billing.countries,
    isManuallyBilled: isManuallyBilled(state),
  };
};

export default connect(mapStateToProps, { getBillingCountries })(ValidateSection);
