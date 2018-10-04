const path = require('path');

const SUPPORTED_TEXT_FILE_EXTENSIONS = ['.txt'];

function isTextFile (filePath) {
  const fileExtName = path.extname(filePath);
  return SUPPORTED_TEXT_FILE_EXTENSIONS.includes(fileExtName);
}

module.exports = isTextFile;
