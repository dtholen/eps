sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
module.exports = function(req, res) {
    var fs = require('fs');
    var env = global.config.demo
    function render_c() {
        c1 = global.db.get('teacher');
        c2 = global.db.get('book');
        c1.find({}, {
            'limit': 100,
            sort: {
                ID: 1
            }
        }, function(e, doc1) {
            c2.find({}, {
                'limit': 100,
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
        var d = new Date();
        var uxt = d / 1000 | 0;
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
            console.log(req.body.teacher);
            console.log(req.body.book);
            console.log(req.body.class);
            console.log(req.body.eType);
            console.log(req.body.value);
            console.log(req.body.mode_s);
        */
        if (req.body.mode_s == "a") {

            var d = new Date();
            var uxt = d / 1000 | 0;
            // check duplicates * some browsers send 2 after $ajax call a second event which must be ignored
            var gt = uxt - 125; // ignore message if same event comes in the last 125 seconds.

            //  var trantype = global.transtype[req.body.eType];
            var teacher_id = req.body.teacher.split(":");
            var book_id = req.body.book.split(":");

            var entity = 'transacton';
            var collection = global.db.get('transaction');
            var d = new Date();
            var uxt = d / 1000 | 0;
            var value = parseInt(req.body.value) * global.ttsign[req.body.eType];
            var obj = {
                LID: teacher_id[0],
                TID: req.body.eType,
                CID: req.body.class,
                BID: book_id[0],
                value: value
            };
            var element='logfile'
            var file ="config/"+element+".json";
            obj.timestamp = uxt;
            var myJSON = JSON.stringify(obj)+'\n';
            fs.appendFile(file, myJSON, (err) => {
              if (err) throw err;
              console.log('The "data to append" was appended to file!');
            });
            console.log(obj)

            collection.insert(obj, function(err, res) {
                if (err) throw err;
                global.valid = false;
                global.config.showTransaction(entity, 'i', '');
            });

            render_c();
        } else {

            res.render('transaction_a', {
                title: 'Vorgang Prüfen',
                teacher: teacher,
                book: book,
                class: req.body.class,
                eType: req.body.eType,
                value: req.body.value,
                cancel: '/transaction'
            })
        }
    } else {
        render_c();
    }
};
