sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
var form = require('../config/form/task');

var query;

module.exports = function (req, res) {
  collection = global.db.get(form.entity);
  console.log(req.method)
  console.log(req.body);
  if (req.method=="PUT") {
    if (req.body.progress) {
      newvalues = { $set: {progress: Math.round(req.body.progress*100)/100}};
      collection.update({"ID": req.body.ID}, newvalues, function(err, res) { if (err) throw err; });
      }
    }
  if (req.method=="DELETE") {
     collection = global.db.get('link');
     collection.remove({"_id": req.params.id}, function(err, res) { if (err) throw err; });
     console.log(req.params.id);
  }
  if (req.method=="POST") {
    if (req.body.type) {
        collection = global.db.get('link');
        switch (req.body.type) {
          case '3':
          case '2':
          case '1':
          case '0':
              console.log('Insert');
              collection.insert(req.body, function(err, res) { if (err) throw err; });
              break;
            }
      }
    else {
    if (!req.body.md_enabled ) req.body.md_enabled = false;
    var newvalues = {ID: req.body.md_ID, LID: req.body.md_LID, text: req.body.md_text, start_date: req.body.md_start_date, duration: req.body.md_duration, parent: req.body.md_parent, link: req.body.md_link, progress: req.body.md_progress}
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
           console.log( "I don't know such values" );
       }
  }
}
  query={};

  setTimeout(function() {
    collection.find(query,{'limit':200 , sort : {LID: 1 }  },function(e,docs){
    c2 = global.db.get('link');
    c2.find(query,{'limit':200 , sort : {LID: 1 }  },function(e,link){
    res.render(form.entity, {
        refresh: false,
        obj: docs,
        link: link,
        form: form
      });
  })
    })
}, 100);




}
