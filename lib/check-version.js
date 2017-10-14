const semver = require('semver');
const { engines } = require('../package');

// See: https://medium.com/@adambisek/how-to-check-minimum-required-node-js-version-4a78a8855a0f
if (!semver.satisfies(process.version, engines.node)) {
  console.error(`Required node version ${engines.node} not satisfied with current version ${process.version}.`);
  process.exit(1);
}
