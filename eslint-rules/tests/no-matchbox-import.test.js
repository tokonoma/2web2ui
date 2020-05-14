import runner from '../utils/eslint-test-runner';
import caseList from '../cases/no-matchbox-import';
import rule from '../no-matchbox-import';

runner('no-matchbox-import', rule, caseList);
