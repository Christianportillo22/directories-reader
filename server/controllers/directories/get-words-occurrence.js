const {promisify} = require('util');
const fs = require('fs');
const isPlainObject = require('lodash/isPlainObject');
const ZipFile = require('adm-zip');

const utils = require('./utils');

const getFolderFiles = promisify(fs.readdir);

function getWordsOccurrence(req, res) {
  const path = req.query.path;

  if (!path) throw new Error('param "path" is required');

  calculateWordsOccurrence(path)
    .then((wordsOccurrence) => {
      res.status(200).jsonp({ data: wordsOccurrence });
    })
    .catch((error) => {
      res.status(500).jsonp({ error: error.stack });
    });
}

async function calculateWordsOccurrence(folderPath) {
  const files = await getFolderFiles(folderPath);
  const groupedFiles = await utils.groupFilesByType(files, folderPath);

  let wordsOccurrence = await groupedFiles.text.reduce(async (promise, textFile) => {
    const acc = await promise;
    const filePath = utils.buildPath(folderPath, textFile);

    const fileText = await utils.readTextFile(filePath);

    const occurrence = utils.countWordsOccurrence(fileText);

    return accumulate(acc, occurrence);
  }, Promise.resolve({}));

  wordsOccurrence = groupedFiles.compressed.reduce((acc, compressedFile) => {
    const filePath = utils.buildPath(folderPath, compressedFile);

    const occurrence = calculateWordOccurrenceFromCompressedFile(filePath);

    return accumulate(acc, occurrence);
  }, { ...wordsOccurrence });

  wordsOccurrence = await groupedFiles.folder.reduce(async(promise, subFolder) => {
    const acc = await promise;
    const subFolderPath = utils.buildPath(folderPath, subFolder);
    const occurrence = await calculateWordsOccurrence(subFolderPath);

    return accumulate(acc, occurrence);
  }, Promise.resolve({ ...wordsOccurrence }));

  return wordsOccurrence;  
}

function calculateWordOccurrenceFromCompressedFile(filePath) {
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
  }, {...destObject});
}


module.exports = getWordsOccurrence;
