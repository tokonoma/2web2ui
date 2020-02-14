import React from 'react';
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
    handleCardToggle(!Boolean(defaultToggleState));
  };
  const savedPaymentAction = credit_card
    ? [{ content: 'Use Saved Payment Method', onClick: handleUseAnotherCC, color: 'orange' }]
    : null;

  if (!credit_card || Boolean(defaultToggleState))
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
