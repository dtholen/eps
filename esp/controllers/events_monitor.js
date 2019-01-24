module.exports = function (req, res) {


  if (req.session.nr) req.session.nr = req.session.nr +1
  else req.session.nr = 1;
  console.log('Session: ' + JSON.stringify(req.session));

  var collection = global.db.get('events');
  var query;
  if (req.query.id != undefined)
      if (req.query.type != undefined)
        query = { type : { '$in' : global.evt }, 'ID': req.query.id, 'type': req.query.type};
      else {
        query = { type : { '$in' : global.evt }, 'ID': req.query.id};
      }
  else {
    query = { type : { '$in' : global.evt }};
  }
  collection.find(query,{'limit':100 , sort : { time : -1 }  },function(e,docs){
  for (var i = 0, len = docs.length; i < len; i++) {
	docs[i].bg="white";
  docs[i].nr=i;
  docs[i].seconds=docs[i].time;
  docs[i].minutes=(docs[0].time - docs[i].time)/60;
  docs[i].minutes=Math.round(docs[i].minutes);
  if (docs[i].type == "STATE" ) if (docs[i].value[0] == "0" ) docs[i].bg="yellow"
  else docs[i].bg="lightgrey";
  if (docs[i].type == "TIME" ) docs[i].gi="glyphicon glyphicon-time";
  if (docs[i].type == "ACTOR" ) docs[i].gi="glyphicon glyphicon-wrench";
  if (docs[i].type == "HUM" ) docs[i].gi="glyphicon glyphicon-cloud";
  if (docs[i].type == "TEMP" ) docs[i].gi="glyphicon glyphicon-fire";
  if (docs[i].type == "STATE" ) docs[i].gi="glyphicon glyphicon-off";
  if (docs[i].type == "BARO" ) docs[i].gi="glyphicon glyphicon-scale";
  if (docs[i].type == "BAT" ) docs[i].gi="glyphicon glyphicon-info-sign";
  if (docs[i].type == "VAR" ) docs[i].gi="glyphicon glyphicon-equalizer";

  if (docs[i].type == "CONNECT" ) {
    docs[i].gi="glyphicon glyphicon-link";
    docs[i].bg="lightblue";
    }
  if (docs[i].gi) docs[i].alt=''; else doc[i].alt=doc[i].type
  }
  res.render('events_monitor', {
        title: 'Monitor Events',
        refresh: true,
        obj: docs
      });
  })
}
