const cypress = require('cypress');
const { argv } = require('yargs');
const batches = require('../config/cypressBatches');

function runCypress({ specs }) {
  return cypress
    .run({
      config: {
        video: false,
        integrationFolder: 'cypress/tests/integration',
      },
      spec: specs ? specs.join(',') : undefined,
    })
    .then(results => {
      console.log('then!');
      console.log(results);
      process.exit(0);
    })
    .catch(err => {
      console.log('catch!');
      console.error(err);
      process.exit(1);
    });
}

const targetSpecs = batches[argv.specBatch];

runCypress({ specs: targetSpecs });
