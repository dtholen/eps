sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
var dateFormat = require('dateformat');
module.exports = function(req, res) {
    var fs = require('fs');
    var env = global.config.demo

    collection = global.db.get("transaction");
    if (req.method=="POST") {
      console.log(req.body);
        var newvalues = {nr:req.body.md_nr, ID: req.body.md_ID, name: req.body.md_name, link: req.body.md_link, attr: req.body.md_attr, enabled: req.body.md_enabled }
         switch (req.body.action) {
           case 'x':
             collection.insert(newvalues, function(err, res) { if (err) throw err; });
             break;
           case 'u':
             collection.update({"_id": req.body.md_id}, newvalues, function(err, res) { if (err) throw err; });
             break;
           case 'e':
               newvalues = { $set: {enabled: req.body.enabled }};
               collection.update({"_id": req.body._id}, newvalues, function(err, res) { if (err) throw err; });
               break;
           case 'd':
             collection.remove({"_id": req.body.md_id}, function(err, res) { if (err) throw err; });
             break;
           default:
             alert( "I don't know such values" );
         }
    }

    function render_c() {
        c1 = global.db.get('teacher');
        c2 = global.db.get('book');
        c1.find({}, {
            'limit': 200,
            sort: {
                ID: 1
            }
        }, function(e, doc1) {
            c2.find({}, {
                'limit': 500,
                sort: {
                    ID: 1
                }
            }, function(e, doc2) {
                    res.render('transaction_c', {
                        title: 'Vorgang Erfassen',
                        teacher_list: doc1,
                        book_list: doc2,
                        cancel: '/transaction'
                    })
                })
        })
    }



    if (req.method == "POST") {
        var teacher = global.teacher[req.body.teacher];
        var book = global.book[req.body.book];
        var etype = global.tx[req.body.eType].name;

/*
            console.log("Transaction c");
            console.log(teacher);
            console.log(book);
            console.log(req.body.teacher);
            console.log(req.body.book);
            console.log(req.body.class);
            console.log(req.body.eType);
            console.log(req.body.value);
            console.log(req.body.mode_s);
*/
        if (req.body.mode_s == "c") {
            var teacher_id = req.body.teacher.split(":");
            var book_id = req.body.book.split(":");
            var entity = 'transacton';
            var collection = global.db.get('transaction');
            var value = parseInt(req.body.value) * global.tx[req.body.eType].value;
            var obj = {
                eRef: req.body.eRef,
                LID: teacher_id[0],
                TID: req.body.eType,
                CID: req.body.class,
                BID: book_id[0],
                value: value,
                timestamp: new Date()
            };
            var element='logfile'
            var file ="config/"+element+".json";
            var myJSON = JSON.stringify(obj)+'\n';

            fs.appendFile(file, myJSON, (err) => {
              if (err) throw err;
              console.log('The "data to append" was appended to file!');
            });
            console.log(obj)
            collection.insert(obj, function(err, res) {if (err) throw err; });
            global.valid=false;

        }

    }
    render_c();
};
