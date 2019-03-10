sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
var form = require('../config/form/teacher');
var dateFormat = require('dateformat');
var query;

module.exports = function (req, res) {
  collection = global.db.get(form.entity);
  if (req.method=="POST") {
    var newvalues = {ID: req.body.md_ID, name: req.body.md_name, surname: req.body.md_surname, timestamp: new Date(), enable: true, avatar: '1' }
       console.log("Values: "+req.body.md_id);
       console.log(newvalues)
       console.log(req.body);
       switch (req.body.action) {
         case 'x':
           collection.insert(newvalues, function(err, res) { if (err) throw err; });
           break;
         case 'u':
           newvalues = { $set: {name: req.body.md_name, surname: req.body.md_surname, timestamp: new Date(), avatar :req.body.md_avatar  }};
           collection.update({"_id": req.body.md_id}, newvalues, function(err, res) { if (err) throw err; });
           break;
         case 'd':
           collection.remove({"_id": req.body.md_id}, function(err, res) { if (err) throw err; });
           break;
         case 'e':
           newvalues = { $set: {enabled: req.body.enabled,timestamp: new Date() }};
           collection.update({"_id": req.body._id}, newvalues, function(err, res) { if (err) throw err; });
           console.log("update enabled");
           break;
         case 'g':
           newvalues = { $set: {avatar: req.body.value, timestamp: new Date() }};
           console.log("update image");
           collection.update({"_id": req.body._id}, newvalues, function(err, res) { if (err) throw err; });
           break;
         default:
           alert( "I don't know such values" );
       }
  }
  query={};
  collection.find(query,{'limit':200 , sort : { _id: 1 }  },function(e,docs){
  for (var i = 0, len = docs.length; i < len; i++) {
      if (docs[i].enabled=='true') docs[i].checked='checked'; else docs[i].checked = 'unchecked';
     docs[i].ti = dateFormat(docs[i].timestamp, "dd.mm HH:MM");
     if (!docs[i].avatar) docs[i].avatar = 1;
  }
  res.render(form.entity, {
      refresh: false,
      obj: docs,
      form: form
    });
})

}
