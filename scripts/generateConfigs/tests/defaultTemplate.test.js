const cases = require('jest-in-case');
const defaultTemplate = require('../defaultTemplate');

it('generateConfigs.defaultTemplate', () => {
  expect(defaultTemplate({ tenantId: 'testTenant' })).toMatchSnapshot();
});
