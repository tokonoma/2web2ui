import React from 'react';
import { ExternalLink } from 'src/components/links';
import ContentText from './ContentText';

const StatusContent = ({ test, rescheduling }) => (
  <div>
    {(test.status === 'draft' || rescheduling) && (
      <div>
        <ContentText fontSize="200" color="gray.600" mt="300">
          You can update your Test Name and select a start time and end time to schedule your A/B
          Test.
        </ContentText>
      </div>
    )}
    {test.status === 'scheduled' && (
      <div>
        <ContentText fontSize="200" color="gray.600" mt="300">
          This test has been scheduled. You can update your Test Name, start time, or end time.
        </ContentText>
      </div>
    )}
    {test.status === 'running' && (
      <div>
        <ContentText fontSize="200" color="gray.600" mt="300">
          This test is currently running. It will conclude when either:
          <ul style={{ fontSize: 'inherit' }}>
            <li>the end date + engagement timeout period is reached</li>
            {test.test_mode === 'bayesian' && (
              <li>the desired confidence level has been reached</li>
            )}
            <li>the desired sample size limit is reached + engagement timeout period is reached</li>
          </ul>
        </ContentText>
      </div>
    )}
    {test.status === 'cancelled' && !rescheduling && (
      <div>
        <ContentText fontSize="200" color="gray.600" mt="300">
          This test run was cancelled. To re-run this test, click "Edit and Reschedule Test".
        </ContentText>
      </div>
    )}
    {test.status === 'completed' && !rescheduling && test.test_mode === 'learning' && (
      <ContentText fontSize="200" color="gray.600" mt="300">
        This test has concluded and it now sending the default template. You may override the
        default with a new one without starting a new test. This test was started and completed at
        the times shown.
      </ContentText>
    )}
    {test.status === 'completed' &&
      !rescheduling &&
      test.test_mode === 'bayesian' &&
      test.winning_template_id !== test.default_template.template_id && (
        <ContentText fontSize="200" color="gray.600" mt="300">
          This test has concluded and it now sending the winning template. You may override it with
          a new one without starting a new test. This test was started and completed at the times
          shown.
        </ContentText>
      )}
    {test.status === 'completed' &&
      !rescheduling &&
      test.test_mode === 'bayesian' &&
      test.winning_template_id === test.default_template.template_id && (
        <ContentText fontSize="200" color="gray.600" mt="300">
          This test has concluded and it now sending the default template. You may override it with
          a new one without starting a new test. This test was started and completed at the times
          shown.
        </ContentText>
      )}
    {(test.status !== 'completed' || rescheduling) && (
      <ContentText fontSize="200" color="gray.600" mt="300">
        <span>You can read about the different A/B Test states </span>
        <ExternalLink to="https://www.sparkpost.com/docs/tech-resources/a-b-testing-sparkpost/#ab-testing-states">
          here
        </ExternalLink>
        .
      </ContentText>
    )}
  </div>
);

export default StatusContent;
