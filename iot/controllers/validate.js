sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');

module.exports = function (req, res) {
  console.log(req.query);
  var eID=req.query.eID;
  var ID=req.query.ID;
  var response={value:"nop"};

  switch (eID) {
    case "0":
      response={value:global.teacher[ID]};
      break;
    case "1":
      response={value:global.book[ID]};
      break;
    case "2":
      response={value:global.cc[ID]};

      break;
  }

  console.log(response);
  res.send(response);
  }
