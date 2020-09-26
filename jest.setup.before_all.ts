// This file is executed once before each test file.
import { GlobalWithFetchMock } from 'jest-fetch-mock';
import { configure } from 'mobx';
import { LOG } from './core_lib/log';
import { LOG_LEVEL } from './core_lib/utils/VibeLogger';

// Some config settings more suitable for tests
jest.mock('./core_lib/config/config');
const config = require('./core_lib/config/config');
config.settingsPersistDelay = 0;
config.validatorDebounce = 0;
config.reconnectInterval = 0;
config.clockUpdateInterval = 100;
config.downloadUrl = 'https://someenv.vibetech.org/download';
config.getDefaultDensity = () => 1;

// 'fetch' mock
const customGlobal: GlobalWithFetchMock = (global as unknown) as GlobalWithFetchMock;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;

// mobx warning is noisy
const warn = console.warn;
console.warn = () => {};
configure({
  disableErrorBoundaries: true
});
console.warn = warn;

// change this if you want to see test logs.
LOG.logLevel = LOG_LEVEL.OFF;
