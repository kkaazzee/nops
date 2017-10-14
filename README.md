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

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHOR(S) BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

## Thanks!

* Most of all, thank you to the PkgDecrypt authors for your work and help!
