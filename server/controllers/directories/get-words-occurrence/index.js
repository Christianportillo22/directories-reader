const validatePath = require('./validate-path');
const calculateWordsOccurrence = require('./calculate-words-occurrence');

function getWordsOccurrence(req, res) {
  const path = req.query.path;

  validatePath(path)
    .then(calculateWordsOccurrence)
    .then((wordsOccurrence) => {
      res.status(200).jsonp({ data: wordsOccurrence });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
}

module.exports = getWordsOccurrence;
