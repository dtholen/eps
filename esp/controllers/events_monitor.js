module.exports = function (req, res) {
  var collection = global.db.get('events');
  collection.find({ eventType : { '$in' : global.evt } },{'limit':20 , sort : { timestamp : -1 }  },function(e,docs){
  for (var i = 0, len = docs.length; i < len; i++) {
	if (global.evt_billable.indexOf(docs[i].eventType) < 0 )
	  docs[i].bg="white"
	else
	  docs[i].bg="lightgreen";
  }
  res.render('events', {
        title: 'Monitor Events',
        refresh: true,
        obj: docs
      });
  })
}
