sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
var form = require('../config/form/export');
var query;

function exportTable(name) {
     var fs = require('fs');
     var file ="config/backup/export/"+name+".json";
     console.log("Export("+name+")--> "+file);
     global.db.get(name).find({},{},function(e,docs){
     var re = /}/gi;
     fs.writeFile(file,JSON.stringify(docs).replace(re,'}\n'), function(err) {
     if(err) {
         return console.log(err);
     }
     });

      })
    }

function importTable(name) {
         var fs = require('fs');
         var file ="config/backup/export/"+name+".json";
         var collection = global.db.get(name);
         console.log("Imort("+name+")--> "+file);
         collection.drop()
         console.log("Collection "+name+" droped");
         fs.readFileSync(file, 'utf-8').split(/\r?\n/).forEach(function(line){
         if (line.length >5) {
               var res = line.substring(1,line.length);
               console.log("Line:"+res);
               var obj = JSON.parse(res);
               var d = new Date();
               var uxt = d/1000 | 0;
               collection.insert(obj, function(err, res) {
               if (err) throw err;
             });
             }
           })
         };

module.exports = function (req, res) {
  var fs = require('fs');
  console.log(form.entity+"  method:"+req.method+" action:"+req.body.action);
  collection = global.db.get(form.entity);


  if (req.method=="POST") {
    switch(req.body.action) {
      case 'E':
        exportTable(req.body.name);
        break;
      case 'I':
        importTable(req.body.name);

        break;
      default:
        console.log("default");
      break
    }
  }
  else {
    if (req.query.mode == 'A') {
     console.log("Export All");
     collection.find(query,{'limit':200 , sort : { _id: 1 }  },function(e,docs){
       for (var i = 0, len = docs.length; i < len; i++) {
         exportTable(docs[i].name);
       }
     })
   }}
  query={};
  if (req.query.SID) query={SID: req.query.SID};
  collection.find(query,{'limit':200 , sort : { ID: 1 }  },function(e,docs){
  res.render(form.view, {
      title: form.title,
      refresh: false,
      obj: docs,
      link: form.link,
      entity: form.entity,
      fields: form.fields
    });
})
}
