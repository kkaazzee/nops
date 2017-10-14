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

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Thanks!

* Most of all, thank you to the PkgDecrypt authors for your work and help!
