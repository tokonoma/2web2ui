const rule = require("../rules/no-matchbox-import"),
    RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 7,
        sourceType: "module"
    }
});

ruleTester.run("no-matchbox-import", rule, {
    valid: [
        {
            code: "import { OpenInNew } from '@sparkpost/matchbox-icons'",
            filename: "2web2ui/src/components/example"
        },
        {
            code: "import { ComboBox as OGComboBox } from '@sparkpost/matchbox'",
            filename: "2web2ui/src/components/matchbox"
        },
        {
            code: "import { ComboBox as HibanaComboBox } from '@sparkpost/matchbox-hibana'",
            filename: "2web2ui/src/components/matchbox"
        }
    ],
    invalid: [
        {
            code: "import { ComboBox as OGComboBox } from '@sparkpost/matchbox'",
            filename: "2web2ui/src/components/not-in-matchbox-wrapper-directory",
            errors: [{ message: "Do not allow direct matchbox imports." }]
        },
        {
            code: "import { ComboBox as HibanaComboBox } from '@sparkpost/matchbox-hibana'",
            filename: "2web2ui/src/components/not-in-matchbox-wrapper-directory",
            errors: [{ message: "Do not allow direct matchbox imports." }]
        }
    ]
});
