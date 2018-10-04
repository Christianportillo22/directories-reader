const isTextFile = require('./is-text-file');
const isFolder = require('./is-folder');
const isCompressedFile = require('./is-compressed-file');
const buildPath = require('./build-path');

function groupFilesByFileType(files, folderPath) {
    const groupedFiles = {
      text: [],
      compressed: [],
      folder: [],
      other: []
    };

    return files.reduce(async (promises, file) => {
      const groupedFilesConfig = await promises;

      const filePath = buildPath(folderPath, file);

      let fileGroup = 'other';
      
      if (isTextFile(filePath)) fileGroup = 'text';
      else if (isCompressedFile(filePath)) fileGroup = 'compressed';
      else if (await isFolder(filePath)) fileGroup = 'folder';
      /* console.log(file, filePath, fileGroup); */
      groupedFilesConfig[fileGroup].push(file);

      return groupedFilesConfig;

    }, Promise.resolve(groupedFiles));
}

module.exports = groupFilesByFileType;