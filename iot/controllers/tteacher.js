sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
var entity='transaction';
var title='Vorgänge';
var lable=title;
module.exports = function (req, res) {
  collection = global.db.get(entity);
  collection.find({},{'limit':50 , sort : { _id: 1 }  },function(e,docs){
  res.render(entity, {
      title: title,
      refresh: false,
      obj: docs
    });
})
}
