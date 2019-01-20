sprintf = require("sprintf-js").sprintf;
const bodyParser = require('body-parser');
global = require('../config/globals');
module.exports = function (req, res) {
  var env = global.config.demo
if (req.method=="POST") {
    var d = new Date();
    var uxt = d/1000 | 0;
    // check duplicates * some browsers send 2 after $ajax call a second event which must be ignored
    var gt = uxt - 125; // ignore message if same event comes in the last 125 seconds.
    var teacher = global.teacher[req.body.teacher];
    var book = global.book[req.body.book];
    var etype = global.trantype[req.body.eType];
    var count = 10;
/*
    console.log("Transaction c");
    console.log(teacher);
    console.log(book);
    console.log(req.body.class);
    console.log(req.body.eType);
    console.log(req.body.value);

*/
    res.render('transaction_a', {
        title: 'Vorgang Prüfen',
        teacher : teacher,
        book: book,
        class: req.body.class,
        eType: req.body.eType,
        value: req.body.value,
        cancel : '/transaction'
      })
  }
  else {
    c1 = global.db.get('teacher');
    c2 = global.db.get('book');
    c3 = global.db.get('class');
    c1.find({},{'limit':100 , sort : { ID : 1 }  },function(e,doc1){
    c2.find({},{'limit':100 , sort : { ID : 1 }  },function(e,doc2){
    c3.find({},{'limit':100 , sort : { ID : 1 }  },function(e,doc3){
    res.render('transaction_c', {
        title: 'Vorgang Erfassen',
        BID: req.body.BID,
        teacher_list : doc1,
        book_list: doc2,
        class_list: doc3,
        cancel : '/transaction'
      })
          })
                    })
                    })
}
};
