import React from 'react';
import { Button } from 'src/components/matchbox';
import { useFeatureChangeContext } from '../context/FeatureChangeContext';

const SubmitSection = ({ isDowngradeToFree, loading, freePlan = {} }) => {
  const { loading: featureSectionLoading } = useFeatureChangeContext();
  if (featureSectionLoading) {
    return null;
  }

  return (
    <Button
      type={isDowngradeToFree ? 'button' : 'submit'}
      to={
        isDowngradeToFree
          ? `/account/billing/plan/change?immediatePlanChange=${freePlan.code}`
          : null
      }
      disabled={loading}
      variant="primary"
    >
      Change Plan
    </Button>
  );
};

export default SubmitSection;
