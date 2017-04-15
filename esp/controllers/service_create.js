global = require('../config/globals');
module.exports = function (req, res) {
  var uxt = Date.now() / 1000 | 0;
  var collection = global.db.get('ppr');
  console.log(req.query.ref);
  collection.findOne({"_id": req.query.ref}, function(e,docs){
        collection = global.db.get('aircrafttypes');
        collection.findOne({"ptype": docs.value}, function(e,obj_at) {
            docs.mtow = obj_at.mtow;
            collection=global.db.get('events');
            collection.find({"accountExternalKey": docs.registration, "eventType": {$in : global.evt_billable} }, function(e,events) {
//                console.log(JSON.stringify(events));
                res.render('service_create', {
                    title: 'Services',
                    refresh: true,
                    obj: docs,
                    events: events

                  });
              });

        });
  })
}
