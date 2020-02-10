import React, { useState, useEffect } from 'react';
import { Panel } from '@sparkpost/matchbox';
import { PaymentForm } from './PaymentForm';
import BillingAddressForm from './BillingAddressForm';
import CardSummary from './CardSummary';

function CreditCardSection({
  handleCardToggle,
  creditCard: credit_card,
  formname: FORMNAME,
  submitting = false,
  countries = [],
  defaultToggleState = false,
}) {
  const handleUseAnotherCC = () => {
    setUseAnotherCC(!useAnotherCC);
    handleCardToggle(!useAnotherCC);
  };
  const savedPaymentAction = credit_card
    ? [{ content: 'Use Saved Payment Method', onClick: handleUseAnotherCC, color: 'orange' }]
    : null;

  const [useAnotherCC, setUseAnotherCC] = useState(Boolean(defaultToggleState));

  useEffect(() => {
    setUseAnotherCC(defaultToggleState);
  }, [defaultToggleState]);

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

export default CreditCardSection;
