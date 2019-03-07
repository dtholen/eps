'use strict';

// New Code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/library');

var config = {
  demo: {
    server: {
      port: 80,
      sslport: 443
    },
    mqtt: {
      url: 'mqtt://localhost',
      topics: ["sensor/#", "actor/#"]
    },
    mail_service: {
      host: '127.0.0.1',
      port: '8000',
      securityToken: '318ej382n!?2f'
    }
  },
  showConfig: function() {
    console.log(global.demo);
  }
};


var bg = {};
var teacher = {};
var book = {};
var entity = {};
var sid = {};
var subject = {};
var tx={};
var tt={};
var query;
var collection;
query = {};


collection = db.get('background');
collection.find(query, function(e, docs) {
  for (var i = 0, len = docs.length; i < len; i++) bg[docs[i]._id] = docs[i].value;
})


collection = db.get('teacher');
collection.find(query, function(e, docs) {
  for (var i = 0, len = docs.length; i < len; i++) {
    teacher[docs[i].ID] = docs[i].name + " " + docs[i].surname;
    tt[docs[i].ID] = {ID: docs[i].ID, name: docs[i].name, suename: docs[i].surname, gender: docs[i].gender };
  }
})

collection = db.get('book');
collection.find({enabled: 'true'}, function(e, docs) {
  for (var i = 0, len = docs.length; i < len; i++) {
    book[docs[i].ID] = docs[i].name;
  }
})


collection = db.get('subject');
collection.find({}, function(e, docs) {
  for (var i = 0, len = docs.length; i < len; i++) {
    subject[docs[i].ID] = {ID: docs[i].ID, name: docs[i].name };
  }
})

collection = db.get('entity');
collection.find({}, function(e, docs) {
  for (var i = 0, len = docs.length; i < len; i++) {
    entity[i] = docs[i].name
  }
})

collection = db.get('trantype');
collection.find({}, function(e, docs) {
  for (var i = 0, len = docs.length; i < len; i++) {
    tx[docs[i].ID] = {ID:docs[i].ID, name: docs[i].name, value:docs[i].value , icon: docs[i].icon };
  }
})

var globals = {
  'basedir' : __dirname.substring(0, __dirname.indexOf('/config')),
  'message': 'Configuration',
  'version': '0.2',
  'db': db,
  'mongo': mongo,
  // evt: ['CONNECT','STANDBY','VAR','TIME','TIMER','BARO','HUM','SWITCH','STATE','BAT','ACTOR','TEMP','DEL','VAR','ERROR'],
  // evt_billable: [],
  ok: {
    'message': 'OK'
  },
  nok: {
    'message': 'Not OK'
  },
  valid: false,
  config: config,
  bg: bg,
  entity: entity,
  subject: subject,
  teacher: teacher,
  book: book,
  tx: tx,
  showConfig: function() {
    console.log(global.message + ' Version: ' + this.version);
  },
}
console.log(globals.basedir);
module.exports = globals;
