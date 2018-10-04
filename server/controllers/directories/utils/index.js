const countWordsOccurrence = require('./count-words-occurrence');
const groupFilesByType = require('./group-files-by-type');
const readTextFile = require('./read-text-file');
const buildPath = require('./build-path');
const isTextFile = require('./is-text-file');
const isCompressedFile = require('./is-compressed-file');

module.exports = {
  buildPath,
  countWordsOccurrence,
  groupFilesByType,
  isCompressedFile,
  isTextFile,
  readTextFile
};