const isPlainObject = require('lodash/isPlainObject');

function accumulate(dest, src) {
  const destObject = isPlainObject(dest) ? dest : {};
  const srcObject = isPlainObject(src) ? src : {}
  
  return Object.keys(srcObject).reduce((acc, key) => {
    const keyValue = srcObject[key];
    const destValue = acc[key] || 0;

    return {
      ...acc,
      [key]: destValue + keyValue
    };
  }, { ...destObject });
}

module.exports = accumulate