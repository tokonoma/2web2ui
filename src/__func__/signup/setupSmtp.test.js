import mountRoute from 'src/__testHelpers__/mountRoute';

test('Signup flow: SMTP setup', async () => {
  const page = await mountRoute('/onboarding/email/smtp');
  expect(page.mockApiCalls).toMatchSnapshot();
});
