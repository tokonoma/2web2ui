import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { create as createDomain } from 'src/actions/sendingDomains';
import { Button, Panel, Text, UnstyledLink } from 'src/components/matchbox';
import { TextFieldWrapper, CenteredLogo } from 'src/components';
import SkipLink from './components/SkipLink';
import { required, domain } from 'src/helpers/validation';
import * as analytics from 'src/helpers/analytics';
import {
  FORMS,
  LINKS,
  ANALYTICS_ONBOARDING,
  ANALYTICS_ONBOARDING_LEARN_MORE,
  ANALYTICS_ONBOARDING_CREATE_DOMAIN,
} from 'src/constants';

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
    }
  }, [history, submitSucceeded]);

  const trackLearnMoreClick = () =>
    analytics.trackEvent({
      category: ANALYTICS_ONBOARDING,
      action: ANALYTICS_ONBOARDING_LEARN_MORE,
      data: { action: ANALYTICS_ONBOARDING_LEARN_MORE },
    });

  return (
    <>
      <CenteredLogo />
      <Panel accent title="Welcome to SparkPost!">
        <form onSubmit={handleSubmit(handleDomainCreate)}>
          <Panel.Section>
            <p>
              <Text as="p" mb={300}>
                Let's get you set up to send some email!
              </Text>
            </p>
            <p>
              <Text as="p" mb={300}>
                Which domain will you be sending from?{' '}
                <UnstyledLink to={LINKS.ONBOARDING_SENDING} onClick={trackLearnMoreClick} external>
                  Learn more about sending domains
                </UnstyledLink>
                .
              </Text>
            </p>
            <Field
              component={TextFieldWrapper}
              label="Domain Name"
              placeholder="email.example.com"
              name="domain"
              validate={[required, domain]}
              disabled={submitting}
            />
          </Panel.Section>
          <Panel.Section>
            <Button primary submit disabled={submitting} variant="primary">
              {submitting ? 'Adding Domain...' : 'Add Domain'}
            </Button>
            <SkipLink to="/dashboard">Skip for now</SkipLink>
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
