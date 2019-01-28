sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
var entity='book';
var title='Buecher';
var link='/library';
var lable=title;
var query;

module.exports = function (req, res) {
  collection = global.db.get(entity);
  if (req.method=="POST") {
     collection.remove({"ID": req.body._id});
     global.valid=false;
  }
  query={};
  if (req.query.SID) query={SID: req.query.SID};
  collection.find(query,{'limit':200 , sort : { _id: 1 }  },function(e,docs){
  for (var i = 0, len = docs.length; i < len; i++) {
        docs[i].v1   = global.available[docs[i].ID]- global.leased[docs[i].ID];
        docs[i].v2   = -global.leased[docs[i].ID];
        docs[i].v3   = global.available[docs[i].ID]
  }
  res.render('library', {
      title: title,
      refresh: false,
      obj: docs,
      link: link,
      sid: global.sid
    });
})

}
