var dateFormat = require('dateformat');
var x,lx="";
module.exports = function (req, res) {

  var collection = global.db.get('events');
  var query;
  var opt ={};
  opt.limit = 50;
  opt.id = 'MCU007';
  opt.type = 'TEMP';
  opt.unit = 'h';
  opt.refresh = true;
  if (req.query.limit != undefined) opt.limit = req.query.limit;
  if (req.query.unit != undefined) opt.unit = req.query.unit;
  if (req.query.type != undefined ) opt.type = req.query.type;
  if (req.query.id != undefined ) opt.id = req.query.id;
  opt.title = global.desc[opt.type] +' in Room '+ global.device_lable[opt.id];
  opt.query = { 'ID': opt.id, 'type': opt.type};
  opt.lp = opt.limit*2;
  opt.lm = opt.limit/2;


  collection.find(opt.query ,{'limit':opt.limit , sort : { timestamp : -1 }  },function(e,docs){

    var data = {
        labels: [],
        datasets: [{
            label: opt.title,
            data: [],
            borderWidth: 1
        }]
    }
    var options = {
      scales: {
          xAxes: [{
              gridLines: {
                  offsetGridLines: true
              }
          }]
      }
  }

  for (var i = 0, len = docs.length; i < len; i++) {
	   docs[i].bg="white";
     docs[i].ti = dateFormat(docs[i].timestamp, "h:MM:ss TT");
     if (opt.unit == 'h')
        x = dateFormat(docs[i].timestamp, "h");
     else
        x = dateFormat(docs[i].timestamp, "h:MM");
     if (opt.unit == 'd') x = dateFormat(docs[i].timestamp, "(d)");
     if (x==lx) data.labels.push(""); else {
       data.labels.push(x);
     }
     data.datasets[0].data.push(docs[i].value);
     lx=x;
  }
  res.render('chart_time', {
      opt : opt,
      data: data,
      options: options,
      obj:docs
    });
  }
)
}
