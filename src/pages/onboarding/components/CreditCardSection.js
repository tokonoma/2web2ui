import React from 'react';
import { Panel, Stack } from 'src/components/matchbox';
import PaymentForm from 'src/components/billing/PaymentForm';
import BillingAddressForm from 'src/components/billing/BillingAddressForm';
import { FORMS } from 'src/constants';

const CreditCardSection = ({ billing, submitting, isPlanFree }) => {
  if (isPlanFree) {
    return (
      <Panel.Section>
        <Stack>
          <p>Full featured test account that includes:</p>
          <ul>
            <li>Limited sending volume for testing.</li>
            <li>Access to all of our powerful API features.</li>
            <li>Free technical support to get you up and running.</li>
          </ul>
        </Stack>
      </Panel.Section>
    );
  }

  return (
    <>
      <Panel.Section>
        <PaymentForm formName={FORMS.JOIN_PLAN} disabled={submitting} />
      </Panel.Section>
      <Panel.Section>
        <BillingAddressForm
          formName={FORMS.JOIN_PLAN}
          disabled={submitting}
          countries={billing.countries}
        />
      </Panel.Section>
    </>
  );
};

export default CreditCardSection;
