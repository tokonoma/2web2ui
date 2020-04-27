import React from 'react';
import { ExternalLink } from 'src/components/links';
import ContentText from './ContentText';
import { Box } from 'src/components/matchbox';

const SettingsContent = ({ test }) => (
  <Box minHeight={30}>
    {(test.status === 'draft' || test.status === 'scheduled') && (
      <>
        <ContentText fontSize="200" color="gray.600" mt="300">
          <span>
            You may continue to adjust these settings and template variants while this test is in{' '}
          </span>
          {test.status}
          <span> mode.</span>
        </ContentText>

        <ContentText fontSize="200" color="gray.600" mt="300">
          <ExternalLink to="https://www.sparkpost.com/docs/tech-resources/a-b-testing-sparkpost/">
            Learn more about configuring AB tests
          </ExternalLink>
          .
        </ContentText>
      </>
    )}
  </Box>
);

export default SettingsContent;
