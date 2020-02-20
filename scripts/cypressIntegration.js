const cypress = require('cypress');
const { argv } = require('yargs');
const batches = require('../config/cypressBatches');

function runCypress({ specs }) {
  if (!specs) {
    console.error(
      'No matching spec files found. Please pass in a valid value with the `--specBatch` flag',
    );
    process.exit(1);
  }

  console.log('Running specs:', specs);

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
