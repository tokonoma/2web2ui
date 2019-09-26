import mountRoute from 'src/__testHelpers__/mountRoute';
import config from 'src/config';

test('Signup flow: SMTP setup', async () => {
  config.featureFlags.has_signup = true;
  const page = await mountRoute('/onboarding/email/smtp');
  expect(page.mockApiCalls).toMatchSnapshot();
});
