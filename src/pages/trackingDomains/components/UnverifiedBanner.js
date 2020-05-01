import React from 'react';
import { Banner, Button, Stack } from 'src/components/matchbox';
import { ButtonWrapper } from 'src/components';
import { LINKS } from 'src/constants';

const UnverifiedBanner = ({ unverifiedDomains, cname }) => {
  const count = unverifiedDomains.length;

  if (!count) {
    return null;
  }

  const title =
    count > 1
      ? `You have ${count} unverified tracking domains`
      : 'You have an unverified tracking domain';

  return (
    <Banner status="warning" title={title} my="300">
      <Stack>
        <p>
          To verify a tracking domain, edit its DNS settings to <strong>add a CNAME record</strong>{' '}
          with the value of <strong>{cname}</strong>.
        </p>
        <ButtonWrapper>
          <Button outline external to={LINKS.DOMAIN_VERIFICATION}>
            Learn more
          </Button>
        </ButtonWrapper>
      </Stack>
    </Banner>
  );
};

export default UnverifiedBanner;
