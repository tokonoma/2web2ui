// import rule from '../no-matchbox-import';
import { describe, it, expect } from 'jest-without-globals';
import { RuleTester } from 'eslint';

// const ruleTester = new RuleTester({
//     parserOptions: {
//         ecmaVersion: 7,
//         sourceType: 'module',
//     },
// });

// https://eslint.org/docs/developer-guide/nodejs-api#customizing-ruletester
RuleTester.describe = function(text, method) {
  RuleTester.it.title = text;
  return method.call(this);
};

RuleTester.it = function(text, method) {
  it(RuleTester.it.title + ': ' + text, method);
};

describe('testing', () => {
  it('it should do something', () => {
    expect('').toBe('wat');
  });
});

// ruleTester.run('no-matchbox-import', rule, {
//     valid: [
//         {
//             code: "import { OpenInNew } from '@sparkpost/matchbox-icons'",
//             filename: '2web2ui/src/components/example',
//         },
//         {
//             code: "import { ComboBox as OGComboBox } from '@sparkpost/matchbox'",
//             filename: '2web2ui/src/components/matchbox',
//         },
//         {
//             code: "import { ComboBox as HibanaComboBox } from '@sparkpost/matchbox-hibana'",
//             filename: '2web2ui/src/components/matchbox',
//         },
//     ],
//     invalid: [
//         {
//             code: "import { ComboBox as OGComboBox } from '@sparkpost/matchbox'",
//             filename: '2web2ui/src/components/not-in-matchbox-wrapper-directory',
//             errors: [{ message: 'Do not allow direct matchbox imports.' }],
//         },
//         {
//             code: "import { ComboBox as HibanaComboBox } from '@sparkpost/matchbox-hibana'",
//             filename: '2web2ui/src/components/not-in-matchbox-wrapper-directory',
//             errors: [{ message: 'Do not allow direct matchbox imports.' }],
//         },
//     ],
// });
