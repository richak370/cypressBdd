const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://magento.softwaretestingboard.com/',
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on('file:preprocessor', bundler);
      await addCucumberPreprocessorPlugin(on, config);

      return config;
    },
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.js',// implement node event listeners here
    stepDefinitions: 'cypress/e2e/step/*.js',
    },
});
