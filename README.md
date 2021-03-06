`nops` is a an interactive command line based front end for the excellent [PkgDecrypt](https://github.com/weaknespase/PkgDecrypt/).

## Installation

1. Install the [PkgDecrypt](https://github.com/weaknespase/PkgDecrypt/) application globally. The `pkc_dec` executable _must_ be found on your system's `$PATH`.
2. Node.js version greater than 8.6.0 is required.
3. After Node.js is installed, use npm to install `nops`:

```
$ npm install -g nops
```

## Usage

```
$ nops --help

  Usage: nops [options]

  Options:

    -V, --version  output the version number
    -d, --dirty    disable deletion of downloaded PKG after successful decryption and extraction
    -v, --verbose  enable verbose output to stdout and stderr
    -h, --help     output usage information
```

* From a Terminal window change directory to a volume with sufficient free space.
* Type `nops` and follow the interactive prompts. If you mess up hit Ctrl-C to quit and try again. The application accepts your input and automates download and interaction with PkgDecrpt.
* Downloaded and decrypted files will be stored in the directory from which `nops` was run.

## Upgrading

* From a terminal window use a JavaScript package manager to upgrade the application. For example, using npm:

```
$ npm upgrade nops -g
```

## Removal

* From a terminal window use a JavaScript package manager to remove the application. For example, using npm:

```
$ npm uninstall nops -g
```

## Found a bug?

* Re-run `nops` with the `--verbose` flag.
* Examine the output closely. If the error occurs during extraction and decryption please try to reproduce the error by running the full `pkg_dec ...` command on its own.
  * If the error is reproducible then please visit the [PkgDecrypt](https://github.com/weaknespase/PkgDecrypt/) repo.
  * If the error is _not_ reproducible please file an issue in this repo. Understand that this is free software and YMMV.

## I'm still having trouble?

* Did `nops` and PkgDecrypt complete without an issue but you're still having trouble? If so please start with visiting relevant subreddits or Discord chats. This application is simply a front-end.

## Changelog

### 1.1.0

* Remove Title ID and Name prompts. They may be brought back in a future version if there proves to be a need for them.
* Fix race condition in downloading component which could lead to incomplete downloads. Incomplete downloads were never processed but the this prevents unpredictable errors.
* Fix race condition in DotDot usage by the download task which could result in a download tick leaving file size text in the processing line.
* The processing task logging was cleaned up. The task will now always output error messages from pkg_dec.
* Replace commander with yargs for better CLI parameterization.

### 1.0.1

* Corrected incorrect URL and download directory resolution when requiring `nops`from another module.
* Switch to the Unlicense.

### 1.0.0

* Initial Release

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Thanks!

* Most of all, thank you to the PkgDecrypt authors for your work and help!

dlc note about 31 max
