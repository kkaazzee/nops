const fs = require('fs-extra');
const spawn = require('child_process').spawn;
const nopsValidate = require('./nops-validate');
const DotDot = require('./DotDot');

module.exports = async function (options) {
  await nopsValidate(options, [
    'command',
    'decryptDirectory',
    'filePath',
    'license',
    'stderr',
    'stdout',
    'verbose'
  ]);

  const {
    command,
    decryptDirectory,
    filePath,
    license,
    stderr,
    stdout,
    verbose
  } = options;

  return new Promise(async (resolve, reject) => {
    const parameters = [
      '--make-dirs=ux',
      `--license=${license}`,
      filePath,
      decryptDirectory
    ];

    const escapedParameters = [
      parameters[0],
      parameters[1],
      parameters[2].replace(/ /g, '\\ '),
      parameters[3].replace(/ /g, '\\ ')
    ];

    const dotDot = new DotDot({
      onStart() {
        stdout.write('Decrypting and extracting');
      },
      onTick() {
        stdout.write('.');
      },
      onEnd(isSuccess) {
        stdout.write(`...${ isSuccess ? 'Completed' : 'Failure' }\n`);
      }
    });

    await fs.mkdirp(decryptDirectory);

    verbose && stdout.write(`Executing:\n${command} ${escapedParameters.join(' ')}\n`);

    const childProcess = spawn(command, parameters);

    childProcess.stderr.on('data', (data) => {
      if (verbose || /error/.test(data)) {
        stderr.write(data);
      }
    });

    childProcess.stdout.on('data', (data) => {
      if (verbose) {
        stdout.write(data);
      } else {
        dotDot.tryStart();
      }
    });

    childProcess.on('close', async (code) => {
      const isComplete = code === 0;

      !verbose && await dotDot.end(isComplete);

      if (isComplete) {
        resolve(code);
      } else {
        reject(new Error('Could not decrypt and/or extract'));
      }
    });
  });
}
