'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');


const jest = require('jest');
const execSync = require('child_process').execSync;
let argv = process.argv.slice(2);

function isInGitRepository() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

function isInMercurialRepository() {
  try {
    execSync('hg --cwd . root', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

// Watch unless on CI, in coverage mode, or explicitly running all tests
if (
  !process.env.CI &&
  argv.indexOf('--coverage') === -1 &&
  argv.indexOf('--watchAll') === -1
) {
  // https://github.com/facebook/create-react-app/issues/5210
  const hasSourceControl = isInGitRepository() || isInMercurialRepository();
  argv.push(hasSourceControl ? '--watch' : '--watchAll');
}

if (process.env.CI && process.env.TRAVIS) {
  argv.push(
    // Preserves color highlighting for Jest output when Jest is invoked from
    // another script rather than directly
    '--colors',

    // TODO This is an experimental feature that is noisy, but could be very beneficial
    // SEE https://github.com/facebook/jest/pull/4895
    // SEE https://github.com/facebook/jest/blob/1918f6beb6b32471304125b31329129b21ebd3ef/website/blog/2017-12-18-jest-22.md#experimental-leak-detection
    '--detectLeak',

    // prints heap size per test file
    '--logHeapUsage',

    // Jest v22 introduced jest-worker for easy parallelization by forking processes in parallel.  The
    // spawning of each worker is expensive.  The recommendation is number of workers should be number
    // of CPUs minus one.  Our Travis CI free plan only provides a machine with two CPU.
    // SEE https://github.com/facebook/jest/pull/4497/files
    // SEE https://github.com/facebook/jest/blob/1918f6beb6b32471304125b31329129b21ebd3ef/website/blog/2017-12-18-jest-22.md#custom-runners--easy-parallelization-with-jest-worker
    // SEE https://github.com/facebook/jest/blob/a0370ade8aa53dbce95e68d9d01e952bcd2b6f40/docs/Troubleshooting.md#tests-are-extremely-slow-on-docker-andor-continuous-integration-ci-server
    '--maxWorkers=1',

    // prints execution time per test
    '--verbose'
  );
}

jest.run(argv);
