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

  return new Promise(async (resolve) => {
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

    await fs.mkdirp(decryptDirectory);

    const childProcess = spawn(command, parameters);

    verbose && stdout.write(`Executing:\n${command} ${escapedParameters.join(' ')}\n`);

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

    if (verbose) {
      childProcess.stdout.on('data', (data) => { stdout.write(data); });
      childProcess.stderr.on('data', (data) => { stderr.write(data); });
    } else {
      childProcess.stdout.on('data', () => {
        // For some mysterious reason the process _will not close_ when
        // processing some packages. In testing processing a 300MB package would
        // not close without this listener. Processing 1MB-80 MB files closes
        // fine. Really odd.
      });
      dotDot.start();
    }

    childProcess.on('close', (code) => {
      const isComplete = code === 0;

      !verbose && dotDot.end(isComplete);

      if (isComplete) {
        resolve(code);
      } else {
        throw new Error('Could not decrypt and/or extract');
      }
    });
  });
}
