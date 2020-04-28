import React from 'react';
import { Banner } from 'src/components/matchbox';
import { ExternalLink } from 'src/components/links';
import { ButtonWrapper } from 'src/components';
import { LINKS } from 'src/constants';

const UnverifiedWarningBanner = () => {
  return (
    <Banner
      status="warning"
      title="Unverified sending domains will be removed two weeks after creation."
      my="300"
    >
      <p>All domains will also need a clear web presence to pass verification.</p>

      <ButtonWrapper>
        <ExternalLink flat to={LINKS.SENDING_REQS}>
          Learn more about review requirements
        </ExternalLink>
      </ButtonWrapper>
    </Banner>
  );
};

export default UnverifiedWarningBanner;
