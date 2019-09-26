import signupFlow from './helpers';

test('Signup flow: sending domain', async () => {
  const page = await signupFlow();
  await page.signup();
  await page.choosePlan();
  await page.fillSendingDomainForm();
  expect(page.currentRoute()).toEqual('/onboarding/email');
  expect(page.mockApiCalls).toMatchSnapshot();
});
