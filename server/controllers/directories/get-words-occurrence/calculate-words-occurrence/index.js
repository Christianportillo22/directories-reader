const {promisify} = require('util');
const fs = require('fs');

const utils = require('./../utils');
const calculateWordOccurrenceFromZipFile = require('./calculate-words-ocurrence-from-zip-file');

const getFolderFiles = promisify(fs.readdir);

async function calculateWordsOccurrence(folderPath) {
  const execute = async () => {
    const files = await getFolderFiles(folderPath);
    const groupedFiles = await utils.groupFilesByType(files, folderPath);

    const textFilesWordsOccurrence = await calculateWOFromTextFiles(groupedFiles.text);
    const zipFilesWordsOccurrence = await calculateWOFromZipFiles(groupedFiles.compressed);
    const subFoldersWordsOccurrence = await calculateWOFromSubFolders(groupedFiles.folder);

    return [
      textFilesWordsOccurrence,
      zipFilesWordsOccurrence,
      subFoldersWordsOccurrence
    ].reduce(utils.accumulate, {});  
  };

  const calculateWOFromTextFiles = (files) => {
    return files.reduce(async (promise, textFile) => {
      const acc = await promise;
      const filePath = utils.buildFilePath(folderPath, textFile);
  
      const fileText = await utils.readTextFile(filePath);
  
      const occurrence = utils.countWordsOccurrence(fileText);
  
      return utils.accumulate(acc, occurrence);
    }, Promise.resolve({}));
  };

  const calculateWOFromZipFiles = async (files) => {
    return files.reduce((acc, compressedFile) => {
      const filePath = utils.buildFilePath(folderPath, compressedFile);
  
      const occurrence = calculateWordOccurrenceFromZipFile(filePath);
  
      return utils.accumulate(acc, occurrence);
    }, {  });
  };

  const calculateWOFromSubFolders = (subFolders) => {
    return subFolders.reduce(async (promise, subFolder) => {
      const acc = await promise;
      const subFolderPath = utils.buildFilePath(folderPath, subFolder);
      const occurrence = await calculateWordsOccurrence(subFolderPath);
  
      return utils.accumulate(acc, occurrence);
    }, Promise.resolve({}));
  };

  return execute();
}

module.exports = calculateWordsOccurrence;