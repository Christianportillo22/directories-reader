const utils = require('./utils');

async function validatePath(path) {
  const isValidPath = utils.doesPathExist(path) && await utils.isFolder(path);
  
  if (!isValidPath) {
    return Promise.reject('Invalid path');
  }

  return path;
}

module.exports = validatePath;