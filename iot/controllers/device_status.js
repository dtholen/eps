sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');

module.exports = function (req, res) {
  console.log(req.method);
  console.log(req.body._id);
  if (req.method=="POST" & req.body.action=="d") {
    collection = global.db.get('device_status');
    collection.remove({"ID": req.body._id});
  }
};
