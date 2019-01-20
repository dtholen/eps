sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');

module.exports = function (req, res) {
  var env = global.config.demo
  if (req.method=="POST" && req.is('json')) {
    var d = new Date();
    var uxt = d/1000 | 0;
    // check duplicates * some browsers send 2 after $ajax call a second event which must be ignored
    var gt = uxt - 125; // ignore message if same event comes in the last 125 seconds.
    switch(req.body.type) {
      case 'switch':
      case 'a':
      case 'b':
           var con = { "type" : req.body.type ,"ID": req.body.id, "value": req.body.value, "offset": 0};
           break;
      default:
         var data = {};
      }
      var topic = "actor/"+req.body.id;
      env.mqtt.client.publish(topic,JSON.stringify(con));
      }
  else {
    res.render('CreateEvent', {
        title: 'AODB Desk',
        cancel : '/'
      })

}
};
