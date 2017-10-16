#!/usr/bin/env node

const path = require('path');
const stringify = require('json-stable-stringify');
const deleteIfExists = require('./delete-if-exists');
const nopsPrompt = require('./nops-prompt');
const nopsDownload = require('./nops-download');
const nopsDecrypt = require('./nops-decrypt');
const nopsValidate = require('./nops-validate');
const isRunDirectly = require.main === module;

let fixtures;

try {
  fixtures = require('../fixtures.json');
} catch (error) {
  // This file only exists in development environments. It is passed to
  // `nopsPrompt()` as user input fixtures.
}

/**
 * Primary entry point for consolidated usage of nops modules. The `input_`
 * argument is expected to be undefined when run from the command line. Instead
 * input will gathered interactively. The `input_` argument is expected to be
 * populated with the following properties when executed through `require`.
 *
 * @param {Object} input - Input from a controlling, non-CLI, module.
 * @param {String} input.url - The PKG URL to download.
 * @param {String} input.license - The zRIF (recommended) or klicensee
 *   (deprecated).
 * @param {String} input.downloadDirectory - The directory to store the PKG
 *   download.
 * @param {String} input.decryptDirectory - The directory to store the
 *   decrypted PKG contents.
 * @param {String} [input.name] - The package's name.
 * @param {String} [input.titleId] - The package's title ID.
 * @param {Boolean} [input.dirty=false] - Keep downloaded PKG after successful
 *   decryption and extraction.
 * @param {Boolean} [input.verbose=false] - Use verbose output to stdout and
 *   stderr.
 * @param {stream.Writable} [input.stdout=process.stdout] - Writable stream for
 *   stdout output.
 * @param {stream.Writable} [input.stderr=process.stderr] - Writable stream for
 *   stderr output.
 * @param {String} [input.stderr='pkg_dec'] - Name of the executable which
 *   extracts and decrypts PKG. It should exist in your system $PATH.
 */

async function main(input = {}) {
  let interactiveInput = {};
  let downloadDirectory = input.downloadDirectory;
  let url = input.url;

  if (isRunDirectly) {
    interactiveInput = await nopsPrompt(fixtures);
    downloadDirectory = interactiveInput.downloadDirectory;
    url = interactiveInput.url;
  }

  const options = {
    // Behavior options.
    command: 'pkg_dec',
    dirty: false,
    stdout: process.stdout,
    stderr: process.stderr,
    verbose: false,
    // Input driven options.
    filePath: path.join(downloadDirectory, `${url.split('/').pop()}`),
    // Spread `input` last so programtic input value overrides static values.
    ...interactiveInput,
    ...input
  };

  if (options.verbose) {
    const substitute = { replaced: true };
    const serialized = stringify(options, {
      // stdout and stderror are circular structures.
      replacer: (key, value) => /^std(out|err)$/.test(key) ? substitute : value,
      space: 2
    })

    options.stderr.write(`Options ${serialized}\n`);
  }

  await nopsValidate(options);
  await nopsDownload(options);
  await nopsDecrypt(options);

  if (!options.dirty) {
    await deleteIfExists(options.filePath);
  }
}

if (isRunDirectly) {
  const program = require('commander');
  const { name, version } = require('../package');

  program.
    version(`${name} ${version}`).
    usage('[options]').
    option('-d, --dirty', 'disable deletion of downloaded PKG after successful decryption and extraction').
    option('-v, --verbose', 'enable verbose output to stdout and stderr').
    parse(process.argv);

  main({
    dirty: !!program.dirty,
    verbose: !!program.verbose
  }).
    then(() => {
      process.exit(0);
    }).
    catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = main;
