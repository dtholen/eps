sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');

module.exports = function (req, res) {
  var response={id: 'log', name: 'Buch', value:'20'};
  collection = global.db.get('transaction');
  var query;
  if (req.query.TID) query = {"LID": req.query.LID, "TID": req.query.TID, enabled: req.query.enabled };
  else {
    query = {"LID": req.query.LID}
  }
//  console.log(query);
  collection.find(query,{'limit':100 , sort : { timestamp : -1 }  },function(e,docs){
  for (var i = 0, len = docs.length; i < len; i++) {
//    console.log(docs[i]);
  }
  response=docs;
  res.send(response);
})

}
