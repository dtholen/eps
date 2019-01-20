module.exports = function (req, res) {
    global.db.get('device_status').find({type:'ACT'},{'limit':20 , sort : { ID : 1 }  },function(e,docs){
    res.render('status', {
        title: 'Actor',
        refresh: true,
        obj: docs
      });
  })
}
