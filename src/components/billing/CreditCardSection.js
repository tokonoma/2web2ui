import React, { useState, useEffect } from 'react';
import { Panel } from '@sparkpost/matchbox';
import { PaymentForm } from './PaymentForm';
import BillingAddressForm from './BillingAddressForm';
import { connect } from 'react-redux';
import { getBillingCountries } from 'src/actions/billing';
import CardSummary from './CardSummary';

function CreditCardSection({
  onClick,
  credit_card,
  formname: FORMNAME,
  submitting = false,
  countries = [],
  getBillingCountries,
}) {
  useEffect(() => {
    getBillingCountries();
  }, [getBillingCountries]);
  const handleUseAnotherCC = () => {
    setUseAnotherCC(!useAnotherCC);
    onClick();
  };
  const savedPaymentAction = credit_card
    ? [{ content: 'Use Saved Payment Method', onClick: handleUseAnotherCC, color: 'orange' }]
    : null;

  const [useAnotherCC, setUseAnotherCC] = useState(false);

  if (!credit_card || useAnotherCC)
    return (
      <Panel title="Add a Credit Card" actions={savedPaymentAction}>
        <Panel.Section>
          <PaymentForm formName={FORMNAME} disabled={submitting} />
        </Panel.Section>
        <Panel.Section>
          <BillingAddressForm formName={FORMNAME} disabled={submitting} countries={countries} />
        </Panel.Section>
      </Panel>
    );
  return (
    <Panel
      title="Pay With Saved Payment Method"
      actions={[
        { content: 'Use Another Credit Card', onClick: handleUseAnotherCC, color: 'orange' },
      ]}
    >
      <Panel.Section>
        <CardSummary credit_card={credit_card} />
      </Panel.Section>
    </Panel>
  );
}

const mapStateToProps = state => {
  return {
    countries: state.billing.countries,
  };
};

export default connect(mapStateToProps, { getBillingCountries })(CreditCardSection);
