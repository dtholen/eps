const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const redis = require("redis");
var dateFormat = require('dateformat');
const client = redis.createClient();
const fs = require('fs');
const carbone = require('carbone');
const http = require('http');
// all global definitions including Database connects
global.teacher = [];
global.subject = [];
global.SID = [];
global.BID = [];
global.LID = [];
global.book = [];
global.trantype = [];
global.doctype = [];
global.limits = [{ "lable": "5" },{ "lable": "10" },{ "lable": "25" },{ "lable": "100" }];
global.bg = ["BurlyWood", "AntiqueWhite", "MediumSpringGreen", "PowderBlue"];
console.log(global.bg);
var BookSchema = new Schema({
    ID: { type: String },
    name: { type: String },
    SID: { type: String },
    value: { type: Number },
    class: { type: String },
    enabled: { type: Boolean },
    timestamp: { type: Date, default: Date.now }
});

var DocumentSchema = new Schema({
    ID: { type: String },
    typ: { type: String },
    name: { type: String },
    seq: { type: Number, default: 0  },
    link: { type: String },
    enabled: { type: Boolean, default: true },
    timestamp: { type: Date, default: Date.now }
});

var DoctypeSchema = new Schema({
    ID: { type: String },
    name: { type: String },
    icon: { type: String },
    timestamp: { type: Date, default: Date.now }
});


var SubjectSchema = new Schema({
    ID: { type: String },
    name: { type: String },
    icon: { type: String },
    timestamp: { type: Date, default: Date.now }
});

var EntrySchema = new Schema({
    ID: { type: String },
    name: { type: String },
    seq: { type: Number },
    link: { type: String },
    attr: { type: String },
    enabled: { type: Boolean },
    timestamp: { type: Date, default: Date.now }
});


var EntitySchema = new Schema({
    ID: { type: String },
    name: { type: String },
    enabled: { type: Boolean, default:true },
    timestamp: { type: Date, default: Date.now }
});


var TeacherSchema = new Schema({
    ID: { type: String },
    name: { type: String },
    surname: { type: String },
    enabled: { type: Boolean },
    avatar: { type: String },
    timestamp: { type: Date, default: Date.now }
});

var TransactionSchema = new Schema({
    eRef: { type: String },
    LID: { type: String },
    TID: { type: String },
    CID: { type: String },
    BID: { type: String },
    value: { type: Number },
    enabled: { type: Boolean },
    timestamp: { type: Date, default: Date.now }
});

var TrantypeSchema = new Schema({
    ID: { type: String },
    name: { type: String },
    value: { type: String },
    icon: { type: String },
    timestamp: { type: Date, default: Date.now }
});

var TrantypeForm = {
    "title": "Neuen Typ anlegen",
    "name" : "Vorgangstyp",
    "entity": "trantype",
    "link": "/lib/trantype/create",
    "fields":
        [
            { "field": "ID", "lable": "ID", "type": "text" },
            { "field": "name", "lable": "Name", "type": "text" },
            { "field": "value", "lable": "Wert", "type": "number" },
            { "field": "icon", "lable": "Icon", "type": "text" }
        ]
}


var DocumentForm = {
    "title": "Dokumente",
    "name" : "Dokument",
    "entity": "document",
    "link": "/lib/document/create",
    "fields":
        [
            { "field": "ID", "lable": "ID", "type": "text" },
            { "field": "name", "lable": "Name", "type": "text" },
            { "field": "typ", "lable": "Typ", "type": "text" },
            { "field": "link", "lable": "link", "type": "text" },
            { "field": "enabled", "lable": "enabled", "type": "Boolean" }
        ]
}

var DoctypeForm = {
    "title": "Dokumentettypen",
    "name" : "Dokumenten Typ",
    "entity": "doctype",
    "link": "/lib/doctype/create",
    "fields":
        [
            { "field": "ID", "lable": "ID", "type": "text" },
            { "field": "name", "lable": "Name", "type": "text" },
            { "field": "icon", "lable": "icon", "type": "text" }
        ]
}

var SubjectForm = {
    "title": "Fächer",
    "name" : "Fach",
    "entity": "subject",
    "link": "/lib/subject/create",
    "fields":
        [
            { "field": "ID", "lable": "ID", "type": "text" },
            { "field": "name", "lable": "Name", "type": "text" },
            { "field": "icon", "lable": "Icon", "type": "text" }
        ]
}

var BookForm = {
    "title": "Bücher",
    "name" : "Buch",
    "entity": "book",
    "link": "/lib/book/create",
    "fields":
        [
            { "field": "ID", "lable": "ID", "type": "text" },
            { "field": "name", "lable": "Name", "type": "text" },
            { "field": "SID", "lable": "Fach", "type": "text" },
            { "field": "value", "lable": "Stück", "type": "number" },
            { "field": "class", "lable": "Schuhljahr", "type": "text" }
        ]
}


var TeacherForm = {
    "title": "Lehrer",
    "name" : "Lehrer",
    "entity": "teacher",
    "link": "/lib/teacher/create",
    "fields":
        [
            { "field": "ID", "lable": "ID", "type": "text" },
            { "field": "name", "lable": "Name", "type": "text" },
            { "field": "surname", "lable": "Nachname", "type": "text" },
            { "field": "enabled", "lable": "aktiv", "type": "boolean" },
            { "field": "avatar", "lable": "Avatar", "type": "text" }
        ]
}

const TransactionForm = {
    "title": "Vorgänge",
    "name" : "Vorgang",
    "entity": "transaction",
    "link": "/lib/transaction/create",
    dict: {
        RETURN: "Rückgabe",
        ISSUE: "Ausleihen",
        NEW: "Neu"
    },
    "fields":
        [
            { "field": "LID", "lable": "Lehrer", "type": "text" },
            { "field": "TID", "lable": "Vorgang", "type": "text" },
            { "field": "CID", "lable": "Info", "type": "text" },
            { "field": "BID", "lable": "Buch", "type": "text" },
            { "field": "value", "lable": "Anzahl", "type": "number" },
            { "field": "enabled", "lable": "aktiv", "type": "boolean" }
        ]
}


var EntryForm =  {
    "title": "Hauptmenue",
    "name" : "Menue",
    "entity": "entry",
    "link": "/lib/entry/create",
    "fields":
        [
            { "field": "ID", "lable": "ID", "type": "text" },
            { "field": "name", "lable": "Name", "type": "text" },
            { "field": "seq", "lable": "Seqence", "type": "number" },
            { "field": "link", "lable": "Link", "type": "text" },
            { "field": "attr", "lable": "Attribute", "type": "text" },
            { "field": "enabled", "lable": "aktiv", "type": "boolean" }
        ]
}

var EntityForm =  {
    "title": "Tabellen",
    "name" : "Tabelle",
    "entity": "entity",
    "link": "/lib/entity/create",
    "fields":
        [
            { "field": "ID", "lable": "ID", "type": "text" },
            { "field": "name", "lable": "Name", "type": "text" },
            { "field": "enabled", "lable": "aktiv", "type": "boolean" }
        ]
}


var Teacher = mongoose.model('Teacher', TeacherSchema);
Teacher.find({}, function (err, teacher) {
    for (var i = 0, len = teacher.length; i < len; i++) {
        global.teacher[teacher[i].ID] = teacher[i].name + ' ' + teacher[i].surname;
 //       console.log(global.teacher[teacher[i].ID]);
    }
    global.LID=teacher;
});

var Subject = mongoose.model('Subject', SubjectSchema);
Subject.find({}, function (err, subject) {
    for (var i = 0, len = subject.length; i < len; i++) {
        global.subject[subject[i].ID] = subject[i].name;
    }
    global.SID=subject;
});

var Trantype = mongoose.model('Trantype', TrantypeSchema);
Trantype.find({}, function (err, trantype) {
    for (var i = 0, len = trantype.length; i < len; i++) {
        global.trantype[trantype[i].ID] = trantype[i].name;
    }
    global.trantype=trantype;
});


var Doctype = mongoose.model('Doctype', DoctypeSchema);
Doctype.find({}, function (err, doctype) {
    for (var i = 0, len = doctype.length; i < len; i++) {
        global.doctype[doctype[i].ID] = doctype[i].name;
    }
    global.doctype=doctype;
});

var Book = mongoose.model('Book', BookSchema);
Book.find({}, function (err, book) {
    for (var i = 0, len = book.length; i < len; i++) {
        global.book[book[i].ID] = book[i].name;
    } 
    global.BID=teacher;
});


exports.ok = function (req, res) {
    console.log("hallo ok");
    res.send("ok");
};

// get Data

exports.getTransaction = function (req, res) {
    var query = {};
    if (req.query.BID) {
        query = { BID: req.query.BID };
        console.log(req.query.BID);
    }
    if (req.query.LID) {
        query = { LID: req.query.LID };
        console.log(req.query.LID);
    }   
    var Transaction = mongoose.model('Transaction', TransactionSchema);
    Transaction.find(query, function (err, transaction) {
        if (err) return next(err);
        res.send(transaction);
    });
};

exports.getBook = function (req, res) {
    var query = {};
    if (req.query.SID) query = { SID: req.query.SID };
    if (req.query.id) query = { _id: req.query.id };
    var sort = { sort: { 'SID': 1 } }
    var Book = mongoose.model('Book', BookSchema);
    Book.find(query, null, sort, function (err, obj) {
        if (err) return next(err);
        res.send(obj);
    });
};

exports.getEntry = function (req, res) {
    var query = {};
    if (req.query.id) query = { _id: req.query.id };
    var sort = { sort: { 'seq': 1 } }
    var Entry = mongoose.model('Entry', EntrySchema);
    Entry.find(query, null, sort, function (err, obj) {
        if (err) return next(err);
        res.send(obj);
    });
};

exports.getDocument = function (req, res) {
    var query = {};
    if (req.query.typ) query = { typ: req.query.typ };
    if (req.query.id) query = { _id: req.query.id };
    var sort = { sort: { 'name': 1 } }
    var Book = mongoose.model('Document', DocumentSchema);
    Book.find(query, null, sort, function (err, obj) {
        if (err) return next(err);
        res.send(obj);
    });
};

exports.getSubject = function (req, res) {
    var query = {};
    if (req.query.id) query = { _id: req.query.id };
    var sort = { sort: { 'name': 1 } }
    var Book = mongoose.model('Subject', SubjectSchema);
    Book.find(query, null, sort, function (err, obj) {
        if (err) return next(err);
        res.send(obj);
    });
};

exports.getTrantype = function (req, res) {
    var query = {};
    if (req.query.id) query = { _id: req.query.id };
    var sort = { sort: { 'name': 1 } }
    var Book = mongoose.model('Trantype', TrantypeSchema);
    Book.find(query, null, sort, function (err, obj) {
        if (err) return next(err);
        res.send(obj);
    });
};

exports.getTeacher = function (req, res) {
    var query = {};
    if (req.query.name) query = { name: req.query.name};
    if (req.query.surname) query = { surname: req.query.surname};
    if (req.query.ID) query = { ID: req.query.ID };
    if (req.query.id) query = { _id: req.query.id };
    var sort = { sort: { 'surname': 1 } }
    var Teacher = mongoose.model('Teacher', TeacherSchema);
    Teacher.find(query,null, sort, function (err, obj) {
        if (err) return next(err);
        res.send(obj);
    });
};


exports.rptbook = function (req, resource) {
    const name = 'book';
    const report = 'rpt'+name;
    http.get('http://localhost:8080/lib/'+name, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            // options object is used to pass more parameters to carbone render function 
            let options = {
                convertTo: 'pdf' //can be docx, txt, ...
            }
            var obj = {};
            var ts = new Date();
            obj.title = "Buchliste";
            obj.timestamp = ts.toLocaleString();
            obj.tra = JSON.parse(data);
            obj.cnt = obj.tra.length;
            console.log(report+': ('+obj.cnt+')');
            for (var i = 0, len = obj.tra.length; i < len; i++) {
                  obj.tra[i].ti = dateFormat(obj.tra[i].timestamp, "dd.mm.yy HH:MM");
            }
            carbone.render('templates/reports/rpt'+name+'.odt', obj, options, (err, res) => {
                if (err) {
                    return console.log(err);
                }
                fs.writeFileSync('./reports/'+ report+'.pdf', res);
                var data =fs.readFileSync('./reports/'+ report+'.pdf');
                resource.contentType("application/pdf");
                resource.send(data);
            });

        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

};

exports.rptdocument = function (req, resource) {
    const name = 'document';
    const report = 'rpt'+name;
    http.get('http://localhost:8080/lib/'+name, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            // options object is used to pass more parameters to carbone render function 
            let options = {
                convertTo: 'pdf' //can be docx, txt, ...
            }
            var obj = {};
            var ts = new Date();
            obj.title = "Dokumentliste";
            obj.timestamp = ts.toLocaleString();
            obj.tra = JSON.parse(data);
            obj.cnt = obj.tra.length;
            console.log(report+': ('+obj.cnt+')');
            for (var i = 0, len = obj.tra.length; i < len; i++) {
                  obj.tra[i].ti = dateFormat(obj.tra[i].timestamp, "dd.mm.yy HH:MM");
            }
            carbone.render('templates/reports/rpt'+name+'.odt', obj, options, (err, res) => {
                if (err) {
                    return console.log(err);
                }
                fs.writeFileSync('./reports/'+ report+'.pdf', res);
                var data =fs.readFileSync('./reports/'+ report+'.pdf');
                resource.contentType("application/pdf");
                resource.send(data);
            });

        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

};

exports.rptsubject = function (req, resource) {
    const name = 'subject';
    const report = 'rpt'+name;
    http.get('http://localhost:8080/lib/'+name, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            // options object is used to pass more parameters to carbone render function 
            let options = {
                convertTo: 'pdf' //can be docx, txt, ...
            }
            var obj = {};
            var ts = new Date();
            obj.title = "Dokumentliste";
            obj.timestamp = ts.toLocaleString();
            obj.tra = JSON.parse(data);
            obj.cnt = obj.tra.length;
            console.log(report+': ('+obj.cnt+')');
            for (var i = 0, len = obj.tra.length; i < len; i++) {
                  obj.tra[i].ti = dateFormat(obj.tra[i].timestamp, "dd.mm.yy HH:MM");
            }
            carbone.render('templates/reports/rpt'+name+'.odt', obj, options, (err, res) => {
                if (err) {
                    return console.log(err);
                }
                fs.writeFileSync('./reports/'+ report+'.pdf', res);
                var data =fs.readFileSync('./reports/'+ report+'.pdf');
                resource.contentType("application/pdf");
                resource.send(data);
            });

        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

};


exports.rpttrantype = function (req, resource) {
    const name = 'trantype'
    const report = 'rpt'+name;
    http.get('http://localhost:8080/lib/'+name, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            // options object is used to pass more parameters to carbone render function 
            let options = {
                convertTo: 'pdf' //can be docx, txt, ...
            }
            var obj = {};
            var ts = new Date();
            obj.title = "Trantypeliste";
            obj.timestamp = ts.toLocaleString();
            obj.tra = JSON.parse(data);
            obj.cnt = obj.tra.length;
            console.log(report+': ('+obj.cnt+')');
            for (var i = 0, len = obj.tra.length; i < len; i++) {
                  obj.tra[i].ti = dateFormat(obj.tra[i].timestamp, "dd.mm.yy HH:MM");
            }
            carbone.render('templates/reports/rpt'+name+'.odt', obj, options, (err, res) => {
                if (err) {
                    return console.log(err);
                }
                fs.writeFileSync('./reports/'+ report+'.pdf', res);
                var data =fs.readFileSync('./reports/'+ report+'.pdf');
                resource.contentType("application/pdf");
                resource.send(data);
            });

        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

};


exports.rptteacher = function (req, resource) {
    const name = 'teacher'
    const report = 'rpt'+name;
    var query = '';
    if (req.query.name) query = '?name='+req.query.name;
    if (req.query.surname) query = '?surname='+req.query.surname;
    if (req.query.id) query = '?_id='+req.query.id;
    if (req.query.ID) query = '?ID='+req.query.ID;

    http.get('http://localhost:8080/lib/'+name+query, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            // options object is used to pass more parameters to carbone render function 
            let options = {
                convertTo: 'pdf' //can be docx, txt, ...
            }
            var obj = {};
            var ts = new Date();
            obj.title = "Liste der Lehrer";
            obj.timestamp = ts.toLocaleString();
            obj.tra = JSON.parse(data);
            obj.cnt = obj.tra.length;
            console.log(report+': ('+obj.cnt+')');
            for (var i = 0, len = obj.tra.length; i < len; i++) {
                  obj.tra[i].ti = dateFormat(obj.tra[i].timestamp, "dd.mm.yy HH:MM");
            }
            carbone.render('templates/reports/rpt'+name+'.odt', obj, options, (err, res) => {
                if (err) {
                    return console.log(err);
                }
                fs.writeFileSync('./reports/'+ report+'.pdf', res);
                var data =fs.readFileSync('./reports/'+ report+'.pdf');
                resource.contentType("application/pdf");
                resource.send(data);
            });

        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
};


exports.rptentry = function (req, resource) {
    const name = 'entry'
    const report = 'rpt'+name;
    http.get('http://localhost:8080/lib/'+name, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            // options object is used to pass more parameters to carbone render function 
            let options = {
                convertTo: 'pdf' //can be docx, txt, ...
            }
            var obj = {};
            var ts = new Date();
            obj.title = "Eingangsmaske";
            obj.timestamp = ts.toLocaleString();
            obj.tra = JSON.parse(data);
            obj.cnt = obj.tra.length;
            console.log(report+': ('+obj.cnt+')');
            for (var i = 0, len = obj.tra.length; i < len; i++) {
                  obj.tra[i].ti = dateFormat(obj.tra[i].timestamp, "dd.mm.yy HH:MM");
            }
            carbone.render('templates/reports/rpt'+name+'.odt', obj, options, (err, res) => {
                if (err) {
                    return console.log(err);
                }
                fs.writeFileSync('./reports/'+ report+'.pdf', res);
                var data =fs.readFileSync('./reports/'+ report+'.pdf');
                resource.contentType("application/pdf");
                resource.send(data);
            });

        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
};



exports.rpttransaction = function (req, resource) {
    const name = 'transaction'
    const report = 'rpt'+name;
    var query = '';
    if (req.query.LID) query = '?LID='+req.query.LID;
    if (req.query.BID) query = '?BID='+req.query.BID;
    if (req.query.id) query = '?_id='+req.query.id;
    http.get('http://localhost:8080/lib/'+name+query, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            // options object is used to pass more parameters to carbone render function 
            let options = {
                convertTo: 'pdf' //can be docx, txt, ...
            }
            var obj = {};
            var ts = new Date();
            obj.title = "Liste der Vorgänge";
            obj.timestamp = ts.toLocaleString();
            obj.tra = JSON.parse(data);
            obj.cnt = obj.tra.length;
            console.log(report+': ('+obj.cnt+')');
            for (var i = 0, len = obj.tra.length; i < len; i++) {
                obj.tra[i].teacher = global.teacher[obj.tra[i].LID];
                obj.tra[i].book = global.book[obj.tra[i].BID];
                obj.tra[i].trantype = global.trantype[obj.tra[i].TID];
                obj.tra[i].ti = dateFormat(obj.tra[i].timestamp, "dd.mm.yy HH:MM");
            }
            carbone.render('templates/reports/rpt'+name+'.odt', obj, options, (err, res) => {
                if (err) {
                    return console.log(err);
                }
                fs.writeFileSync('./reports/'+ report+'.pdf', res);
                var data =fs.readFileSync('./reports/'+ report+'.pdf');
                resource.contentType("application/pdf");
                resource.send(data);
            });

        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

};



function enter(form, param, res) {

    var view = 'enter_std';
    if (param.copy) {
        param.bg = global.bg[2];
        param.title = form.title +' kopieren';
    }
    else if (param.edit) {
        param.bg = global.bg[1];
        param.title = form.title +' ändern';
    }

    else {
        param.bg = global.bg[3];
        param.title = form.title +' neu';
    }
    console.log(view+': '+form.entity);
    form.id = param.id;
    form.edit = param.edit;
    form.copy = param.copy;
    res.render(view, {
        form: form,
        param: param
    });
};



function enter_transaction(param, res) {

    var form = TransactionForm;
    param.bg = global.bg[0]
    var key, value;
    form.id = param.id;
    form.edit = param.edit;
    form.copy = param.copy;
    console.log("render transaction_enter");
    console.log(form.link);
    res.render('transaction_enter', {
        form: form,
        param: param,
        trantype: global.trantype,
        teacher: global.LID,
        book: global.BID
    });


};

exports.book_create = function (req, res) {
    console.log('create book');
    var Book = mongoose.model('Book', BookSchema);
    console.log(req.body.id);
    let book = new Book(
        {
            ID: req.body.ID,
            name: req.body.name,
            SID: req.body.SID,
            value: req.body.value,
            class: req.body.class,
            enabled: req.body.enabled
        }
    );

    if (req.body.copy) { }
    else {
        if (req.body.id) {
            Book.findByIdAndRemove(req.body.id, function (err) {
                if (err) return next(err);
            }

            )
        }
    }

    book.save(function (err) {
        if (err) {
            return res.send(err);
        }
        res.redirect("/lib/book/list");

    })
};


exports.book_list = function (req, res) {
    var param = {};
    var form = BookForm;
    var view = form.entity+'_list';
    console.log(view);

    param.bg = global.bg[0]
    param.limits = global.limits;
    var Book = mongoose.model('Book', BookSchema);
    client.get("sQuery", function (err, reply1) {
            client.get("sFilter", function (err, reply2) {
                var limit = { sort: { 'timestamp': -1 } }
                var query = {};
                if (reply1) query = { SID: reply1 }
                if (reply2) limit = { sort: { 'timestamp': -1 }, limit: parseInt(reply2) }
                Book.find(query, null, limit, function (err, obj) {
                    if (err) return next(err);
                    param.count=obj.length;
                    for (var i = 0, len = param.count; i < len; i++) {
                        obj[i].ti = dateFormat(obj[i].timestamp, "dd.mm.yy HH:MM");
                    }
                    res.render('book_list', {
                        obj: obj,
                        subject: global.SID,
                        form: form,
                        param: param
                    });
                });
            });
    });
};

exports.book_enter = function (req, res) {
    console.log('book_enter');
    var param = {};

    if (req.query.id) {
        console.log("edit");
        param.id = req.query.id;
        param.edit = true;
        param.copy = '';
        param.bg = global.bg[0]

    }
    else {
        console.log("create");
        param.edit = '';
        param.copy = '';
        param.bg = "Tomato"

    }
    enter(BookForm,param, res);
};



exports.book_copy = function (req, res) {
    console.log('enter book copy');
    var param = {};

    if (req.query.id) {
        console.log("edit");
        param.id = req.query.id;
        param.edit = true;
        param.copy = true;
        param.bg = "MediumSpringGreen"

    }
    enter(BookForm,param, res);
};

exports.book_delete = function (req, res) {
    console.log('list delete');
    var Book = mongoose.model('Book', BookSchema);
    Book.findByIdAndRemove(req.body.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};


exports.book_getByid = function (req, res) {
    var Book = mongoose.model('Book', BookSchema);
    console.log('book_getByid');
    var query = { _id: req.body._id };
    console.log(query);
    Book.findOne(query, function (err, book) {
     if (err) return next(err);
        // console.log(book);
        res.send(book)
    });
};


// *** entry


exports.entry_list = function (req, res) {
    var param = {};
    var form = EntryForm;
    var view = form.entity+'_list';
    console.log(form);
    console.log(view);

    param.bg = global.bg[0]
    param.limits = global.limits;

    var Entry = mongoose.model('Entry', EntrySchema);
    client.get("sQuery", function (err, reply1) {
        client.get("sFilter", function (err, reply2) {
            var limit = { sort: { 'timestamp': -1 } }
            var query = {};
            console.log(query);
            if (reply2) limit = { sort: { 'timestamp': -1 }, limit: parseInt(reply2) }
            Entry.find(query, null, limit, function (err, obj) {
                if (err) return next(err);
                param.count=obj.length;
                for (var i = 0, len = param.count; i < len; i++) {
                    obj[i].ti = dateFormat(obj[i].timestamp, "dd.mm.yy HH:MM");
                }
                res.render(view, {
                    obj: obj,
                    form: form,
                    param: param
                });
            });
        });
});
};



exports.entry_enter = function (req, res) {
    console.log('entry_enter');
    var param = {};

    if (req.query.id) {
        console.log("edit");
        param.id = req.query.id;
        param.edit = true;
        param.copy = '';
        param.bg = global.bg[0]

    }
    else {
        console.log("create");
        param.edit = '';
        param.copy = '';
        param.bg = "Tomato"

    }
    enter(EntryForm,param, res);
};


exports.entry_copy = function (req, res) {
    console.log('entry_copy');
    var param = {};

    if (req.query.id) {
        console.log("edit");
        param.id = req.query.id;
        param.edit = true;
        param.copy = true;
        param.bg = "MediumSpringGreen"

    }

    enter(EntryForm,param, res);
};


exports.entry_create = function (req, res) {
    console.log('create entry');
    var Entry = mongoose.model('Entry', EntrySchema);
    console.log(req.body.id);
    let entry = new Entry(
        {
            ID: req.body.ID,
            name: req.body.name,
            seq: req.body.seq,
            link: req.body.link,
            attr: req.body.attr,
            enabled: req.body.enabled

        }
    );

    if (req.body.copy) {
        console.log("copy set");
        console.log(req.body.copy)
    }
    else {
        if (req.body.id) {
            Entry.findByIdAndRemove(req.body.id, function (err) {
                if (err) return next(err);
                console.log("remove old")
            }

            )
        }
    }

    entry.save(function (err) {
        if (err) {
            return res.send(err);
        }
        res.redirect("/lib/entry/list");
    })
};


exports.entry_getByid = function (req, res) {
    var Entry = mongoose.model('Entry', EntrySchema);
    console.log('entry_getByid');
    var query = { _id: req.body._id };
    console.log(query);
    Entry.findOne(query, function (err, entry) {
        //      if (err) return next(err);
        console.log(entry);
        res.send(entry)
    });
};

exports.entry_delete = function (req, res) {
    console.log('list delete');
    var Entry = mongoose.model('Entry', EntrySchema);
    Entry.findByIdAndRemove(req.body.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

// *** entity

exports.entity_list = function (req, res) {

    var param = {};
    var form = EntityForm;
    var view = form.entity+'_list';
    console.log(view);

    param.bg = global.bg[0]
    param.limits = global.limits;

    var Entity = mongoose.model('Entity', EntitySchema);
    client.get("sQuery", function (err, reply1) {
        client.get("sFilter", function (err, reply2) {
            var limit = { sort: { 'timestamp': -1 } }
            var query = {};
            if (reply2) limit = { sort: { 'timestamp': -1 }, limit: parseInt(reply2) }
            Entity.find(query, null, limit, function (err, obj) {
                if (err) return next(err);
                param.count=obj.length;
                for (var i = 0, len = param.count; i < len; i++) {
                    obj[i].ti = dateFormat(obj[i].timestamp, "dd.mm.yy HH:MM");
                }
                res.render(view, {
                    obj: obj,
                    form: form,
                    param: param
                });
            });
        });
});
};

exports.entity_enter = function (req, res) {
    console.log('entity_enter');
    var param = {};

    if (req.query.id) {
        console.log("edit");
        param.id = req.query.id;
        param.edit = true;
        param.copy = '';
        param.bg = global.bg[0]

    }
    else {
        console.log("create");
        param.edit = '';
        param.copy = '';
        param.bg = "Tomato"

    }
    enter(EntityForm,param, res);
};

exports.entity_copy = function (req, res) {
    console.log('copy entity');
    var param = {};

    if (req.query.id) {
        console.log("edit");
        param.id = req.query.id;
        param.edit = true;
        param.copy = true;
        param.bg = "MediumSpringGreen"

    }
    enter(EntityForm, param, res);
};


// *** home


exports.home = function (req, res) {
    console.log('home');
    var Entry = mongoose.model('Entry', EntrySchema);
    var sort = { sort: { 'seq': 1 } }
    var query = {};
    Entry.find(query, null, sort, function (err, entry) {
        if (err) return next(err);
        res.render('home', {
            obj: entry
        }
        );
    });
};


exports.entity_create = function (req, res) {
    console.log('create entity');
    var Entity = mongoose.model('Entity', EntitySchema);
    console.log(req.body.id);
    let entity = new Entity(
        {
            ID: req.body.ID,
            name: req.body.name
        }
    );

    if (req.body.copy) {
        console.log("copy set");
        console.log(req.body.copy)
    }
    else {
        if (req.body.id) {
            Entity.findByIdAndRemove(req.body.id, function (err) {
                if (err) return next(err);
                console.log("remove old")
            }

            )
        }
    }

    entity.save(function (err) {
        if (err) {
            return res.send(err);
        }
        res.redirect("/lib/entity/list");

    })
};


exports.entity_getByid = function (req, res) {
    var Entity = mongoose.model('Entity', EntitySchema);
    console.log('entity_getByid');
    var query = { _id: req.body._id };
    console.log(query);
    Entity.findOne(query, function (err, entity) {
        //      if (err) return next(err);
        console.log(entity);
        res.send(entity)
    });
};

exports.entity_delete = function (req, res) {
    console.log('list delete');
    var Entity = mongoose.model('Entity', EntitySchema);
    Entity.findByIdAndRemove(req.body.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};



// *** Trantype

exports.trantype_list = function (req, res) {
    var param = {};
    var form = TrantypeForm;
    var view = form.entity+'_list';
    console.log(view);

    param.bg = global.bg[0]
    param.limits = global.limits;
;
    var Trantype = mongoose.model('Trantype', TrantypeSchema);
    client.get("sFilter", function (err, reply) {
        var limit = { sort: { 'timestamp': -1 } }
        var query = {};
        if (reply) limit = { sort: { 'timestamp': -1 }, limit: parseInt(reply) }
        Trantype.find(query, null, limit, function (err, obj) {
            if (err) return next(err);
            param.count=obj.length;
            for (var i = 0, len = param.count; i < len; i++) {
                obj[i].ti = dateFormat(obj[i].timestamp, "dd.mm.yy HH:MM");
            }
            res.render(view, {
                obj: obj,
                form: form,
                param: param            
            });
        });
    });
};



exports.trantype_enter = function (req, res) {
    console.log('transtype_enter');
    var param = {};

    if (req.query.id) {
        console.log("edit");
        param.id = req.query.id;
        param.edit = true;
        param.copy = '';
        param.bg = global.bg[0]

    }
    else {
        console.log("create");
        param.edit = '';
        param.copy = '';
        param.bg = "Tomato"

    }
    enter(TrantypeForm,param, res);
};


exports.trantype_delete = function (req, res) {
    var  Trantype = mongoose.model('Trantype', TrantypeSchema);
    console.log('trantype delete');
    Trantype.findByIdAndDelete(req.body.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};


exports.trantype_copy = function (req, res) {
    console.log('trantype_copy');
    var param = {};

    if (req.query.id) {
        console.log("copy");
        param.id = req.query.id;
        param.edit = true;
        param.copy = true;
        param.bg = "MediumSpringGreen"

    }

    enter(TrantypeForm, param, res);
};

exports.trantype_create = function (req, res) {
    console.log('create trantype');
    var Trantype = mongoose.model('Trantype', TrantypeSchema);
    console.log(req.body.id);
    let subject = new Trantype(
        {
            ID: req.body.ID,
            name: req.body.name,
            value: req.body.value,
            icon: req.body.icon
        }
    );

    if (req.body.copy) {
        console.log("copy set");
        console.log(req.body.copy)
    }
    else {
        if (req.body.id) {
            Trantype.findByIdAndRemove(req.body.id, function (err) {
                if (err) return next(err);
                console.log("remove old")
            }

            )
        }
    }

    subject.save(function (err) {
        if (err) {
            return res.send(err);
        }
        res.redirect("/lib/trantype/list");

    })
};

exports.trantype_getByid = function (req, res) {
    var Trantype = mongoose.model('Trantype', TrantypeSchema);
    console.log('trantype_getByid');
    var query = { _id: req.body._id };
    console.log(query);
    Trantype.findOne(query, function (err, trantype) {
        //      if (err) return next(err);
        console.log(trantype);
        res.send(trantype)
    });
};



// *** subject

exports.subject_list = function (req, res) {
    var form = SubjectForm;
    var param = {};
    var view = form.entity+'_list';
    console.log(view);

    param.bg = global.bg[0]
    param.limits = global.limits;
;
    var Subject = mongoose.model('Subject', SubjectSchema);
    client.get("sFilter", function (err, reply) {
        var limit = { sort: { 'timestamp': -1 } }
        var query = {};
        if (reply) limit = { sort: { 'timestamp': -1 }, limit: parseInt(reply) }
        Subject.find(query, null, limit, function (err, obj) {
            if (err) return next(err);
            param.count=obj.length;
            for (var i = 0, len = param.count; i < len; i++) {
                obj[i].ti = dateFormat(obj[i].timestamp, "dd.mm.yy HH:MM");
            }
            res.render(view, {
                obj: obj,
                form: form,
                param: param
            }
            );
        });
    });
};



exports.subject_enter = function (req, res) {
    console.log('subject_enter');
    var param = {};

    if (req.query.id) {
        console.log("edit");
        param.id = req.query.id;
        param.edit = true;
        param.copy = '';
        param.bg = global.bg[0]

    }
    else {
        console.log("create");
        param.edit = '';
        param.copy = '';
        param.bg = "Tomato"

    }
    enter(SubjectForm,param, res);
};


exports.subject_copy = function (req, res) {
    console.log('copy subject');
    var param = {};

    if (req.query.id) {
        console.log("edit");
        param.id = req.query.id;
        param.edit = true;
        param.copy = true;
        param.bg = "MediumSpringGreen"

    }

    enter(SubjectForm,param, res);
};


exports.subject_create = function (req, res) {
    console.log('create subject');
    var Subject = mongoose.model('Subject', SubjectSchema);
    console.log(req.body.id);
    let subject = new Subject(
        {
            ID: req.body.ID,
            name: req.body.name,
            icon: req.body.icon
        }
    );

    if (req.body.copy) {
        console.log("copy set");
        console.log(req.body.copy)
    }
    else {
        if (req.body.id) {
            Subject.findByIdAndRemove(req.body.id, function (err) {
                if (err) return next(err);
                console.log("remove old")
            }

            )
        }
    }

    subject.save(function (err) {
        if (err) {
            return res.send(err);
        }
        res.redirect("/lib/subject/list");

    })
};


exports.subject_getByid = function (req, res) {
    var Subject = mongoose.model('Subject', SubjectSchema);
    console.log('subject_getByid');
    var query = { _id: req.body._id };
    console.log(query);
    Subject.findOne(query, function (err, subject) {
        //      if (err) return next(err);
        console.log(subject);
        res.send(subject)
    });
};

exports.subject_delete = function (req, res) {
    console.log('list delete');
    var Subject = mongoose.model('Subject', SubjectSchema);
    Subject.findByIdAndRemove(req.body.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};




// *** doctype


exports.doctype_list = function (req, res) {
    var param = {};
    var form = DoctypeForm;
    var view = form.entity+'_list';
    console.log(view);

    param.bg = global.bg[0]
    param.limits = global.limits;
    var Doctype = mongoose.model('Doctype', DoctypeSchema);
    client.get("sFilter", function (err, reply) {
        var limit = { sort: { 'timestamp': -1 } }
        var query = {};
        if (reply) limit = { sort: { 'timestamp': -1 }, limit: parseInt(reply) }
        Doctype.find(query, null, limit, function (err, obj) {
            if (err) return next(err);
            param.count=obj.length;
            for (var i = 0, len = param.count; i < len; i++) {
                obj[i].ti = dateFormat(obj[i].timestamp, "dd.mm.yy HH:MM");
            }
            res.render(view, {
                obj: obj,
                form: form,
                param: param            
            });
        });
    });
};



exports.doctype_enter = function (req, res) {
    console.log('enter doctype');
    var param = {};

    if (req.query.id) {
        console.log("edit");
        param.id = req.query.id;
        param.edit = true;
        param.copy = '';
        param.bg = global.bg[0]

    }
    else {
        console.log("create");
        param.edit = '';
        param.copy = '';
        param.bg = "Tomato"

    }
    enter(DoctypeForm,param, res);
};


exports.doctype_copy = function (req, res) {
    console.log('doctype_copy');
    var param = {};

    if (req.query.id) {
        console.log("edit");
        param.id = req.query.id;
        param.edit = true;
        param.copy = true;
        param.bg = "MediumSpringGreen"

    }

    enter(DoctypeForm,param, res);
};


exports.doctype_create = function (req, res) {
    console.log('create doctype');
    var Doctype = mongoose.model('Doctype', DoctypeSchema);
    console.log(req.body.id);
    let doctype = new Doctype(
        {
            ID: req.body.ID,
            name: req.body.name,
            icon: req.body.icon
        }
    );

    if (req.body.copy) {
        console.log("copy set");
        console.log(req.body.copy)
    }
    else {
        if (req.body.id) {
            Doctype.findByIdAndRemove(req.body.id, function (err) {
                if (err) return next(err);
                console.log("remove old")
            }

            )
        }
    }

    doctype.save(function (err) {
        if (err) {
            return res.send(err);
        }
        res.redirect("/lib/doctype/list");

    })
};


exports.doctype_getByid = function (req, res) {
    var Doctype = mongoose.model('Doctype', DoctypeSchema);
    console.log('doctype_getByid');
    var query = { _id: req.body._id };
    console.log(query);
    Doctype.findOne(query, function (err, doctype) {
        if (err) return next(err);
        console.log(doctype);
        res.send(doctype)
    });
};

exports.doctype_delete = function (req, res) {
    console.log('list delete');
    var Doctype = mongoose.model('Doctype', DoctypeSchema);
    Doctype.findByIdAndRemove(req.body.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};



// *** document

exports.document_list = function (req, res) {
    var form = DocumentForm;
    var param = {};
    param.bg = global.bg[0];
    param.limits = global.limits;

    console.log('list document');
    var Document = mongoose.model('Document', DocumentSchema);
    client.get("sFilter", function (err, reply) {
        var limit = { sort: { 'timestamp': -1 } }
        var query = {};
        if (reply) limit = { sort: { 'timestamp': -1 }, limit: parseInt(reply) }
        Document.find(query, null, limit, function (err, document) {
            if (err) return next(err);
            param.count=document.length;
            for (var i = 0, len = document.length; i < len; i++) {
                document[i].icon = 'glyphicon glyphicon-book';
                console.log(document[i].typ);
                console.log(global.doctype);
 //               document[i].icon = global.doctype[document[i].typ];
                document[i].ti = dateFormat(document[i].timestamp, "dd.mm.yy HH:MM");
            }

            res.render('document_list', {
                obj: document,
                form: form,
                param: param
            }
            );
        });
    });
};


exports.document_enter = function (req, res) {
    console.log('document_enter');
    var param = {};

    if (req.query.id) {
        console.log("edit");
        param.id = req.query.id;
        param.edit = true;
        param.copy = '';
        param.bg = global.bg[0]

    }
    else {
        console.log("create");
        param.edit = '';
        param.copy = '';
        param.bg = "Tomato"

    }
    enter(DocumentForm,param, res);
};



exports.document_copy = function (req, res) {
    console.log('copy document');
    var param = {};

    if (req.query.id) {
        console.log("edit");
        param.id = req.query.id;
        param.edit = true;
        param.copy = true;
        param.bg = "MediumSpringGreen"

    }

    enter(DocumentForm,param, res);
};


exports.document_create = function (req, res) {
    console.log('create document');
    var Document = mongoose.model('Document', DocumentSchema);
    console.log(req.body.id);
    console.log(req.body);
    let document = new Document(
        {
            ID: req.body.ID,
            name: req.body.name,
            typ: req.body.typ,
            link: req.body.link,
            enabled: req.body.enabled
        }
    );

    if (req.body.copy) {
        console.log("copy set");
        console.log(req.body.copy)
    }
    else {
        if (req.body.id) {
            Document.findByIdAndRemove(req.body.id, function (err) {
                if (err) return next(err);
                console.log("remove old")
            }

            )
        }
    }

    document.save(function (err) {
        if (err) {
            return res.send(err);
        }
        res.redirect("/lib/document/list");
    })
};


exports.document_getByid = function (req, res) {
    var Document = mongoose.model('Document', DocumentSchema);
    console.log('document_getByid');
    var query = { _id: req.body._id };
    console.log(query);
    Document.findOne(query, function (err, document) {
        //      if (err) return next(err);
        console.log(document);
        res.send(document)
    });
};

exports.document_delete = function (req, res) {
    console.log('list delete');
    var Document = mongoose.model('Document', DocumentSchema);
    Document.findByIdAndRemove(req.body.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};



// *** Teacher

exports.teacher_list = function (req, res) {
    console.log('list teacher');
    var Teacher = mongoose.model('Teacher', TeacherSchema);
    var form = TeacherForm;
    var param = {};
    param.limits = global.limits;
    param.bg = global.bg[0];
    client.get("sFilter", function (err, reply) {
        var limit = { sort: { 'timestamp': -1 } }
        var query = {};
        if (reply) limit = { sort: { 'timestamp': -1 }, limit: parseInt(reply) }
        Teacher.find(query, null, limit, function (err, teacher) {
            if (err) return next(err);
            param.count=teacher.length;
            for (var i = 0, len = teacher.length; i < len; i++) {
                if (teacher[i].enabled == 'true') teacher[i].checked = 'checked'; else teacher[i].checked = 'unchecked';
                teacher[i].ti = dateFormat(teacher[i].timestamp, "dd.mm HH:MM");
                if (!teacher[i].avatar) teacher[i].avatar = 1;
            }
            res.render('teacher_list', {
                obj: teacher,
                form: form,
                param: param
            }
            );
        });
    });
};


exports.teacher_enter = function (req, res) {
    console.log('teacher_enter');
    var param = {};

    if (req.query.id) {
        console.log("edit");
        param.id = req.query.id;
        param.edit = true;
        param.copy = '';
        param.bg = global.bg[0]

    }
    else {
        console.log("create");
        param.edit = '';
        param.copy = '';
        param.bg = "Tomato"

    }
    enter(TeacherForm,param, res);
};


exports.teacher_copy = function (req, res) {
    console.log('copy teacher');
    var param = {};

    if (req.query.id) {
        console.log("edit");
        param.id = req.query.id;
        param.edit = true;
        param.copy = true;
        param.bg = "MediumSpringGreen"

    }
    enter(TeacherForm,param, res);
};


exports.teacher_create = function (req, res) {
    console.log('create teacher');
    var Teacher = mongoose.model('Teacher', TeacherSchema);
    console.log(req.body.id);
    let teacher = new Teacher(
        {
            ID: req.body.ID,
            name: req.body.name,
            surname: req.body.surname,
            enabled: req.body.enabled,
            avatar: req.body.avatar
        }
    );

    if (req.body.copy) { }
    else {
        if (req.body.id) {
            Teacher.findByIdAndRemove(req.body.id, function (err) {
                if (err) return next(err);
                console.log("copy")
            }

            )
        }
    }
    teacher.save(function (err) {
        if (err) {
            return res.send(err);
        }
        res.redirect("/lib/teacher/list");

    })
};



exports.teacher_getByid = function (req, res) {
    var Teacher = mongoose.model('Teacher', TeacherSchema);
    console.log('teacher_getByid');
    var query = { _id: req.body._id };
    console.log(query);
    Teacher.findOne(query, function (err, teacher) {
        //      if (err) return next(err);
        console.log(teacher);
        res.send(teacher)
    });
};

exports.teacher_delete = function (req, res) {
    console.log('list teacher');
    var Teacher = mongoose.model('Teacher', TeacherSchema);
    Teacher.findByIdAndRemove(req.body.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

// --Transaction

exports.transaction_list = function (req, res, callback) {

    console.log('list transaction');
    var Transaction = mongoose.model('Transaction', TransactionSchema);
    var Book = mongoose.model('Book', BookSchema);
    var form = TransactionForm;
    var param = {};
    param.limits = global.limits;
    param.bg = global.bg[0];
    client.get("sFilter", function (err, reply) {
        var limit = { sort: { 'timestamp': -1 } }
        var query = {};
        var tra = [];
        if (req.query.BID)  {
            query = { BID: req.query.BID }
            form.query = '?BID='+req.query.BID;
            console.log(form.query);
        }
        if (req.query.LID) {
            query = { LID: req.query.LID }
            form.query = '?LID='+req.query.LID;
            console.log(form.query);
        }
        if (reply) limit = { sort: { 'timestamp': -1 }, limit: parseInt(reply) }
        Transaction.find(query, null, limit, function (err, transaction) {
            if (err) return next(err);
            param.count=transaction.length;
            for (var i = 0, len = param.count; i < len; i++) {
                transaction[i].ti = dateFormat(transaction[i].timestamp, "dd.mm.yy HH:MM");
                if (form.dict[transaction[i].TID]) transaction[i].TID = form.dict[transaction[i].TID];
            }

            res.render('transaction_list', {
                obj: transaction,
                form: form,
                param: param
            }
            );
        });

    });

};



function getName(key) {
    client.get(key, function (err, reply) {
        return reply;
    });
}



exports.transaction_create = function (req, res) {
    console.log('create transaction');
    var Transaction = mongoose.model('Transaction', TransactionSchema);
    console.log(req.body.id);

    let transaction = new Transaction(
        {
            LID: req.body.LID.split(" ")[0],
            TID: req.body.TID.split(" ")[0],
            CID: req.body.CID,
            BID: req.body.BID.split(" ")[0],
            value: req.body.value,
            enabled: req.body.enabled
        }
    );
    console.log(transaction);

    if (req.body.copy) {
        console.log("copy set");
        console.log(req.body.copy)
    }
    else {
        if (req.body.id) {
            Transaction.findByIdAndRemove(req.body.id, function (err) {
                if (err) return next(err);
                console.log("tran edit")
            }

            )
        }
    }
    transaction.save(function (err) {
        if (err) {
            return res.send(err);
        }
        res.redirect("/lib/transaction/list");

    })
};

exports.transaction_enter = function (req, res) {
    console.log('enter transaction');
    var param = {};

    if (req.query.id) {
        console.log("edit");
        param.id = req.query.id;
        param.edit = true;
        param.copy = '';
        param.bg = global.bg[0]

    }
    else {
        console.log("create");
        param.edit = '';
        param.copy = '';
        param.bg = "Tomato"

    }
    enter_transaction(param, res);
};

exports.transaction_copy = function (req, res) {

    console.log(req.query.id);
    var param = {};

    if (req.query.id) {
        console.log("copy");
        param.id = req.query.id;
        param.copy = true;
        param.edit = false;
        param.bg = "MediumSpringGreen";
    }
    console.log("render transaction_enter");
    enter_transaction(param, res);

};


exports.transaction_getByid = function (req, res) {
    var Transaction = mongoose.model('Transaction', TransactionSchema);
    console.log('transaction_getByid');
    var query = { _id: req.body._id };
    console.log(query);
    Transaction.findOne(query, function (err, transaction) {
        if (err) return next(err);
//        console.log(transaction);
        res.send(transaction)
    });
};

exports.transaction_delete = function (req, res) {
    console.log('list transaction');
    var Transaction = mongoose.model('Transaction', TransactionSchema);
    Transaction.findByIdAndRemove(req.body.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

exports.redis_set = function (req, res) {
    console.log('key:' + req.body.key);
    console.log('value:' + req.body.value);
    client.set(req.body.key, req.body.value, redis.print);
    res.send('OK');


};

exports.redis_get = function (req, res) {
    client.get(req.query.key, function (err, reply) {
        //       console.log(req.query.key+" : " + reply);
        res.send(reply);
    });
};

exports.redis_refresh = function (req, res) {
    var Teacher = mongoose.model('Teacher', TeacherSchema);
    Teacher.find({}, function (err, teacher) {
        if (err) return next(err);
        var sk = "LID";
        var value;
        for (var i = 0, len = teacher.length; i < len; i++) {
            key = sk + teacher[i].ID;
            value = teacher[i].name + ' ' + teacher[i].surname;
            console.log(key + ': ' + value);
            client.set(key, value, redis.print);
        }
    });
    var Book = mongoose.model('Book', BookSchema);
    Book.find({}, function (err, book) {
        if (err) return next(err);
        var sk = "BID";
        var value;
        for (var i = 0, len = book.length; i < len; i++) {
            key = sk + book[i].ID;
            value = book[i].name;
            console.log(key + ': ' + value);
            client.set(key, value, redis.print);
        }
    });

    var Trantype = mongoose.model('Trantype', TrantypeSchema);
    Trantype.find({}, function (err, trantype) {
        if (err) return next(err);
        var sk = "TID";
        var value;
        for (var i = 0, len = trantype.length; i < len; i++) {
            key = sk + trantype[i].ID;
            value = trantype[i].name
            console.log(key + ': ' + value);
            client.set(key, value, redis.print);
        }
    });

    res.send('OK');

};