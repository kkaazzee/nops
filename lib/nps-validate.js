const assert = require('assert');
const validUrl = require('valid-url');
const commandExists = require('command-exists');
const stream = require('stream');

function isRequiredString(value, valueName) {
  assert(
    value && typeof value === 'string',
    `"${valueName}" must be a non-empty string: ${value}`
  )
}

function isOptionalString(value, valueName) {
  // When value is a string it must be non-empty. When value is not a string it
  // must be empty.
  if (typeof value === 'string') {
    isRequiredString(value, valueName);
  } else {
    assert.equal(value, null, `"${valueName} should have a null or undefined value.`);
  }
}

function isBoolean(value, valueName) {
  assert(
    typeof value === 'boolean',
    `"${value}" is invalid for "${valueName}"`
  );
}

const assertions = {
  async command(value) {
    try {
      await commandExists(value);
    } catch (error) {
      throw new Error(`"${value}" command does not exist in the system's path`);
    }
  },
  dirty(value) {
    isBoolean(value, 'dirty');
  },
  decryptDirectory(value) {
    isRequiredString(value, 'decryptDirectory');
  },
  downloadDirectory(value) {
    isRequiredString(value, 'downloadDirectory');
  },
  filePath(value) {
    isRequiredString(value, 'filePath');
  },
  license(value) {
    isRequiredString(value, 'license');
  },
  name(value) {
    isOptionalString(value, 'name');
  },
  stderr(value) {
    assert(
      value instanceof stream.Writable,
      '"stderr" should be a writable stream'
    );
  },
  stdout(value) {
    assert(
      value instanceof stream.Writable,
      '"stdout" should be a writable stream'
    );
  },
  titleId(value) {
    isOptionalString(value, 'titleId');
  },
  url(value) {
    isRequiredString(value, 'url');

    assert(validUrl.isUri(value), `"${value}" is not a valid URL`);

    const filename = value.split('/').pop();

    assert(
      /^[\w\d-]+\.pkg$/.test(filename),
      '"url" must end with the package file. Example "file.pkg" in the following URL: https://a.com/file.pkg'
    );
  },
  verbose(value) {
    isBoolean(value, 'verbose');
  }
}

module.exports = async function (options, keys = Object.keys(options)) {
  let i = 0;
  let key;

  while (key = keys[i++]) {
    if (key in assertions) {
      // assertions throw on validation failures.
      await assertions[key](options[key], options);
    } else {
      throw new Error(`Unknown key ${key}`);
    }
  }
}
