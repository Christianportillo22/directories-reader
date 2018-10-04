const path = require('path');

function buildPath (dirname, file) {
  return path.resolve(dirname, file);
}

module.exports = buildPath;