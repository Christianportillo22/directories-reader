const ROOT_PATH = require('app-root-path');
const directories = require(`${ROOT_PATH}/server/controllers/directories`);

const routes = {
  'GET /directories/words-occurrence': directories.getWordsOccurrence
};

module.exports = routes;