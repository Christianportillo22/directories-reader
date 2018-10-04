const {promisify} = require('util');
const fs = require('fs');

const getFileStat = promisify(fs.stat);

async function isFolder(filePath) {
  const fileStat = await getFileStat(filePath);

  return fileStat.isDirectory();
}

module.exports = isFolder;