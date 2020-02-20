const cypress = require('cypress');
const { argv } = require('yargs');
const batches = require('../config/cypressBatches');

function runCypress({ specs }) {
  console.log('Running specs:', specs);

  return cypress
    .run({
      config: {
        video: false,
        integrationFolder: 'cypress/tests/integration',
      },
      spec: specs ? specs.join(',') : undefined,
    })
    .then(() => {
      process.exit(0);
    })
    .catch(() => {
      process.exit(1);
    });
}

const targetSpecs = batches[argv.specBatch];

runCypress({ specs: targetSpecs });
