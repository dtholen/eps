sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
var msg;
module.exports = function (req, res) {
  var msg= {id: 'req', value:req.query}
  console.log(msg);
  var eID=req.query.eID;
  var ID=req.query.ID;
  var response={value:"nop"};

  switch (eID) {
    case "0":
      response={id: 'res', value:global.teacher[ID]};
      break;
    case "1":
      response={id: 'res', value:global.book[ID]};
      break;
    case "2":
      response={id: 'res', value:ID};
      break;
    case "3":
      response={id: 'res', value:ID};
      break;

  }
  console.log(response);
  res.send(response);
  }
