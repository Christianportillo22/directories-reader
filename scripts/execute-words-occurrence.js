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
  .then(function makeCallToAPI (path) {
    if (path === undefined) return;
    const uri = `${API_URL}${ENDPOINT}?path=${path}`;

    return makeRequest({ uri, json : true });
  })
  .then(({data}) => {
    const histogram = buildHistogram(data, { width: 50, sort: true });
    console.log(histogram);
  })
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
