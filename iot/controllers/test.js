sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');

module.exports = function (req, res) {
  var response={id: 'log', msg: 'Das ist ein test'};
  console.log(response);
  res.send(response);
  }
