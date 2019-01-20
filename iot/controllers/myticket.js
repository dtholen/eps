global = require('../config/globals');

module.exports = function (req, res) {
  var env = global.config.demo
  var collection = global.db.get('ppr');
  var uxt = Date.now() / 1000 | 0;
  collection.findOne({"_id": req.query.ref}, function(e,docs){
    collection=global.db.get('aircrafttypes');
    collection.findOne({"ptype": docs.value}, function(e,obj_at) {
    docs.mtow = obj_at.mtow;
    });
console.log(docs.mtow);
  res.render('myticket', {
          title: 'Pilots - Service',
          obj: docs
  });
}
)}
