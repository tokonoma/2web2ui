import mountRoute from 'src/__testHelpers__/mountRoute';

test('Signup flow: REST setup', async () => {
  const page = await mountRoute('/onboarding/email/api');
  expect(page.mockApiCalls).toMatchSnapshot();
});
