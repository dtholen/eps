const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const redis = require("redis");
var dateFormat = require('dateformat');
const client = redis.createClient();
const fs = require('fs');
const carbone = require('carbone');
const http = require('http');


var TeacherSchema = new Schema({
    ID: { type: String },
    name: { type: String },
    surname: { type: String },
    enabled: { type: Boolean },
    avatar: { type: String },
    timestamp: { type: Date, default: Date.now }
});

var teacher = {};

var Teacher = mongoose.model('Teacher', TeacherSchema);
Teacher.find({}, function (err, teacher) {
    for (var i = 0, len = teacher.length; i < len; i++) {
        tea[teacher.ID]= teacher.name+' '+teacher.surnam;
  
    }
});


var globals = {
  teacher: teacher
}
console.log(globals.basedir);
module.exports = globals;
