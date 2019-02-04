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


var keyval = {};
var desc = {};
var bg = {};
var teacher = {};
var book = {};
var entity = {};
var trantype = {};
var sid = {};
var subject = {};
var ttsign = {};
var device_lable = {};
var collection = db.get('keyval');
var query;
query = {};

collection.find(query, function(e, docs) {
  for (var i = 0, len = docs.length; i < len; i++) {
    keyval[docs[i]._id] = docs[i].value;
    desc[docs[i]._id] = docs[i].desc;
  }
})

collection = db.get('background');
collection.find(query, function(e, docs) {
  for (var i = 0, len = docs.length; i < len; i++) bg[docs[i]._id] = docs[i].value;
})

collection = db.get('device');
collection.find(query, function(e, docs) {
  for (var i = 0, len = docs.length; i < len; i++) device_lable[docs[i]._id] = docs[i].lable;
})
collection = db.get('teacher');
collection.find(query, function(e, docs) {
  for (var i = 0, len = docs.length; i < len; i++) {
    teacher[docs[i].ID] = docs[i].ID + ":" + docs[i].name + " " + docs[i].surename;
  }
})

collection = db.get('book');
collection.find(query, function(e, docs) {
  for (var i = 0, len = docs.length; i < len; i++) {
    book[docs[i].ID] = docs[i].ID + ": " + docs[i].name;
  }
})


collection = db.get('subject');
collection.find(query, function(e, docs) {
  for (var i = 0, len = docs.length; i < len; i++) {
    subject[docs[i].ID] = docs[i].name;
    sid[i] = docs[i];
  }
})

collection = db.get('entity');
collection.find(query, function(e, docs) {
  for (var i = 0, len = docs.length; i < len; i++) {
    entity[i] = docs[i].name
  }
})

collection = db.get('trantype');
collection.find(query, function(e, docs) {
  for (var i = 0, len = docs.length; i < len; i++) {
    trantype[docs[i].ID] = docs[i].name;
    ttsign[[docs[i].ID]] = docs[i].value;
  }
})


var globals = {
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
  keyval: keyval,
  desc: desc,
  bg: bg,
  entity: entity,
  subject: subject,
  sid: sid,
  teacher: teacher,
  book: book,
  trantype: trantype,
  ttsign: ttsign,
  device_lable: device_lable,
  showConfig: function() {
    console.log(global.message + ' Version: ' + this.version);
  },
}
module.exports = globals;
