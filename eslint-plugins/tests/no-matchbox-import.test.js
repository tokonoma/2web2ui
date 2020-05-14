const runner = require('../utils/eslint-test-runner');
const rule = require('../no-matchbox-import');

runner('no-matchbox-import', rule, {
  valid: [
    {
      code: "import { OpenInNew } from '@sparkpost/matchbox-icons'",
      filename: '2web2ui/src/components/example',
    },
    {
      code: "import { ComboBox as OGComboBox } from '@sparkpost/matchbox'",
      filename: '2web2ui/src/components/matchbox',
    },
    {
      code: "import { ComboBox as HibanaComboBox } from '@sparkpost/matchbox-hibana'",
      filename: '2web2ui/src/components/matchbox',
    },
  ],
  invalid: [
    {
      code: "import { ComboBox as OGComboBox } from '@sparkpost/matchbox'",
      filename: '2web2ui/src/components/not-in-matchbox-wrapper-directory',
      errors: [{ message: 'Do not allow direct matchbox imports.' }],
    },
    {
      code: "import { ComboBox as HibanaComboBox } from '@sparkpost/matchbox-hibana'",
      filename: '2web2ui/src/components/not-in-matchbox-wrapper-directory',
      errors: [{ message: 'Do not allow direct matchbox imports.' }],
    },
  ],
});
