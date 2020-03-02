import React from 'react';
import { useFeatureChangeContext } from '../context/FeatureChangeContext';
import CreditCardSection from 'src/components/billing/CreditCardSection';

const FORMNAME = 'changePlan';

const CardSection = ({
  countries,
  selectedPlan,
  account,
  submitting,
  handleCardToggle,
  defaultToggleState,
}) => {
  const { isReady, loading } = useFeatureChangeContext();
  const { billing } = account;

  if (!isReady || loading) {
    return null;
  }
  if (selectedPlan.isFree) {
    return null; // CC not required on free plans
  }

  return (
    <CreditCardSection
      handleCardToggle={handleCardToggle}
      creditCard={billing && billing.credit_card}
      formname={FORMNAME}
      submitting={submitting}
      countries={countries}
      defaultToggleState={defaultToggleState}
    />
  );
};

export default CardSection;
