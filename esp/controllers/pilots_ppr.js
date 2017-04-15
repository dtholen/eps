sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');

module.exports = function (req, res) {
  var env = global.config.demo

  if (req.method=="POST" ) {
	    var d = new Date();
	    var uxt = d/1000 | 0;
	    var con = {"id": "0000", "tenantID":"MUC", "accountExternalKey": req.body.registration,  "eventType" : "PPR" , "timestamp": uxt,
	    "data":
          { "ptype": req.body.ptype,
            "name": req.body.name,
    	      "email": req.body.email,
            "ptype": req.body.ptype,
            "eta": req.body.eta,
            "eda": req.body.eda,
            "value": req.body.ptype,
    	      "passenger": req.body.passenger,
            "address": req.body.address
          }
      };
      console.log(JSON.stringify(con));
	    env.mqtt.client.publish(env.mqtt.topics[1],JSON.stringify(con));
	    res.redirect('/pilots/home');
	    return true;
	}

  else {
  res.render('pilots_ppr', {
    title: 'My Flight',
    cancel : '/pilots/home'
  })
}
};
