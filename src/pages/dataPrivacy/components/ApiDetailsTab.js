import React from 'react';
import { Button, Panel, Stack } from 'src/components/matchbox';
import { ExternalLink } from 'src/components/links';
import { Heading } from 'src/components/text';

const ApiDetailsTab = ({ history }) => (
  <>
    <Panel.Section>
      <Stack>
        <Heading as="h3" looksLike="h5">
          Integrate Now
        </Heading>

        <p>
          Information on how to use this API key.{' '}
          <ExternalLink to="https://developers.sparkpost.com/api/data-privacy">
            Link to documentation
          </ExternalLink>
        </p>
      </Stack>
    </Panel.Section>

    <Panel.Section>
      <Button variant="primary" onClick={() => history.push(`/account/api-keys/create`)}>
        {'Generate key'}
      </Button>
    </Panel.Section>
  </>
);

export default ApiDetailsTab;
