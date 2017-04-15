module.exports = function (req, res) {
    global.db.get('aircrafts').find({},{'limit':20 , sort : { ptype : 1 }  },function(e,docs){
    res.render('aircrafts', {
        title: 'Aircrafs',
        obj: docs
      });
  })
}
