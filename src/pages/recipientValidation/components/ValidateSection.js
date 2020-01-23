import React, { useEffect } from 'react';
import CreditCardSection from 'src/components/billing/CreditCardSection';
import { Button } from '@sparkpost/matchbox';
import { connect } from 'react-redux';
import { FORMS } from 'src/constants';
import { reduxForm } from 'redux-form';
import { updatePaymentInitialValues } from 'src/selectors/accountBillingForms';
import { getBillingCountries } from 'src/actions/billing';

const FORMNAME = FORMS.RV_ADDPAYMENTFORM;

function ValidateSection({
  handleSubmit,
  credit_card,
  handleValidate,
  billingCountries,
  getBillingCountries,
}) {
  const onSubmit = () => {
    handleValidate();
  };
  useEffect(() => {
    getBillingCountries();
  }, [getBillingCountries]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CreditCardSection
        credit_card={credit_card}
        handleCardToggle={() => {}}
        formname={FORMNAME}
        countries={billingCountries || []}
      />
      <Button color="orange" type="submit">
        {/* functionality to validate to be added in AC-1196 and AC-1197*/}
        Validate
      </Button>
    </form>
  );
}

const formOptions = { form: FORMNAME, enableReinitialize: true };
const mapStateToProps = state => {
  return {
    initialValues: updatePaymentInitialValues(state),
    billingCountries: state.billing.countries,
  };
};

export default connect(mapStateToProps, { getBillingCountries })(
  reduxForm(formOptions)(ValidateSection),
);
