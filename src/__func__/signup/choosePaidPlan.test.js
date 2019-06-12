import signupFlow, { freePlanPredicate } from './helpers';

test('Signup flow: choose paid plan', async () => {
  const page = await signupFlow();
  await page.signup();
  await page.choosePlan({ planFilter: (plan) => !freePlanPredicate(plan), submit: false });
  await page.fillBillingForm();
  await page.simulate('form', 'submit');

  expect(page.currentRoute()).toEqual('/onboarding/sending-domain');
  expect(page.mockApiCalls).toMatchSnapshot();
});
