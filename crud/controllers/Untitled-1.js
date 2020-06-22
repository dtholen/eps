// *** doctype

exports.subject_list = function (req, res) {
    const form = {
        "title": "Dokumenten Typ",
        "entity": "doctype",
        "link": "/lib/doctype/list",
        "bg": "BurlyWood",
        "limits":
            [
                { "lable": "5" },
                { "lable": "10" },
                { "lable": "25" },
                { "lable": "100" },
            ],
        "fields":
            [
                { "field": "ID", "lable": "ID", "type": "text" },
                { "field": "name", "lable": "Name", "type": "text" },
                { "field": "icon", "lable": "icon", "type": "text" }
            ]
    }
    console.log('list doctype');
    var Doctype = mongoose.model('Doctype', SubjectSchema);
    client.get("sFilter", function (err, reply) {
        var limit = { sort: { 'timestamp': -1 } }
        var query = {};
        if (reply) limit = { sort: { 'timestamp': -1 }, limit: parseInt(reply) }
        Doctype.find(query, null, limit, function (err, doctype) {
            if (err) return next(err);
            res.render('subject_list', {
                obj: doctype,
                form: form
            }
            );
        });
    });
};


exports.subject_enter = function (req, res) {
    console.log('enter doctype');
    var param = {};

    if (req.query.id) {
        console.log("edit");
        param.id = req.query.id;
        param.edit = true;
        param.copy = '';
        param.bg = "BurlyWood"

    }
    else {
        console.log("create");
        param.edit = '';
        param.copy = '';
        param.bg = "Tomato"

    }
    enter_subject(param, res);
};


exports.subject_copy = function (req, res) {
    console.log('copy doctype');
    var param = {};

    if (req.query.id) {
        console.log("edit");
        param.id = req.query.id;
        param.edit = true;
        param.copy = true;
        param.bg = "MediumSpringGreen"

    }

    enter_subject(param, res);
};


exports.subject_create = function (req, res) {
    console.log('create doctype');
    var Doctype = mongoose.model('Doctype', SubjectSchema);
    console.log(req.body.id);
    let doctype = new Doctype(
        {
            ID: req.body.ID,
            name: req.body.name,
            icon: rep.body.icon
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
