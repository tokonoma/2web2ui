import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { create as createDomain } from 'src/actions/sendingDomains';
import { ButtonWrapper, TextFieldWrapper, CenteredLogo } from 'src/components';
import { ExternalLink, PageLink } from 'src/components/links';
import { Button, Panel, Stack } from 'src/components/matchbox';
import { required } from 'src/helpers/validation';
import * as analytics from 'src/helpers/analytics';
import {
  FORMS,
  LINKS,
  ANALYTICS_ONBOARDING,
  ANALYTICS_ONBOARDING_CREATE_DOMAIN,
  CAMPAIGN_IDS,
} from 'src/constants';
import { trackCustomConversionGoal } from 'src/helpers/vwo';
export function SendingDomainPage(props) {
  const { submitSucceeded, history, handleSubmit, submitting } = props;

  const handleDomainCreate = values => {
    const { createDomain } = props;

    return createDomain(values).catch(err => {
      // Required to properly control 'submitFailed' & 'submitSucceeded'
      throw new SubmissionError(err);
    });
  };

  useEffect(() => {
    if (submitSucceeded) {
      analytics.trackEvent({
        category: ANALYTICS_ONBOARDING,
        action: ANALYTICS_ONBOARDING_CREATE_DOMAIN,
        data: { action: ANALYTICS_ONBOARDING_CREATE_DOMAIN },
      });
      history.push('/dashboard');
      trackCustomConversionGoal(CAMPAIGN_IDS.ONBOARDING_SENDINGDOMAIN);
    }
  }, [history, submitSucceeded]);

  return (
    <>
      <CenteredLogo />
      <Panel title="Welcome to SparkPost!">
        <form onSubmit={handleSubmit(handleDomainCreate)}>
          <Panel.Section>
            <Stack>
              <p>Let's get you set up to send some email!</p>
              <p>
                Which domain will you be sending from?{' '}
                <ExternalLink to={LINKS.ONBOARDING_SENDING}>
                  Learn more about sending domains
                </ExternalLink>
              </p>
              <Field
                component={TextFieldWrapper}
                label="Domain Name"
                name="domain"
                // Do not try to validate sending domains, let our API make that decision
                validate={[required]}
                disabled={submitting}
              />
            </Stack>
          </Panel.Section>
          <Panel.Section>
            <ButtonWrapper>
              <Button submit disabled={submitting} variant="primary">
                {submitting ? 'Adding Domain...' : 'Add Domain'}
              </Button>
              <PageLink as={Button} to="/dashboard" variant="secondary">
                Skip for now
              </PageLink>
            </ButtonWrapper>
          </Panel.Section>
        </form>
      </Panel>
    </>
  );
}

const mapStateToProps = () => ({
  initialValues: {
    domain: '',
  },
});

export default connect(mapStateToProps, { createDomain })(
  reduxForm({ form: FORMS.JOIN_SENDING_DOMAIN })(SendingDomainPage),
);
