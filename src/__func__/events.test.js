import mountRoute from 'src/__testHelpers__/mountRoute';

Date.now = jest.fn(() => 1512509841582);

test('Events search page', async () => {
  const { mounted } = await mountRoute('/reports/message-events');
  expect(mounted.find('TableCollection')).toExist();
});

test('Events search pagination', async () => {
  const { mounted, forceUpdate } = await mountRoute('/reports/message-events');
  const nextBtn = mounted.find('Pager Button[disabled=false]');
  nextBtn.simulate('click');
  await forceUpdate();
  expect(mounted.find('TableCollection')).toExist();
});
