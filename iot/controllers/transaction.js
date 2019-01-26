sprintf = require("sprintf-js").sprintf;
var dateFormat = require('dateformat');
global = require('../config/globals');
var entity='transaction';
var title='Vorgänge';
var link='/transaction';
var lable=title;
module.exports = function (req, res) {
  collection = global.db.get(entity);
  if (req.method=="POST" & req.body.action=="d") {
     collection.remove({"ID": req.body._id});
     global.valid=false;
  }

  global.config.showTransaction(entity,req.body.action,req.body._id);
  collection.find({},{'limit':100 , sort : { timestamp : -1 }  },function(e,docs){
  for (var i = 0, len = docs.length; i < len; i++) {
      docs[i].teacher = global.teacher[docs[i].LID];
      docs[i].book = global.book[docs[i].BID];
      docs[i].transaction = global.trantype[docs[i].TID];
      docs[i].gi=global.keyval[docs[i].TID];
      docs[i].ti = dateFormat(docs[i].timestamp, "h:MM:ss TT");
  }

  res.render(entity, {
      title: title,
      link: link,
      refresh: true,
      obj: docs
    });
})
}
