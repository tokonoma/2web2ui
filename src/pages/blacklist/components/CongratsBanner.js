import React from 'react';
import { Banner } from 'src/components/matchbox';

const CongratsBanner = ({
  onDismiss,
  title = 'Congratulations! You are not currently on a Blacklist',
  content = 'Nice work keeping your sending reputation squeaky clean!',
}) => {
  return (
    <div data-id="congrats-banner">
      <Banner title={title} status="success" onDismiss={onDismiss} mb="400">
        {content}
      </Banner>
    </div>
  );
};

export default CongratsBanner;
