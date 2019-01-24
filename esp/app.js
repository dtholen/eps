'use strict';
/**
 * Module dependencies.
 */


var express = require('express'),
  session = require('express-session'),
  path = require('path'),
  //mongoose       = require('mongoose'),
  hbs = require('express-hbs'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  compress = require('compression'),
  favicon = require('serve-favicon'),
  methodOverride = require('method-override'),
  errorHandler = require('errorhandler'),
  routes = require('./routes'),
  flash = require('connect-flash'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  expressValidator = require('express-validator'),
  fs = require('fs'),
  https = require('https'),
  mqtt = require('mqtt'),
  sprintf = require("sprintf-js").sprintf,
  helmet = require('helmet'),
  basicAuth = require('express-basic-auth'),
  FileStore = require('session-file-store')(session);


  // all global definitions including Database connects
global = require('./config/globals');
var env = global.config.demo;
env.mqtt.client=mqtt.connect(env.mqtt.url);
var app = express();
var sess;

var options = {
  key: fs.readFileSync('ssl/certificate.key'),
  cert: fs.readFileSync('ssl/certificate.crt')
};


hbs.registerHelper('ifvalue', function (conditional, options) {
  if (options.hash.value === conditional) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper('select', function (value, options) {
  return options.fn(this)
    .split('\n')
    .map(function (v) {
      var t = 'value="' + value + '"';
      return !new RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"');
    })
    .join('\n');
});

hbs.registerHelper("log", function(something) {
    return console.log(something);
});

hbs.registerHelper('json', function (content) {
    return JSON.stringify(content);
});

module.exports = app; // for testing

function topicSubscribe(element, index, array) {
    env.mqtt.client.subscribe(element)
}

function logErrors(err) {
  console.log(err);
  console.log(global.nok);
}

function DisplayTime(timestamp) {
    var d = new Date(timestamp*1000);
    var t = sprintf("%02d:%02d:%02d",d.getHours(),d.getMinutes(),d.getSeconds());
    return t;
}


  env.mqtt.client.on('connect', function () {
  env.mqtt.topics.forEach(topicSubscribe);

  var type = global.evt[0];
  var d = new Date();
  var uxt = d/1000 | 0;
//  var con = {"NR":"000", "ID":"HA","type":type,"time":uxt }
//  env.mqtt.client.publish(topic,JSON.stringify(con))
  })

env.mqtt.client.on('message', function (topic, message) {
  // message is Buffer
  console.log(topic+"\t->\t"+message);
  var d = new Date();
  var uxt = d/1000 | 0;
  var jm=JSON.parse(message);
  var collection = global.db.get('events');
  if (jm.time < 10000) {
    jm.time = uxt;
    if (jm.type=='TIME') jm.value=DisplayTime(jm.time);
  } // tim correction
  jm.state= global.state[0]._id;
  jm.ti = DisplayTime(jm.time);
  if (jm.type=="mesured-temperature:") jm.type="TEMP";
  if (jm.type=="temperature:") jm.type="TEMP";
  if (jm.type=="actuator:") jm.type="ACTOR";
  if (jm.type=="battery:") jm.type="BAT";
  if (jm.type=="warnings:") jm.type="WARN";


  collection.insert(jm,
      function (err, doc) {
        if (err) logErrors(err)
      else {
        var device = global.db.get('device');
        device.findOne({ID: doc.ID}, function(err, document) {
//          console.log(doc.type);
//          console.log(document.type);
          var device_type = global.db.get('device_type');
          device_type.findOne({ID: document.type}, function(err, document_type) {
//        console.log(document_type.lable);
          });
        });
        var device = global.db.get('device');
        device.update({ID:doc.ID}, {$set:{time:doc.time, ti: jm.ti, msg_type: jm.type, value:doc.value}}, function(err, result) {
            if (err) logErrors(err)
        });
        switch(doc.type) {
          case "CONNECT":
              var device = global.db.get('device');
              device.update({ID:doc.ID}, {$set:{time: doc.time,ti: jm.ti, MAC:doc.value}}, function(err, result) {
                  if (err) logErrors(err)
              });
              break;
          case "HUM":
          case "BARO":
          case "ERROR":
          case "TEMP":
          case "BAT":
          case "STATE":
          case "ACTOR":
          case "TIME":
          case "VAR":
              var device = global.db.get('device_status');
              device.update({ID:doc.ID, type:doc.type}, {$set:{time:doc.time, ti: jm.ti, value:doc.value}}, function(err, result) {
                  if (err) logErrors(err)
              });
              break;
          default:
            ;
            }
      }
  });
})

global.showConfig();
var port = process.env.PORT || env.server.port;
app.listen(port);
app.engine('hbs', hbs.express3());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app
  .use(compress())
  .use(favicon(path.join(__dirname,'public','images','favicon.ico')))
  .use(logger('dev'))
  .use(helmet())
  .use(basicAuth({
      users: { 'ha': 'desk' },
      challenge: true,
      realm: 'Imb4T3st4pp'
  }))
  .use(session({secret: 'keyboard cat',
                   saveUninitialized: true,
                   store: new FileStore,
                   resave: true}))

  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true  }))
  .use(expressValidator())  //required for Express-Validator
  .use(methodOverride())
  .use(express.static(path.join(__dirname, 'public')))
  .use(flash()) // use connect-flash for flash messages stored in session
  .use(routes.indexRouter())
  .use(function (req, res) {
    res.status(404).render('404', {title: 'Not Found :('});
  });

  var sess;
  function logErrors(err, req, res, next) {
    console.error(err.message);
    next(err);
  }

  function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
      //send response to client withh HTTP 500 error code
      res.status(500).send(err.message);
    } else {
      console.error(err.stack);
      res.render('404', {title: err.message});
    }
  }

  app.use(logErrors);
app.use(clientErrorHandler);

if (app.get('env') === 'development') {
  app.use(errorHandler());
}

https.createServer(options, app).listen(app.get('port'), function () {
  console.log('Express server listening on port '+port);
});
