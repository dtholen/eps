sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');

module.exports = function (req, res) {
  var fs = require('fs');
  var col=['logfile']
  function collectioncreate(element, index, array) {
    var collection = global.db.get('transaction');
    var file ="config/"+element+".json";
    console.log("read file:"+file)
    setTimeout(function() {
    fs.readFileSync(file, 'utf-8').split(/\r?\n/).forEach(function(line){
    if (line.length >5) {
          var obj = JSON.parse(line);
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
