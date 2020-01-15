import React from 'react';
import { Banner } from '@sparkpost/matchbox';

const CongratsBanner = ({
  onDismiss,
  title = 'Congratulations! You are not currently on a Blacklist',
  content = 'Nice work keeping your sending reputation squeaky clean!',
}) => {
  return (
    <div data-id="congrats-banner">
      <Banner title={title} status="success" onDismiss={onDismiss}>
        {content}
      </Banner>
    </div>
  );
};

export default CongratsBanner;
