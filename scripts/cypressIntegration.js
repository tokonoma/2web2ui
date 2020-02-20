const cypress = require('cypress');
const { argv } = require('yargs');
const batches = require('../config/cypressBatches');

function runCypress({ specs }) {
  return cypress.run({
    config: {
      video: false,
      integrationFolder: 'cypress/tests/integration',
    },
    spec: specs ? specs.join(',') : undefined,
  });
}

const targetSpecs = batches[argv.specBatch];

runCypress({ specs: targetSpecs });
