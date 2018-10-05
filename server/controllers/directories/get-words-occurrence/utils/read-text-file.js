const fs = require('fs');
const {promisify} = require('util');

const readFile = promisify(fs.readFile);

function readTextFile(filePath) {
  return readFile(filePath, 'utf8')
    .then(file => file.toString());
}

module.exports = readTextFile;