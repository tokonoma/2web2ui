const prompt = require('prompt');
const fs = require('fs-extra');

const file = './cypress.env.json';
const CypressEnv = {
  USERNAME: undefined,
  PASSWORD: undefined
};
let fileExists;

fs.pathExists(file)
  .then((exists) => {
    fileExists = exists;
  })
  .then(() => {
    /* eslint-disable no-console */
    if (fileExists) {
      console.log('Cypress env already exists, skipping setup...');
    } else {
      prompt.start();

      console.log('❓ Please enter the test username and password to generate a Cypress env config');

      prompt.get(['USERNAME', 'PASSWORD'], function (err, res) {
        CypressEnv.USERNAME = res.USERNAME;
        CypressEnv.PASSWORD = res.PASSWORD;

        fs.writeJson(file, CypressEnv)
          .then(() => {
            console.log('Success! Cypress env written');
          })
          .catch((err) => {
            console.log('Ruh roh. Cypress env was not written successfully');
          });
      });
    }
  });


/* eslint-enable no-console */



