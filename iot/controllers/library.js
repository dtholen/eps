sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
var entity='book';
var title='Buecher';
var link='/library';
var lable=title;
var query;
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

module.exports = function (req, res) {
  query={};
  if (req.query.SID) query={SID: req.query.SID};
  global.db.get(entity).find(query,{'limit':200 , sort : { _id: 1 }  },function(e,docs){
  for (var i = 0, len = docs.length; i < len; i++) {
        docs[i].v1   = global.available[docs[i].ID]- global.leased[docs[i].ID];
        docs[i].v2   = -global.leased[docs[i].ID];
        docs[i].v3   = global.available[docs[i].ID]
  }
  res.render('library', {
      title: title,
      refresh: false,
      obj: docs,
      sid: global.sid
    });
})

}
