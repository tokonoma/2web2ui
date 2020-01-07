import signupFlow from './helpers';

test('Signup flow: choose test plan', async () => {
  const page = await signupFlow();
  await page.signup();
  await page.choosePlan();
  expect(page.currentRoute()).toEqual('/dashboard');
  expect(page.mockApiCalls).toMatchSnapshot();
});
