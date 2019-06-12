import mountRoute from 'src/__testHelpers__/mountRoute';
import config from 'src/config';

test('Signup flow: REST setup', async () => {
  config.featureFlags.has_signup = true;
  const page = await mountRoute('/onboarding/email/api');
  expect(page.mockApiCalls).toMatchSnapshot();
});
