global = require('../config/globals');
module.exports = function (req, res) {
  var uxt = Date.now() / 1000 | 0;
  var collection = global.db.get('ppr');
    collection.findOne({"_id": req.params.text}, function(e,docs){
        collection = global.db.get('aircrafttypes');
        collection.findOne({"ptype": docs.value}, function(e,obj_at) {
            docs.mtow = obj_at.mtow;
            collection=global.db.get('events');
            collection.find({"accountExternalKey": docs.registration, "eventType": {$in : global.evt_billable} }, function(e,events) {
                res.render('service_use', {
                    title: 'Book Service',
                    refresh: true,
                    obj: docs,
                    events: events
                  });
              });

        });
  })
}
