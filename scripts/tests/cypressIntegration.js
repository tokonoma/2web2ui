const cypress = require('cypress');
const { argv } = require('yargs');

const batches = {
  first: [
    'cypress/tests/integration/accounts/**/*',
    'cypress/tests/integration/events/**/*',
    'cypress/tests/integration/navigation/**/*',
    'cypress/tests/integration/reports/**/*',
  ],
  second: ['cypress/tests/integration/templates/**/*', 'cypress/tests/integration/recipients/**/*'],
};

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
