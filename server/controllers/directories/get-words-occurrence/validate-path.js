const ROOT_PATH = require('app-root-path');
const utils = require('./utils');

async function validatePath(absolutePath) {
  const projectDirname = ROOT_PATH.path;
  const relativePath = utils.buildFilePath(projectDirname, `./${absolutePath}`);
  const isValidAbsolutePath = utils.doesPathExist(absolutePath) && await utils.isFolder(absolutePath);
  const isValidRelativePath = utils.doesPathExist(relativePath) && await utils.isFolder(relativePath);

  if (isValidAbsolutePath) return absolutePath;
  if (isValidRelativePath) return relativePath;
  
  return Promise.reject('Invalid path');
}

module.exports = validatePath;