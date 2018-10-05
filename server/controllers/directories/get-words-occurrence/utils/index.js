const accumulate = require('./accumulate');
const buildFilePath = require('./build-file-path');
const countWordsOccurrence = require('./count-words-occurrence');
const doesPathExist = require('./does-path-exist');
const groupFilesByType = require('./group-files-by-type');
const isCompressedFile = require('./is-compressed-file');
const isFolder = require('./is-folder');
const isTextFile = require('./is-text-file');
const readTextFile = require('./read-text-file');

module.exports = {
  accumulate,
  buildFilePath,
  countWordsOccurrence,
  doesPathExist,
  groupFilesByType,
  isCompressedFile,
  isFolder,
  isTextFile,
  readTextFile
};