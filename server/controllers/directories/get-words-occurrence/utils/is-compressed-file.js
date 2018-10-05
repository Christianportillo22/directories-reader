const path = require('path');

const SUPPORTED_COMPRESSED_FILE_EXTENSIONS = ['.zip'];

function isCompressedFile (filePath) {
  const fileExtName = path.extname(filePath); 
  return SUPPORTED_COMPRESSED_FILE_EXTENSIONS.includes(fileExtName);
}

module.exports = isCompressedFile;
