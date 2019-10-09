const prompts = require('prompts');
const fs = require('fs-extra');
/* eslint-disable no-unused-vars */
const colors = require('colors');
/* eslint-enable no-unused-vars */

/* eslint-disable no-console */
const file = './cypress.env.json';

console.log(`Checking for existing "${file}"...`);

fs.pathExists(file)
  .then((exists) => {
    if (exists) {
      console.log(`✅  "${file}" already available, skipping setup`.green);
    } else {
      const questions = [
        {
          type: 'text',
          name: 'USERNAME',
          message: 'Enter the test account username'
        },
        {
          type: 'password',
          name: 'PASSWORD',
          message: 'Enter the test account password'
        }
      ];

      (async () => {
        const response = await prompts(questions);

        try {
          fs.writeJson(file, response);

          console.log(`✅  Success! "${file}" written`.green);
        } catch {
          console.log(`😟  Ruh roh. "${file}" was not written successfully`.red);
        }
      })();
    }
  });
