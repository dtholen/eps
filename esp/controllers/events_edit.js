module.exports = function (req, res) {
  var collection = global.db.get('events');
  collection.find({ eventType : { '$in' : global.evt} },{'limit':20 , sort : { timestamp : -1 }  },function(e,docs){
    res.render('events', {
        title: 'Monitor Events',
        refresh: true,
        obj: docs
      });
  })
}
