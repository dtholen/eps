sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');

module.exports = function (req, res) {
  var src=global.basedir+'/avatar/avatar'+req.query.id+'.svg'
  if(req.query.id){
      res.sendFile(src);
  } else {
      res.status(401).send('Authorization required!');
  }

  }
