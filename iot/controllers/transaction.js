sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
var form = require('../config/form/transaction');
var dateMath = require('date-arithmetic');
var dateFormat = require('dateformat');

module.exports = function (req, res) {
  var ux = new Date();
  var start;
  var midnight = new Date();
  midnight.setHours(0,0,0,0);
  var day = 86400;
  var hour=60*60;
  collection = global.db.get(form.entity);
  if (req.method=="POST" & req.body.action=="d") {
     collection.remove({"_id": req.body.md_id});
     global.valid=false;
  }

  var today = dateMath.startOf(new Date, 'day');
  var week = dateMath.subtract(today,7, 'day');
  var month = dateMath.subtract(today,30, 'day');
  var year = dateMath.subtract(today,365, 'day');
  var query={timestamp: {$gte: dateMath.startOf(new Date, 'day')} };
//  console.log(dateFormat(today, "dd.mm HH:MM"));
    if (req.query.range)
    {
      switch(req.query.range) {
        case "A":
          query={};
          break;
         case "D":
           query={timestamp: {$gte: dateMath.startOf(new Date, 'day')} };
           break;
         case "W":
           query={timestamp: {$gte: dateMath.subtract(today,7, 'day')} };
           break;
         case "M":
           query={timestamp: {$gte: dateMath.subtract(today,30, 'day')} };
           break;
        case "Y":
           query={timestamp: {$gte: dateMath.subtract(today,365, 'day')} };
           break;
        case "H":
           query={timestamp: {$gte: dateMath.subtract(ux,1, 'hours')} };
           break;
        case "m":
           query={timestamp: {$gte: dateMath.subtract(ux,10, 'minutes')} };
           break;
         }
  }
  console.log(query);
  collection.find(query,{'limit':100 , sort : { timestamp : -1 }  },function(e,docs){
  for (var i = 0, len = docs.length; i < len; i++) {
    docs[i].teacher = global.teacher[docs[i].LID];
    docs[i].book = global.book[docs[i].BID];
    docs[i].transaction = global.trantype[docs[i].TID];
    docs[i].gi = global.keyval[docs[i].TID];
    docs[i].ti = dateFormat(docs[i].timestamp, "dd.mm HH:MM");
//    docs[i].ti = dateFormat(docs[i].timestamp, "h:MM:ss TT");
  }

  res.render(form.entity, {
      refresh: false,
      obj: docs,
      form: form
    });
})
}
