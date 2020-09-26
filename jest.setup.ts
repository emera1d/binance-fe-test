// Run some code before jest is even created.
// NOTE: modules will be reset for every test, this file is only for truly global stuff
module.exports = async () => {
  process.env.APP_ENV = 'local_dev';
};
