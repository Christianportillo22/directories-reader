const path = require('path');

function buildFilePath(dirname, file) {
  return path.resolve(dirname, file);
}

module.exports = buildFilePath;