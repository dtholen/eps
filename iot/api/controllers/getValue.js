'use strict';

module.exports = { getValue:getValue };

function getValue(req, res) {
  var d = new Date();
  var ux = d.getTime();
  var E = global._events;
  var obj=global._events.findOne({ type : { '$in' : ['time', 'temp','baro','humidity'] } })
  var ok = {'message': 'OK',"uxtime": ux};
  res.json(JSON.stringify(obj));
  console.log(ok);
  console.log(obj);
}
