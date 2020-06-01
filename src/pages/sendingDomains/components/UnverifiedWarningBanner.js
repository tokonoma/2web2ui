import React from 'react';
import { Banner } from 'src/components/matchbox';
import { ExternalLink } from 'src/components/links';
import { LINKS } from 'src/constants';

const UnverifiedWarningBanner = () => {
  return (
    <Banner
      status="warning"
      title="Unverified sending domains will be removed two weeks after creation."
      marginBottom="500"
    >
      <p>All domains will also need a clear web presence to pass verification.</p>

      <Banner.Actions>
        <ExternalLink to={LINKS.SENDING_REQS}>Learn more about review requirements</ExternalLink>
      </Banner.Actions>
    </Banner>
  );
};

export default UnverifiedWarningBanner;
