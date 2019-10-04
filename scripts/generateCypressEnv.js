const prompt = require('prompt');
const fs = require('fs-extra');
/* eslint-disable no-unused-vars */
const colors = require('colors');
/* eslint-enable no-unused-vars */

/* eslint-disable no-console */
const file = './cypress.env.json';
const CypressEnv = {
  USERNAME: undefined,
  PASSWORD: undefined
};
let fileExists;

console.log(`Checking for existing "${file}"...`);

fs.pathExists(file)
  .then((exists) => {
    fileExists = exists;
  })
  .then(() => {
    if (fileExists) {
      console.log(`✅  "${file}" already available, skipping setup and launching Cypress`.green);
    } else {
      prompt.start();

      console.log('🔒  Enter the test username and password to generate a Cypress env config'.cyan);

      prompt.get(['USERNAME', 'PASSWORD'], function (err, res) {
        CypressEnv.USERNAME = res.USERNAME;
        CypressEnv.PASSWORD = res.PASSWORD;

        fs.writeJson(file, CypressEnv)
          .then(() => {
            console.log(`✅  Success! "${file}" written, launching Cypress`.green);
          })
          .catch((err) => {
            console.log(`error -> ${err}`.red);
            console.log(`Ruh roh. "${file}" was not written successfully`.red);
          });
      });
    }
  })
  .finally(() => prompt.stop());
