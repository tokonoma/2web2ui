import React from 'react';
import { Panel } from '@sparkpost/matchbox';
import CardSummary from 'src/components/billing/CardSummary';
import PaymentForm from 'src/components/billing/PaymentForm';
import BillingAddressForm from 'src/components/billing/BillingAddressForm';
import { useFeatureChangeContext } from '../context/FeatureChangeContext';

const FORMNAME = 'changePlan';

const CardSection = ({
  countries,
  selectedPlan,
  account,
  submitting,
  canUpdateBillingInfo,
  useSavedCC,
  handleCardToggle,
  isNewChangePlanForm, //TODO: remove this when removing the OldChangePlanForm
}) => {
  const { isReady, loading } = useFeatureChangeContext();

  if ((!isReady || loading) && isNewChangePlanForm) {
    return null;
  }
  if (selectedPlan.isFree) {
    return null; // CC not required on free plans
  }

  if (account.billing && useSavedCC) {
    return (
      <Panel
        title="Pay With Saved Payment Method"
        actions={[
          { content: 'Use Another Credit Card', onClick: handleCardToggle, color: 'orange' },
        ]}
      >
        <Panel.Section>
          <CardSummary credit_card={account.billing.credit_card} />
        </Panel.Section>
      </Panel>
    );
  }

  const savedPaymentAction = canUpdateBillingInfo
    ? [{ content: 'Use Saved Payment Method', onClick: handleCardToggle, color: 'orange' }]
    : null;

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
};

export default CardSection;
