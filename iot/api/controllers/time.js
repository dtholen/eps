'use strict';

module.exports = { time:time };

function time(req, res) {
  var d = new Date();
  var ux = d.getTime();
//  var dt = d.toJSON();
  var ok = {'message': 'OK',"uxtime": ux};
  res.json(JSON.stringify(ok));
  console.log(JSON.stringify(ok));
}
