module.exports = function (req, res) {
  var collection = global.db.get('ppr');
    collection.find({},{'limit':20 , sort : { timestamp : -1 }  },function(e,docs){
    res.render('expected_ppr', {
        title: 'Expected PPR Flights',
        refresh: false,
        obj: docs
      });
  })
}
