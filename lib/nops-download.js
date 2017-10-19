const { promisify } = require('util');
const fs = require('fs-extra');
const got = require('got');
const filesize = require('filesize');
const remoteFileSize = promisify(require('remote-file-size'));
const nopsValidate = require('./nops-validate');
const DotDot = require('./DotDot');

module.exports = async function (options) {
  await nopsValidate(options, [
    'downloadDirectory',
    'filePath',
    'stdout',
    'url',
    'verbose'
  ]);

  const {
    downloadDirectory,
    filePath,
    stdout,
    url,
    verbose
  } = options;

  const downloadSize = await remoteFileSize(url);
  const friendlyDownloadSize = filesize(downloadSize);
  const fileExists = await fs.exists(filePath);

  let isDownloadNecessary = true;

  verbose && stdout.write(`Downloading ${url}\n`);
  verbose && stdout.write(`To ${filePath}\n`);

  if (fileExists) {
    const fileStat = await fs.stat(filePath);
    const friendlyFileSize = filesize(fileStat.size);

    verbose && stdout.write(`Local file size ${friendlyFileSize}\n`);
    verbose && stdout.write(`Remote file size ${friendlyDownloadSize}\n`);

    if (friendlyFileSize !== friendlyDownloadSize) {
      verbose && stdout.write('Deleting local file with unexpected size\n');
      await fs.remove(filePath);
      verbose && stdout.write('Deleted existing file\n');
    } else {
      verbose && stdout.write('Download is unecessary\n');
      isDownloadNecessary = false;
    }
  }

  const dotDot = new DotDot({
    onStart() {
      stdout.write(`Downloading ${friendlyDownloadSize}`);
    },
    async onTick(isInCadence) {
      let message = '.';

      if (isInCadence && await fs.exists(filePath)) {
        const fileStat = await fs.stat(filePath);
        message = filesize(fileStat.size);
      }

      if (dotDot.isStarted) {
        // The instance may be ended before the `fs` promises resolve.
        stdout.write(message);
      }
    },
    onEnd(isSuccess) {
      stdout.write(`...${ isSuccess ? 'Completed' : 'Failure' }\n`);
    }
  });

  await dotDot.start();

  if (isDownloadNecessary) {
    await fs.mkdirp(downloadDirectory);

    return new Promise((resolve, reject) => {
      const duplexStream = got.stream(url);
      const writeStream = fs.createWriteStream(filePath);

      const onError = async (error) => {
        await dotDot.end(false);
        reject(error);
      };

      // Wait for the `writeStream` to finish. Only listening for the
      // `duplexStream` to end will result in occassional errors due to
      // expected download file size; the last chunks are dropped.
      writeStream.on('finish', async () => {
        const fileStat = await fs.stat(filePath);
        const friendlyDownloadedSize = filesize(fileStat.size);

        if (friendlyDownloadedSize === friendlyDownloadSize) {
          await dotDot.end(true);
          resolve();
        } else {
          const message = `Unexpected download size ${friendlyDownloadedSize}!`;

          await dotDot.end(false);
          stdout.write(`${message}\n`);
          verbose && stdout.write('Deleting incomplete download\n');
          await fs.remove(filePath);

          reject(new Error(message))
        }
      });

      duplexStream.on('error', onError);
      writeStream.on('error', onError);

      duplexStream.pipe(writeStream);
    });
  } else {
    await dotDot.end(true);
  }
};
