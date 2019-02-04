sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
var form = require('../config/form/book');
var entity = 'book';
var title = 'Buecher';
var link = '/config/book';
var lable = title;
var query;

module.exports = function (req, res) {
  collection = global.db.get(entity);
  if (req.method=="POST") {
    var newvalues = {ID: req.body.md_ID, name: req.body.md_name, SID: req.body.md_SID, value: req.body.md_value, class: req.body.md_class}
       console.log("Values: "+req.body.md_id);
       console.log(newvalues)
       switch (req.body.action) {
         case 'x':
           console.log("copy");
           collection.insert(newvalues, function(err, res) { if (err) throw err; });
           break;
         case 'u':
           console.log("update");
           collection.update({"_id": req.body.md_id}, newvalues, function(err, res) { if (err) throw err; });
           break;
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
  res.render('book', {
      SID: req.query.SID,
      refresh: false,
      obj: docs,
      sid: global.sid,
      form: form
    });
})

}
