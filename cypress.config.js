const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/validations/*cy.js',
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    // Video configuration
    video: true,  // Enable video recording (default: true)
    videosFolder: 'cypress/videos',  // Where videos are saved
    videoCompression: 32,  // Compression quality (0-51, lower = better)
    videoUploadOnPasses: false  // Only keep videos of failed tests
  },
});
