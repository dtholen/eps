sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
var msg;
module.exports = function (req, res) {
  var msg= {id: 'req', value:req.query}
//  console.log(msg);
  var eID=req.query.eID;
  var ID=req.query.ID;
  var response={value:"nop"};
//  console.log(req.query);

  switch (eID) {
    case "0":
      response={id: ID, value:global.teacher[ID]};
      break;
    case "1":
      response={id: ID, value:global.book[ID]};
      break;
    case "2":
      response={id: ID, value:global.subject[ID].name};
      break;
    case "3":
      break;
    case "4":
      response={id: ID, value:global.tx[ID].name};
      break;
    case "5":
      response={id: ID, value:global.tx[ID].value};
      break;
    case "6":
      response={id: ID, value:global.tx[ID].icon};
      break;

  }
//  console.log(response);
  res.send(response);
  }
