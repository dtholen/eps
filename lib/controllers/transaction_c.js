sprintf = require("sprintf-js").sprintf;
global = require('../config/globals');
var dateFormat = require('dateformat');
module.exports = function(req, res) {
    var fs = require('fs');
    var env = global.config.demo
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
        var teacher = global.tt[req.body.teacher].ID;
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
            var entity = 'transacton';
            var collection = global.db.get('transaction');
            var value = parseInt(req.body.value) * global.tx[req.body.eType].value;
            var obj = {
                eRef: req.body.eRef,
                LID: req.body.teacher,
                TID: req.body.eType,
                CID: req.body.class,
                BID: req.body.book,
                value: value,
                enabled: "true",
                timestamp: new Date()
            };
            console.log("BID");
            console.log(req.body);
            var element='logfile'
            var file ="config/"+element+".json";
            var myJSON = JSON.stringify(obj)+'\n';

            fs.appendFile(file, myJSON, (err) => {
              if (err) throw err;
              console.log('The "data to append" was appended to file!');
            });
            console.log(obj);
            collection.insert(obj, function(err, res) {if (err) throw err; });
            global.valid=false;

        }

    }
    render_c();
};
