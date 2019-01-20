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

//  var trantype = global.transtype[req.body.eType];
    var teacher_id = req.body.teacher.split(":");
    var book_id = req.body.book.split(":");
/*
    console.log("Transaction_i");
    console.log(teacher_id[0]);
    console.log(book_id[0]);
    console.log(req.body.eType);
    console.log(req.body.value);
*/

          var entity = 'transacton';
          var collection = global.db.get('transaction');
          var d = new Date();
          var uxt = d/1000 | 0;
          var value = parseInt(req.body.value) * global.ttsign[req.body.eType];
          var obj = {LID:teacher_id[0], TID:req.body.eType, CID:req.body.class, BID: book_id[0], value:value };
          obj.timestamp=uxt;
          console.log(obj)
          collection.insert(obj, function(err, res) {
          if (err) throw err;
          global.valid=false;
          global.config.showTransaction(entity,'i','');
        });

  }

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

};
