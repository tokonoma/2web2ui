import React from 'react';
import { Banner } from '@sparkpost/matchbox';

const CongratsBanner = ({ onDismiss }) => {
  return (
    <div data-id="congrats-banner">
      <Banner
        title="Congratulations! You are not currently on a Blacklist"
        status="success"
        onDismiss={onDismiss}
      >
        No blacklist issues detected. Keep up the great work!
      </Banner>
    </div>
  );
};

export default CongratsBanner;
