const fs = require('fs-extra');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');

/* eslint-disable no-console */
function copyMatchboxStyles() {
  fs.copy('node_modules/@sparkpost/matchbox/styles.css', 'public/static/styles-default.css')
    .then(() => {
      console.log(`✅  Default Matchbox styles copied`.green);
    })
    .catch(err => {
      console.error(`😟 Copying default Matchbox styles failed: ${err}`.red);
      process.exit(1);
    });

  fs.copy('node_modules/hibana/styles.css', 'public/static/styles-hibana.css')
    .then(() => {
      console.log(`🔥  Hibana Matchbox styles copied`.green);
    })
    .catch(err => {
      console.error(`😟 Copying Hibana Matchbox styles failed: ${err}`.red);
      process.exit(1);
    });
}

module.exports = copyMatchboxStyles;
