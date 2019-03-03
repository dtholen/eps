sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');

module.exports = function (req, res) {
  var response={id: 'log', value:req.query.id, msg: req.query.msg};
  console.log(response);
  res.send(response);
  }
