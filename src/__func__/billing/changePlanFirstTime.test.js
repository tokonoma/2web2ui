import mountRoute from 'src/__testHelpers__/mountRoute';
import getFormFiller from 'src/__testHelpers__/fill';

test('Change Plan: first time', async () => {
  const page = await mountRoute('/account/billing/plan');
  const newPlan = page.store.getState().billing.plans[1];

  const formFiller = getFormFiller(page.wrapper);

  formFiller({ type: 'downshift', name: 'planpicker', value: newPlan });

  formFiller([
    { name: 'card.number', value: '4111111111111111' },
    { name: 'card.name', value: 'Person Face' },
    { name: 'card.expCombined', value: '10 / 2022' },
    { name: 'card.securityCode', value: 123 },

    // Note: we usually do not set first and last name - they are pulled from the API, except in the
    // very rare case where an old non-name-having account tries to upgrade for the first time.
    { type: 'select', name: 'billingAddress.country', value: 'US' },
    { type: 'select', name: 'billingAddress.state', value: 'MD' },
    { name: 'billingAddress.zip', value: '12345' }
  ]);

  await page.simulate('form', 'submit');
  expect(page.mockApiCalls).toMatchSnapshot();
});
