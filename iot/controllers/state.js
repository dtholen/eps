var dateFormat = require('dateformat');
var refresh=false;
module.exports = function (req, res) {
    if (req.query.ID != undefined) {
      query = {'ID': req.query.ID,'value': {$ne : null}};
      refresh = true;
    }
    else query = {'value': {$ne : null}};
    global.db.get('device_status').find(query,{'limit':200 , sort : { ID : 1 }  },function(e,docs){
      var l_ID ="";
      for (var i = 0, len = docs.length; i < len; i++) {
          if ( docs[i].ID == l_ID) {
            docs[i].ID="";
            docs[i].trash=false;
          }
          else {
            l_ID=docs[i].ID;
            docs[i].trash=true;
          }

          docs[i].bg="white";
          docs[i].ti = dateFormat(docs[i].timestamp, "h:MM:ss TT");
          docs[i].gi=global.keyval[docs[i].type];
          docs[i].lable=global.device_lable[docs[i].ID];
          docs[i].bg=global.bg[docs[i].type];
      }
    res.render('status', {
        title: 'Status',
        refresh: refresh,
        obj: docs
      });
  })
}
