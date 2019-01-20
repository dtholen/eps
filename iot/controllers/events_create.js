sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');

module.exports = function (req, res) {
  var env = global.config.demo
  if (req.method=="POST" && req.is('json')) {
    var d = new Date();
    var uxt = d/1000 | 0;
    // check duplicates * some browsers send 2 after $ajax call a second event which must be ignored
    var gt = uxt - 125; // ignore message if same event comes in the last 125 seconds.
    var collection = global.db.get('events');
    var cursor = collection.find({"timestamp": { $gt: gt }, "accountExternalKey": req.body.registration, "eventType": req.body.etype },{ "limit": 1 },function(err, doc) {
        if (doc.length==0) {
//          console.log('OK');
            switch(req.body.etype) {
            case 'HCO':
                  global.db.get('events').find({"accountExternalKey": req.body.registration, "eventType": 'HCI' },{ "limit": 1 },function(err, doc_hci) {
                        var uxt = d/1000 | 0;
                        var duration=uxt-doc_hci[0].timestamp;
                        console.log(duration);
                        var data = {"value": doc_hci.value, "amount": duration};
                        var con = {"id": "0000", "tenantID":"MUC", "accountExternalKey": req.body.registration, "eventType" : "HAN" , "timestamp": uxt,  "data": data};
                        env.mqtt.client.publish(env.mqtt.topics[1],JSON.stringify(con));
                });
            case 'HCI':
            case 'TOD':
            case 'LDG':
                 var data = {"value": req.body.ptype, "amount": 1};
                 break;
            case 'FUE':
               var data = {"value": req.body.ftype, "amount": req.body.amount};
               break;
            case 'PAR':
               var data = {"value": req.body.duration, "amount": req.body.amount};
               break;
            case 'SER':
               var data = {"value": req.body.value, "amount": req.body.amount};
               break;
            default:
               var data = {};
            }

            var con = {"id": "0000", "tenantID":"MUC", "accountExternalKey": req.body.registration, "eventType" : req.body.etype , "timestamp": uxt,  "data": data};
//            console.log(JSON.stringify(con));
            env.mqtt.client.publish(env.mqtt.topics[1],JSON.stringify(con));
          }
    });


    }
  else {
    res.render('CreateEvent', {
        title: 'AODB Desk',
        cancel : '/'
      })

}
};
