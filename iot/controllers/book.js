sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
var form = require('../config/form/book');
var entity = 'book';
var title = 'Buecher';
var link = '/config/book';
var lable = title;
var query;
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

module.exports = function (req, res) {
  collection = global.db.get(entity);
  if (req.method=="POST") {
  var newvalues = {name: req.body.md_name, SID: req.body.md_SID, class: req.body.md_class}
     console.log(req.body);
     collection.update({ID: req.body.ID}, newvalues, function(err, res) {
       if (err) throw err;
       console.log("document updated");
     });

  }
  query={};
  if (req.query.SID) query={SID: req.query.SID};
  collection.find(query,{'limit':200 , sort : { _id: 1 }  },function(e,docs){
  res.render('book', {
      title: form.title,
      refresh: false,
      obj: docs,
      link: form.entity,
      sid: global.sid,
      fields: form.fields
    });
})

}
