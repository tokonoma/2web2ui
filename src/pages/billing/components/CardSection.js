import React, { useState } from 'react';
import { Panel } from '@sparkpost/matchbox';
import CardSummary from './CardSummary';
import PaymentForm from '../forms/fields/PaymentForm';
import BillingAddressForm from '../forms/fields/BillingAddressForm';
import { useFeatureChangeContext } from '../context/FeatureChangeContext';

const FORMNAME = 'changePlan';

const CardSection = ({
  countries,
  selectedPlan,
  account,
  submitting,
  canUpdateBillingInfo
}) => {
  const { isReady, loading } = useFeatureChangeContext();
  const [useSavedCC, setUseSavedCC] = useState(true);

  const handleCardToggle = () => setUseSavedCC(!useSavedCC);

  if (!isReady || loading) {
    return null;
  }
  if (selectedPlan.isFree) {
    return null; // CC not required on free plans
  }

  if (account.billing && useSavedCC) {
    return (
      <Panel title='Pay With Saved Payment Method' actions={[{ content: 'Use Another Credit Card', onClick: handleCardToggle, color: 'orange' }]}>
        <Panel.Section><CardSummary billing={account.billing} /></Panel.Section>
      </Panel>
    );
  }

  const savedPaymentAction = canUpdateBillingInfo
    ? [{ content: 'Use Saved Payment Method', onClick: handleCardToggle, color: 'orange' }]
    : null;

  return (
    <Panel title='Add a Credit Card' actions={savedPaymentAction}>
      <Panel.Section>
        <PaymentForm
          formName={FORMNAME}
          disabled={submitting} />
      </Panel.Section>
      <Panel.Section>
        <BillingAddressForm
          formName={FORMNAME}
          disabled={submitting}
          countries={countries} />
      </Panel.Section>
    </Panel>
  );
};

export default CardSection;
