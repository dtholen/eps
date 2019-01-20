var dateFormat = require('dateformat');

module.exports = function (req, res) {
  var collection = global.db.get('device_status');
  var query;
  var title;
  if (req.query.type == undefined) {
      query = {type:'TEMP'};
      title = 'TEMP';
    }
  else {
      query = { type: req.query.type} ;
      title = req.query.type;
  }
  title = global.desc[query.type];
//  title = JSON.stringify(query);

  collection.find(query,{'limit':20 , sort : { ID : 1 }  },function(e,docs){

  var data = {
      labels: [],
      datasets: [{
          label: title,
          data: [],
          borderWidth: 1
      }]
  }

  for (var i = 0, len = docs.length; i < len; i++) {
    docs[i].room = global.device_lable[docs[i].ID];
    data.labels.push(docs[i].room);
    data.datasets[0].data.push(docs[i].value);
    docs[i].ti = dateFormat(docs[i].timestamp, "(d) h:MM:ss TT");
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

  res.render('chart', {
      title: title,
      refresh: true,
      data: data,
      options: options,
      obj:docs
    });
})
}
