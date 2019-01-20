sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
var entity='book';
var title='Buecher';
var link='/library';
var lable=title;
module.exports = function (req, res) {
  global.db.get(entity).find({},{'limit':50 , sort : { _id: 1 }  },function(e,docs){
  for (var i = 0, len = docs.length; i < len; i++) {
        docs[i].v1   = global.available[docs[i].ID]- global.leased[docs[i].ID];
        docs[i].v2   = -global.leased[docs[i].ID];
        docs[i].v3   = global.available[docs[i].ID]

  }

  res.render('library', {
      title: title,
      refresh: false,
      obj: docs
    });
})
}
