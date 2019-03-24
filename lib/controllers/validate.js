sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
var msg;
module.exports = function (req, res) {
  var msg= {id: 'req', value:req.query}
//  console.log(msg);
  console.log(req.query);
  var eID=req.query.eID;
  var ID=req.query.ID;
  var response={value:"nop"};
  var links =  [{}];
  var eLink;

  switch (eID) {
    case "0":
      response={id: ID, value:global.tt[ID].name + ' ' + global.tt[ID].surname};
      res.send(response);
      break;
    case "1":
      response={id: ID, value:global.book[ID]};
      res.send(response);
      break;
    case "2":
      response={id: ID, value:global.subject[ID].name};
      res.send(response);
      break;
    case "3":
      res.send(response);
      break;
    case "4":
      response={id: ID, value:global.tx[ID].name};
      res.send(response);
      break;
    case "5":
      response={id: ID, value:global.tx[ID].value};
      res.send(response);
      break;
    case "6":
      response={id: ID, value:global.tx[ID].icon};
      res.send(response);
      break;
    case "7":
      response={id: ID, value:global.tt[ID].avatar};
      res.send(response);
      break;
    case "8":
      var q='/img?id='+ID;
      response={id: ID, value:q};
      res.send(response);
      break;
    case "9":
      eLink=0;
      collection = global.db.get('task');
      c2 = global.db.get('link');
      query={};
      collection.find(query,{'limit':200 , sort : { ID: 1 }  },function(e,docs){
        for (var i = 0, len = docs.length; i < len; i++) {
          docs[i].id = docs[i].ID;
        }
        c2.find(query,{'limit':200 },function(e,l){
          for (var i = 0, len = l.length; i < len; i++) {
            links[i]={"id":l[i]._id, "source": l[i].source,"target": l[i].target, "type": l[i].type};
          }
          response= {id: eID, value: {data: docs, links: links}};
          res.send(response);
        })
      })

      break;
    }

  }
