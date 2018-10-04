const ROOT_PATH = require('app-root-path');
const ZipFile = require('adm-zip');

const utils = require(`${ROOT_PATH}/server/controllers/directories/utils`);
const accumulate = require('./accumulate');

function calculateWordOccurrenceFromZipFile(filePath) {
  const zip = new ZipFile(filePath);
  const files = zip.getEntries();

	return files.reduce((acc, file) => {
    if (!utils.isTextFile(file.entryName)) 
      return acc;
    
    const fileText = file.getData().toString('utf8');
    const wordsOccurrence = utils.countWordsOccurrence(fileText);

    return accumulate(acc, wordsOccurrence);
  }, {});
}

module.exports = calculateWordOccurrenceFromZipFile;