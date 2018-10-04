const prompts = require('prompts');
const makeRequest = require('request-promise-native');
const buildHistogram = require('ascii-histogram');

const API_URL = 'http://localhost:3000';
const ENDPOINT = '/directories/words-occurrence';

const promptOptions = {};

const promptConfig = [{
  type: 'text',
  name: 'path',
  isValid: (val) => !!val,
  message: 'Write the path to be analyzed:'
}];

const getParamQuestions = (questionsConfig) => {
 return questionsConfig.map((config) => ({ ...config }));
};

async function getPath () {
  const {path} = await prompts(getParamQuestions(promptConfig), promptOptions);

  if (!!path || path === undefined) return path;

  console.log(`Path (${path}) is invalid`)

  return getPath();
};


getPath()
  .then(function makeCallToAPI (dirPath) {
    if (dirPath === undefined) return;
    const uri = `${API_URL}${ENDPOINT}`;
    const qs = { path: dirPath };

    return makeRequest({ uri, qs, json : true });
  })
  .then(({data}) => {
    const histogram = buildHistogram(data, { width: 50, sort: true });
    console.log(histogram);
  })
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error.message || error.stack || error);
    process.exit(1);
  });
