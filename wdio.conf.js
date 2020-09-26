const TEST_PLATFORM = process.env.TEST_PLATFORM || 'web';
console.log(`Selected platform: ${TEST_PLATFORM}`);

const mainConfig = require('./wdio.main.conf').config;
const platformConfig = require(`./wdio.${TEST_PLATFORM}.conf.js`).config;

exports.config = { ...mainConfig, ...platformConfig };
