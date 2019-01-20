module.exports = function (req, res) {
    global.db.get('device_status').find({type:'BARO'},{'limit':20 , sort : { ID : 1 }  },function(e,docs){
    res.render('status', {
        title: 'Luftdruck',
        refresh: true,
        obj: docs
      });
  })
}
