sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
var form = require('../config/form/task');

var query;

module.exports = function (req, res) {
  collection = global.db.get(form.entity);
  if (req.method=="POST") {
    console.log(req.body);
    if (!req.body.md_enabled ) req.body.md_enabled = false;
    var newvalues = {ID: req.body.md_ID, LID: req.body.md_LID, text: req.body.md_text, start_date: req.body.md_start_date, duration: req.body.md_duration, parent: req.body.md_parent}
       switch (req.body.action) {
         case 'x':
           collection.insert(newvalues, function(err, res) { if (err) throw err; });
           break;
         case 'u':
           collection.update({"_id": req.body.md_id}, newvalues, function(err, res) { if (err) throw err; });
           console.log(newvalues);
           break;
         case 'e':
             newvalues = { $set: {enabled: req.body.enabled }};
             collection.update({"_id": req.body._id}, newvalues, function(err, res) { if (err) throw err; });
             break;
         case 'd':
           collection.remove({"_id": req.body.md_id}, function(err, res) { if (err) throw err; });
           break;
         default:
           alert( "I don't know such values" );
       }
  }
  query={};

  setTimeout(function() {
    collection.find(query,{'limit':200 , sort : {LID: 1 }  },function(e,docs){
    res.render(form.entity, {
        refresh: false,
        obj: docs,
        form: form
      });
  })

}, 100);




}
