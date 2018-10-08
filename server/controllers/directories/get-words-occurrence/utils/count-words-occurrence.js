const isString = require('lodash/isString');
const contractions = require('contractions');


function countWordsOccurrence (text) {
  const isNotEmpty = word => !!word;

  const sanitizedText = contractions.expand((isString(text) ? text : ''))
    .replace(/[\!\?,;]|(?<=[a-zA-Z0-9])[\.-](?![a-zA-Z0-9]+)|(?<![a-zA-Z0-9])[\.-](?=[a-zA-Z0-9]+)|(?<![a-zA-Z0-9])[\.-](?![a-zA-Z0-9]+)/g, ' ')
    .trim()
    .toLowerCase();

  return sanitizedText.split(/\s+/)
    .filter(isNotEmpty)
    .reduce((acc, word) => {
      let wordCounter = acc[word] || 0;

      return {
        ...acc,
        [word]: ++wordCounter,
      };
    }, {});
}

module.exports = countWordsOccurrence;