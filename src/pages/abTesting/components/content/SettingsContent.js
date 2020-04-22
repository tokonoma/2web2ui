import React, { Fragment } from 'react';
import { ExternalLink } from 'src/components/links';
import ContentText from './ContentText';

const SettingsContent = ({ test }) => (
  <div>
    {(test.status === 'draft' || test.status === 'scheduled') && (
      <Fragment>
        <ContentText fontSize="200" color="gray.600">
          <span>
            You may continue to adjust these settings and template variants while this test is in{' '}
          </span>
          {test.status}
          <span> mode.</span>
        </ContentText>

        <ContentText fontSize="200" color="gray.600">
          <ExternalLink to="https://www.sparkpost.com/docs/tech-resources/a-b-testing-sparkpost/">
            Learn more about configuring AB tests
          </ExternalLink>
          .
        </ContentText>
      </Fragment>
    )}
  </div>
);

export default SettingsContent;
