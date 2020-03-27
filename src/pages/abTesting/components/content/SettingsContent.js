import React, { Fragment } from 'react';
import { ExternalLink } from 'src/components/links';

const SettingsContent = ({ test }) => (
  <div>
    {(test.status === 'draft' || test.status === 'scheduled') && (
      <Fragment>
        <p>
          <span>
            You may continue to adjust these settings and template variants while this test is in{' '}
          </span>
          {test.status}
          <span> mode.</span>
        </p>

        <p>
          <ExternalLink to="https://www.sparkpost.com/docs/tech-resources/a-b-testing-sparkpost/">
            Learn more about configuring AB tests
          </ExternalLink>
          .
        </p>
      </Fragment>
    )}
  </div>
);

export default SettingsContent;
