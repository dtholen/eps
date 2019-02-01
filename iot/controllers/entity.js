sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
var crypto = require("crypto");
var form = require('../config/form/entity');
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
  console.log(form.entity+"  method:"+req.method+" action:"+req.body.action);
  collection = global.db.get(form.entity);
  if (req.method=="POST") {
    switch(req.body.action) {
      case 'c':
        console.log("create ("+form.entity+"): "+req.body.ID+": "+req.body.name);
        collection.insert({ID: req.body.ID, name:req.body.name });
        break;
      case 'd':
        collection.remove({"ID": req.body._id});
        global.valid=false;
        console.log("delete "+form.entity);
        break;
      case 'p':
        console.log('copy/past');
        var id = crypto.randomBytes(2).toString('hex');
        collection.insert({ID: id, name:req.body.name });
        console.log("copy "+form.entity+ " " + req.body.ID + " "+ req.body.name);
        break;
      default:
        console.log("default");
      break
    }

  }
  query={};
  if (req.query.SID) query={SID: req.query.SID};
  collection.find(query,{'limit':200 , sort : { ID: 1 }  },function(e,docs){
  res.render(form.entity, {
      title: form.title,
      refresh: false,
      obj: docs,
      link: form.link,
      entity: form.entity,
      fields: form.fields
    });
})
}
