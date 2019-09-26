import signupFlow from './helpers';

// This test is a little weak. Its intended only to verify that a path exists from this step.
test('Signup flow: choose protocol', async () => {
  const page = await signupFlow();
  await page.signup();
  await page.choosePlan();
  await page.fillSendingDomainForm();
  expect(page.find('a[href="/onboarding/email/smtp"]')).toExist();
  expect(page.find('a[href="/onboarding/email/api"]')).toExist();
});
