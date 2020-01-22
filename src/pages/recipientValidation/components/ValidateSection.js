import React from 'react';
import CreditCardSection from 'src/components/billing/CreditCardSection';
import { Button } from '@sparkpost/matchbox';
import { connect } from 'react-redux';
// import { FORMS } from 'src/constants';
import { reduxForm } from 'redux-form';
import { updatePaymentInitialValues } from 'src/selectors/accountBillingForms';

// const FORMNAME = FORMS.RV_ADDPAYMENTFORM;
const FORMNAME = 'changeRVPayment';

function ValidateSection({ handleSubmit, credit_card }) {
  return (
    <form onSubmit={handleSubmit}>
      <CreditCardSection credit_card={credit_card} onClick={() => {}} formname={FORMNAME} />
      <Button color="orange" onClick={() => {}}>
        {/* functionality to validate to be added in AC-1196 and AC-1197*/}
        Validate
      </Button>
    </form>
  );
}

const formOptions = { form: FORMNAME, enableReinitialize: true };
const mapStateToProps = state => {
  // console.log(updatePaymentInitialValues(state));

  return {
    initialValues: updatePaymentInitialValues(state),
  };
};

export default connect(mapStateToProps, null)(reduxForm(formOptions)(ValidateSection));
