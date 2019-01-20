var dateFormat = require('dateformat');
module.exports = function (req, res) {
    global.db.get('device_status').find({type:'TEMP'},{'limit':20 , sort : { ID : 1 }  },function(e,docs){

      for (var i = 0, len = docs.length; i < len; i++) {
          docs[i].ti = dateFormat(docs[i].timestamp, "h:MM:ss TT");
          docs[i].room=global.device_lable[docs[i].ID];
      }

    res.render('status', {
        title: 'Temperatur',
        refresh: true,
        obj: docs
      });
  })
}
