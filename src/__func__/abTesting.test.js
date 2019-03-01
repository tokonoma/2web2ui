import mountRoute from 'src/__testHelpers__/mountRoute';

test('A/B testing edit page', async () => {
  const { mounted } = await mountRoute('/ab-testing/101/1');
  expect(mounted.find('Page')).toExist();
});
