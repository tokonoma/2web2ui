import React from 'react';
import Brightback from 'src/components/brightback/Brightback';
import config from 'src/config';
import { Button } from '@sparkpost/matchbox';
import { useFeatureChangeContext } from '../context/FeatureChangeContext';

const SubmitSection = ({ brightbackCondition, loading }) => {
  const { isReady } = useFeatureChangeContext();
  if (!isReady) {
    return null;
  }

  return (
    <Brightback
      condition={Boolean(brightbackCondition)}
      config={config.brightback.downgradeToFreeConfig}
      render={({ enabled, to }) => (
        <Button
          type={enabled ? 'button' : 'submit'}
          to={enabled ? to : null}
          disabled={loading}
          color='orange'
        >
          Change Plan
        </Button>
      )}
    />
  );
};

export default SubmitSection;
