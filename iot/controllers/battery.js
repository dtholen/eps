var dateFormat = require('dateformat');
module.exports = function (req, res) {
    global.db.get('device_status').find({type:'BAT'},{'limit':20 , sort : { ID : 1 }  },function(e,docs){

    for (var i = 0, len = docs.length; i < len; i++) {
          docs[i].ti = dateFormat(docs[i].timestamp, "h:MM:ss TT");
          docs[i].lable=global.device_lable[docs[i].ID];
    }
    res.render('status', {
        title: 'Status',
        refresh: true,
        obj: docs
      });
  })
}
