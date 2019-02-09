sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
var form = require('../config/form/home');

var query;

module.exports = function (req, res) {
  console.log("Hallo");
  collection = global.db.get(form.entity);
  query={};
  collection.find(query,{'limit':200 , sort : { nr: 1 }  },function(e,docs){
  res.render(form.view, {
      refresh: false,
      obj: docs,
      form: form
    });
})

}
