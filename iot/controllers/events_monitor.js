var dateFormat = require('dateformat');
module.exports = function (req, res) {


  if (req.session.nr) req.session.nr = req.session.nr +1
  else req.session.nr = 1;
  // console.log('Session: ' + JSON.stringify(req.session));

  var collection = global.db.get('events');
  var query;
  if (req.query.id != undefined)
      if (req.query.type != undefined)
        query = { 'ID': req.query.id, 'type': req.query.type};
      else {
        query = { 'ID': req.query.id};
      }
  else {
    query = {};
  }
  console.log(query);
  collection.find(query,{'limit':500 , sort : { timestamp : -1 }  },function(e,docs){
  for (var i = 0, len = docs.length; i < len; i++) {
    	docs[i].bg="white";
      docs[i].ti = dateFormat(docs[i].timestamp, "h:MM:ss TT");
      if (global.keyval[docs[i].type]) docs[i].gi=global.keyval[docs[i].type];
      else docs[i].gi=global.keyval["default"];
      docs[i].lable=global.device_lable[docs[i].ID];
      docs[i].bg=global.bg[docs[i].type];
      if (docs[i].tag) docs[i].ID=docs[i].ID+"_"+docs[i].tag;
      docs[i].tag=docs[i].ID+"_"+docs[i].tag;
      if (docs[i].gi) docs[i].alt=''; else doc[i].alt=doc[i].type
  }
  res.render('events_monitor', {
        title: 'Monitor Events',
        refresh: true,
        obj: docs
      });
  })
}
