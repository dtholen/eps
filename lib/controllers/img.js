sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');

module.exports = function (req, res) {

  if(true){
      res.sendFile('/root/iot/avatar/avatar1.svg');
  } else {
      res.status(401).send('Authorization required!');
  }

  }
