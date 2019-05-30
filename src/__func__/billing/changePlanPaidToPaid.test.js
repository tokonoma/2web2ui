import mountRoute from 'src/__testHelpers__/mountRoute';
import getFormFiller from 'src/__testHelpers__/fill';
import { use } from 'src/__testHelpers__/mockApi';

test('Change Plan: paid to paid', async () => {
  use('paid');

  const page = await mountRoute('/account/billing/plan');
  const newPlan = page.store.getState().billing.plans[2];

  // switch plan
  await getFormFiller(page.wrapper)({ type: 'downshift', name: 'planpicker', value: newPlan });

  // submit
  await page.simulate('form', 'submit');

  // check thangs out
  expect(page.mockApiCalls).toMatchSnapshot();
});
