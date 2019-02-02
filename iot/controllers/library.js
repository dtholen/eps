sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
var form = require('../config/form/library');

var query;

module.exports = function (req, res) {
  collection = global.db.get(form.entity);
  if (req.method=="POST") {
    var newvalues = {ID: req.body.md_ID, name: req.body.md_name, SID: req.body.md_SID, class: req.body.md_class}
       console.log("Values: "+req.body.md_id);
       console.log(newvalues)
       switch (req.body.action) {
         case 'd':
           console.log("delete");
           collection.remove({"_id": req.body.md_id}, function(err, res) { if (err) throw err; });
           break;
         default:
           alert( "I don't know such values" );
       }
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
      refresh: false,
      obj: docs,
      sid: global.sid,
      form: form
    });
})

}
