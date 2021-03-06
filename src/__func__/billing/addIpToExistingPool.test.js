import mountRoute from 'src/__testHelpers__/mountRoute';
import getFormFiller from 'src/__testHelpers__/fill';
import { use } from 'src/__testHelpers__/mockApi';

test('Dedicated IPs: add to existing pool', async () => {
  use('paid');

  const page = await mountRoute('/account/billing');

  const dedicatedIpButtonPredicate = (node) => node.type() === 'button' && /Add Dedicated IPs/.test(node.text());
  const button = page.wrapper.findWhere(dedicatedIpButtonPredicate);
  await button.simulate('click');

  getFormFiller(page.wrapper)([
    { name: 'quantity', value: '1' },
    { name: 'ipPool.action', value: 'existing', type: 'radio' },
    { name: 'ipPool.id', value: 'default', type: 'select' }
  ]);

  await page.simulate('form', 'submit');

  expect(page.mockApiCalls).toMatchSnapshot();
});
