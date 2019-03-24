sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
var form = require('../config/form/transaction');
var dateMath = require('date-arithmetic');
var dateFormat = require('dateformat');

module.exports = function (req, res) {

  collection = global.db.get(form.entity);
  if (req.method=="POST") {
    console.log(req.body);
      var newvalues = {nr:req.body.md_nr, ID: req.body.md_ID, name: req.body.md_name, link: req.body.md_link, attr: req.body.md_attr, enabled: req.body.md_enabled }
       switch (req.body.action) {
         case 'x':
           collection.insert(newvalues, function(err, res) { if (err) throw err; });
           break;
         case 'u':
           console.log("Update?")
           console.log(req.body);
           newvalues = { $set: {LID: req.body.md_LID, BID: req.body.md_BID, value: req.body.md_value, CID: req.body.md_CID,timestamp: new Date() }};
           collection.update({"_id": req.body.md_id}, newvalues, function(err, res) { if (err) throw err; });
           break;
         case 'e':
             newvalues = { $set: {enabled: req.body.enabled }};
             collection.update({"_id": req.body._id}, newvalues, function(err, res) { if (err) throw err; });
             break;
         case 'd':
           console.log("Delete?");
           collection.remove({"_id": req.body.md_id}, function(err, res) { if (err) throw err; });
           global.valid=false;
           break;
         default:
           alert( "I don't know such values" );
       }
  }

  var today = dateMath.startOf(new Date, 'day');
  var week = dateMath.subtract(today,7, 'day');
  var month = dateMath.subtract(today,30, 'day');
  var year = dateMath.subtract(today,365, 'day');
  var hour = dateMath.subtract(Date.now(),1, 'hours');
  var minute = dateMath.subtract(new Date,10, 'minutes');
  var query={timestamp: {$gte: dateMath.startOf(new Date, 'day')} };
  if (!req.query.range && req.session.range)  req.query.range=req.session.range;
    if (req.query.range)
    {
      req.session.range = req.query.range
      switch(req.query.range) {
        case "A":
          query={};
          break;
         case "D":
           query={timestamp: {$gte: today} };
           break;
         case "W":
           query={timestamp: {$gte: week} };
           break;
         case "M":
           query={timestamp: {$gte: month} };
           break;
        case "Y":
           query={timestamp: {$gte: year} };
           break;
        case "H":
           query={timestamp: {$gte: hour} };
           break;
        case "m":
           query={timestamp: {$gte: minute} };
           break;
         }
  }
  console.log(query);
  collection.find(query,{'limit':200 , sort : { timestamp : -1 }  },function(e,docs){
  for (var i = 0, len = docs.length; i < len; i++) {
    docs[i].teacher = global.tt[docs[i].LID].ID;
    docs[i].book = global.book[docs[i].BID];
    docs[i].transaction = global.tx[docs[i].TID].name;
    docs[i].gi = global.tx[docs[i].TID].icon;
    docs[i].ti = dateFormat(docs[i].timestamp, "dd.mm HH:MM");
    if (docs[i].enabled=='true') docs[i].checked='checked'; else docs[i].checked = 'unchecked';
  }

  res.render(form.entity, {
      refresh: false,
      obj: docs,
      cnt: docs.length,
      form: form
    });
})
}
