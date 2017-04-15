sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
module.exports = function (req, res) {
  var env = global.config.demo;
  console.log(JSON.stringify(env.mqtt.topics[3]));
  console.log(req.query.ON);
  if (req.query.ON==1)
      { console.log("Sensor ON");
        env.mqtt.client.subscribe(env.mqtt.sensor);
      }
  else
      { console.log("Sensor OFF");
        env.mqtt.client.unsubscribe(env.mqtt.sensor);
      }
  res.render('start', {
    title: 'AODB Desk',
    cancel : '/'
  })
};
