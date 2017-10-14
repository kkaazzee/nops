const fs = require('fs-extra');

module.exports = async function deleteIfExists(path) {
  if (await fs.exists(path)) {
    await fs.remove(path);
  }
}
