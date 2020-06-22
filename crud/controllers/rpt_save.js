exports.rpt_ByBook = function (req, res) {
    const form = {
        "title": "Bücher",
        "entity": "book",
        "link": "/lib/book/list",
        "bg": "BurlyWood",
        "limits":
            [
                { "lable": "1" },
                { "lable": "5" },
                { "lable": "10" },
                { "lable": "25" },
                { "lable": "100" },
                { "lable": "250" }
            ],
        "fields":
            [
                { "field": "ID", "lable": "ID" },
                { "field": "name", "lable": "Name" },
                { "field": "SID", "lable": "Fach" },
                { "field": "value", "lable": "Stück" },
                { "field": "class", "lable": "Schuhljahr" }
            ]
    }

    console.log('RPT book');
    var Book = mongoose.model('Book', BookSchema);
    var Transaction = mongoose.model('Transaction', TransactionSchema);
    client.get("sQuery", function (err, reply1) {
        client.get("sFilter", function (err, reply2) {
            var limit = { sort: { 'SID': 1 } }
            var query = {};
            if (reply1) query = { SID: reply1 }
            if (reply2) limit = { sort: { 'SID': 1 }, limit: parseInt(reply2) }
            console.log(query);
            console.log(limit);

            Book.find(query, null, limit, function (err, book) {
                if (err) return next(err);
                for (var i = 0, len = book.length; i < len; i++) {
                    var bid = book[i].ID;
                    var queryBID = '?BID=' + bid;
                    http.get('http://localhost:8080/lib/transaction' + queryBID, (resp) => {
                        let data = '';
                        resp.on('data', (chunk) => {
                            data += chunk;
                        });
                        resp.on('end', () => {
                            //                           console.log(data);
                            //                              console.log(JSON.parse(data).explanation);

                            // options object is used to pass more parameters to carbone render function 
                            let options = {
                                convertTo: 'pdf' //can be docx, txt, ...
                            }

                            res.render('book_list', {
                                obj: book,
                                subject: global.SID,
                                form: form
                            });
                            var obj = {};
                            obj.name = "Bücher Liste";
                            obj.books = book;
                            obj.tra = JSON.parse(data);
                            for (var i = 0, len = obj.tra.length; i < len; i++) {
                                obj.tra[i].name = global.teacher[obj.tra[i].LID];
                                console.log(obj.tra[i].LID + ' ' + obj.tra[i].name);

                            }

                            console.log(obj);
                            carbone.render('templates/reports/rpt001.odt', obj, options, (err) => {
                                if (err) {
                                    return console.log(err);
                                }
                                fs.writeFileSync('./reports/rpt001.pdf');
                            });

                        });

                    }).on("error", (err) => {
                        console.log("Error: " + err.message);
                    });

                }


            });
        });

    });
};




exports.rpt1 = function (req, res) {
    var query = '';
    if (req.query.BID) query = '?BID=' + req.query.BID;
    http.get('http://localhost:8080/lib/transaction' + query, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log(data);
            //         console.log(JSON.parse(data).explanation);
            console.log("end");
            res.send(data);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
};
