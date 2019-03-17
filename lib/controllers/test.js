  sprintf = require("sprintf-js").sprintf;
  global = require('../config/globals');
  var form = require('../config/form/trantype');

  var query;

  module.exports = function (req, res) {
    var response={id: 'log', msg: 'Das ist ein test'};
    console.log(response);
    collection = global.db.get(form.entity);
    query={};
    collection.find(query,{'limit':200 , sort : { _id: 1 }  },function(e,docs){
    res.render(form.entity, {
        refresh: false,
        obj: docs,
        form: form
      });
  })

  }
