import runner from '../utils/eslint-test-runner';
import caseList from './cases/no-matchbox-import';
import rule from '../no-matchbox-import';

// code: node.source.value in the real rule
// it: custom friendly name for cli output

const caseList = {
  valid: [
    {
      it: 'allows matchbox-icons import from outside the matchbox component folder',
      code: "import { OpenInNew } from '@sparkpost/matchbox-icons'",
      filename: '2web2ui/src/components/example',
    },
    {
      it: 'allows matchbox-icons import from within the matchbox component folder',
      code: "import { OpenInNew } from '@sparkpost/matchbox-icons'",
      filename: '2web2ui/src/components/matchbox',
    },
    {
      it: 'Allows the matchbox import from inside the matchbox component folder',
      code: "import { ComboBox as OGComboBox } from '@sparkpost/matchbox'",
      filename: '2web2ui/src/components/matchbox',
    },
    {
      it: 'Allows the matchbox-hibana import from inside the matchbox component folder',
      code: "import { ComboBox as HibanaComboBox } from '@sparkpost/matchbox-hibana'",
      filename: '2web2ui/src/components/matchbox',
    },
  ],
  invalid: [
    {
      it: 'Does not allow matchbox import outside the matchbox component folder',
      code: "import { ComboBox as OGComboBox } from '@sparkpost/matchbox'",
      filename: '2web2ui/src/components/not-in-matchbox-wrapper-directory',
      errors: [{ message: 'Do not allow direct matchbox imports.' }],
    },
    {
      it: 'Does not allow matchbox-hibana import outside the matchbox component folder',
      code: "import { ComboBox as HibanaComboBox } from '@sparkpost/matchbox-hibana'",
      filename: '2web2ui/src/components/not-in-matchbox-wrapper-directory',
      errors: [{ message: 'Do not allow direct matchbox imports.' }],
    },
  ],
};

runner('no-matchbox-import', rule, caseList);
