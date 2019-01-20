module.exports = function (req, res) {
  var collection = global.db.get('ppr');
  // replace this if you have user&session managment. That's just for demo
    if (!req.query.uid) req.query.uid='dieter.tholen@web.de';
    collection.find({'email': req.query.uid },{'limit':20 , sort : { timestamp : -1 }  },function(e,docs){
    res.render('myflights', {
        title: 'My Flights',
        refresh: true,
        uid: req.query.uid,
        obj: docs,
        ok: '/pilots/home',
      });
  })
}
