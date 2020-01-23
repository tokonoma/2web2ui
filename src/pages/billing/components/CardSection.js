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
  isNewChangePlanForm, //TODO: remove this when removing the OldChangePlanForm
}) => {
  const { isReady, loading } = useFeatureChangeContext();
  const { billing } = account;

  if ((!isReady || loading) && isNewChangePlanForm) {
    return null;
  }
  if (selectedPlan.isFree) {
    return null; // CC not required on free plans
  }

  return (
    <CreditCardSection
      handleCardToggle={handleCardToggle}
      credit_card={billing && billing.credit_card}
      formname={FORMNAME}
      submitting={submitting}
      countries={countries}
    />
  );
};

export default CardSection;
