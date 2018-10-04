const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.use(function logErrors(err, req, res, next) {
  console.log(err);
  next(err);
})

const server = app.listen(3000, function () {
  console.log('app running on PORT:', server.address().port);
});