// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = on => {
  on('task', {
    // Used to allow `cy.log()` to the Node console when running in headless mode
    log(message) {
      // eslint-disable-next-line
      console.log(message);

      return null;
    },
  });

  // See: https://github.com/cypress-io/cypress/issues/3602#issuecomment-591531887
  // Helps prevent Cypress-launched Chrome browser from crashing when using CircleCI
  on('before:browser:launch', (browser = {}, launchOptions) => {
    // `args` is an array of all the arguments that will
    // be passed to browsers when it launches

    if (browser.family === 'chromium' && browser.name !== 'electron') {
      // see: https://github.com/cypress-io/cypress/issues/3633
      launchOptions.args.push('--disable-dev-shm-usage');

      // whatever you return here becomes the launchOptions
      return launchOptions;
    }
  });
};
