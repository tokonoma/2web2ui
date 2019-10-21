import React from 'react';
import Brightback from 'src/components/brightback/Brightback';
import config from 'src/config';
import { Button } from '@sparkpost/matchbox';
import { useFeatureChangeContext } from '../context/FeatureChangeContext';

export const SubmitButton = ({ loading, condition }) => (
  <Brightback
    condition={condition}
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

const SubmitSection = () => {
  const { isReady } = useFeatureChangeContext();
  if (!isReady) {
    return null;
  }

  return (
    <SubmitButton/>
  );
};

export default SubmitSection;
