const ZipFile = require('adm-zip');

const utils = require('./../utils');

function calculateWordOccurrenceFromZipFile(filePath) {
  const zip = new ZipFile(filePath);
  const files = zip.getEntries();

	return files.reduce((acc, file) => {
    if (!utils.isTextFile(file.entryName)) 
      return acc;
    
    const fileText = file.getData().toString('utf8');
    const wordsOccurrence = utils.countWordsOccurrence(fileText);

    return utils.accumulate(acc, wordsOccurrence);
  }, {});
}

module.exports = calculateWordOccurrenceFromZipFile;