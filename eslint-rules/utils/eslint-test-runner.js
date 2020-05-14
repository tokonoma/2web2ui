const { RuleTester } = require('eslint');

const mapCodeToIt = function(cases) {
  let titleByCode = {};

  cases['valid'] = cases['valid'].map(({ it, ...item }) => {
    titleByCode[item.code] = it;
    return item;
  });

  cases['invalid'] = cases['invalid'].map(({ it, ...item }) => {
    titleByCode[item.code] = it;
    return item;
  });

  return [cases, titleByCode];
};

const runner = (title, rule, originalCases) => {
  const [cases, titleByCode] = mapCodeToIt(originalCases);

  // wire up to Jest expect to assert
  RuleTester.describe = describe;
  RuleTester.it = (title, callback) => {
    // ToDo: Fix map so it doesn't override when 'code' property is the same
    // eslint-disable-next-line no-unused-vars
    const itText = titleByCode[title];
    it('', () => {
      // ToDo: Catch the error and make it friendly
      expect(callback()).toBeUndefined();
    });
  };

  const tester = new RuleTester({
    parserOptions: {
      ecmaVersion: 7,
      sourceType: 'module',
    },
  });

  return tester.run(title, rule, cases);
};

// This file is a wrapper for our 2web2ui custom eslint rules. We need to export this into the .test.js files.
// eslint-disable-next-line jest/no-export
module.exports = runner;
