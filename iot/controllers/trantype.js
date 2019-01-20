sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
var view='class';
var entity='trantype';
var title='Vorgänge';
var link='/config/trantype';
var lable=title;
module.exports = function (req, res) {
  collection = global.db.get(entity);
  if (req.method=="POST" & req.body.action=="d") {
      collection.remove({"_id": req.body._id});
  }
  collection.find({},{'limit':50 , sort : { _id: 1 }  },function(e,docs){
  res.render(view, {
      title: title,
      link: link,
      lable: lable,
      refresh: false,
      obj: docs
    });
})
}
