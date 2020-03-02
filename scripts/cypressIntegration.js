const cypress = require('cypress');
const { argv } = require('yargs');
const batches = require('../config/cypressBatches');

function runCypress({ specs }) {
  console.log('Running specs:', specs || 'All');

  return cypress
    .run({
      config: {
        video: false,
        integrationFolder: 'cypress/tests/integration',
      },
      spec: specs ? specs.join(',') : undefined,
    })
    .then(results => {
      process.exit(results.totalFailed);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

const targetSpecs = batches[argv.specBatch];

runCypress({ specs: targetSpecs });
