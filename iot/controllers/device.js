sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
module.exports = function (req, res) {
//  console.log(req.method);
//  console.log(req.body.ID);
//  console.log(req.body.action);
  global.db.get('device').find({},{'limit':50 , sort : { _id: 1 }  },function(e,docs){
  if (req.method=="POST" & req.body.action=="d") {
    collection = global.db.get('events');
    collection.remove({"ID": req.body._id});
    }
  res.render('device', {
      title: 'Device',
      refresh: true,
      obj: docs
    });
})
}
