const { RuleTester } = require('eslint');

// wire up to Jest
RuleTester.describe = describe;
RuleTester.it = (title, callback) => {
  // ignore title, it is the code
  it('', () => {
    expect(callback()).toBeUndefined();
  });
};

const runner = (title, rule, cases) => {
  const tester = new RuleTester({
    parserOptions: {
      ecmaVersion: 7,
      sourceType: 'module',
    },
  });

  return tester.run(title, rule, cases);
};

module.exports = runner;
