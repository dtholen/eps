sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
var form = require('../config/form/entry');

var query;

module.exports = function (req, res) {
  collection = global.db.get(form.entity);
  if (req.method=="POST") {
    console.log(req.body);
    var newvalues = {nr:req.body.md_nr, ID: req.body.md_ID, name: req.body.md_name, link: req.body.md_link, attr: req.body.md_attr}
       console.log("Values: "+req.body.md_id);
       console.log(newvalues)
       switch (req.body.action) {
         case 'x':
           collection.insert(newvalues, function(err, res) { if (err) throw err; });
           break;
         case 'u':
           collection.update({"_id": req.body.md_id}, newvalues, function(err, res) { if (err) throw err; });
           break;
         case 'd':
           collection.remove({"_id": req.body.md_id}, function(err, res) { if (err) throw err; });
           break;
         default:
           alert( "I don't know such values" );
       }
  }
  query={};
  collection.find(query,{'limit':200 , sort : {nr: 1 }  },function(e,docs){
  res.render(form.entity, {
      refresh: false,
      obj: docs,
      form: form
    });
})

}
