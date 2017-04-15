module.exports = function (req, res) {
  var collection = global.db.get('aircrafttypes');
    collection.find({},{'limit':20 , sort : { ptype : 1 }  },function(e,docs){
    res.render('aircrafttypes', {
        title: 'Aircraft Types',
        obj: docs
      });
  })
}
