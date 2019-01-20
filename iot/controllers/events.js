sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');

module.exports = function (req, res) {
  console.log(req.method);
  console.log(req.body._id);
  if (req.method=="POST" & req.body.action=="d") {
    collection = global.db.get('events');

//    db.events.remove({"_id": ObjectId("59fba41024916179953f7617")})

    collection.remove({"_id": new global.mongo.ObjectID(req.body._id)});
  }
};
