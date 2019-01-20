sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');

module.exports = function (req, res) {
  var fs = require('fs');
// var col=['trantype']
  var col=['teacher','class','subject', 'book','transaction','trantype','entity']
  function collectioncreate(element, index, array) {
    var collection = global.db.get(element);
    var data ="config/"+element+".json";
    collection.drop()
    console.log("Collection "+element+" droped");
    setTimeout(function() {
    fs.readFileSync(data, 'utf-8').split(/\r?\n/).forEach(function(line){
    if (line.length >5) {
          var obj = JSON.parse(line);
          var d = new Date();
          var uxt = d/1000 | 0;
          obj.timestamp=uxt;
          collection.insert(obj, function(err, res) {
          if (err) throw err;
        });
    }

    })
  }, 1000);
  }
  col.forEach(collectioncreate);
  setTimeout(function() {
      res.redirect('/library');
  }, 2000);

  }
