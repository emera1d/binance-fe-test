exports.config = {
  // Override default path ('/wd/hub') for chromedriver service.
  path: '/',
  specs: ['./e2e/**/*.spec.js'],
  exclude: [],
  maxInstances: 10,
  // https://docs.saucelabs.com/reference/platforms-configurator
  capabilities: [
    {
      // maxInstances can get overwritten per capability.
      maxInstances: 5,
      //
      browserName: 'chrome'
      // If outputDir is provided WebdriverIO can capture driver session logs
      // it is possible to configure which logTypes to include/exclude.
      // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
      // excludeDriverLogs: ['bugreport', 'server'],
    }
  ],
  services: ['chromedriver', 'static-server']
};
