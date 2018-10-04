const fs = require('fs');

function doesPathExist(path) {
  try {
      fs.lstatSync(path);
      return true;
  } catch(e){
   return e.code !== 'ENOENT';
  }
}

module.exports = doesPathExist;