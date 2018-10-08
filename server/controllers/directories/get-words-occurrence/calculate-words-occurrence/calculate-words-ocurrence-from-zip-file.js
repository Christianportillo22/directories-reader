const ZipFile = require('adm-zip');

const utils = require('./../utils');

function calculateWordOccurrenceFromZipFile(filePath, zipFile) {
  const zip = zipFile ? zipFile : new ZipFile(filePath);
  const files = zip.getEntries();

	return files.reduce((acc, file) => {
    if (utils.isCompressedFile(file.entryName)) {
      const nestedZipFile = new ZipFile(file.getCompressedData());
      const nestedZipFilePath = utils.buildFilePath(filePath, file.entryName);

      const occurrence = calculateWordOccurrenceFromZipFile(nestedZipFilePath, nestedZipFile);

      return utils.accumulate(acc, occurrence);
    }

    if (!utils.isTextFile(file.entryName)) 
      return acc;
    
    const fileText = file.getData().toString('utf8');
    const wordsOccurrence = utils.countWordsOccurrence(fileText);

    return utils.accumulate(acc, wordsOccurrence);
  }, {});
}

module.exports = calculateWordOccurrenceFromZipFile;