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
  favicon = require('static-favicon'),
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
  qr = require('qr-image');

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

  var topic = env.mqtt.topics[0];
  var d = new Date();
  var uxt = d/1000;
  var con = {"id":"000000", "tenantID":"MUC","accountExternalKey":"GAT","eventType":"connect","timestamp":uxt }
  env.mqtt.client.publish(topic,JSON.stringify(con))
  })

env.mqtt.client.on('message', function (topic, message) {
  // message is Buffer
  console.log(topic+"\t->\t"+message);
  var jm=JSON.parse(message);
  var collection = global.db.get('events');
  jm.state= global.state[0]._id;
  jm.ti = DisplayTime(jm.timestamp);
  collection.insert(jm,
      function (err, doc) {
        if (err) logErrors(err)
      else {

        switch(doc.eventType) {
          case "PPR":
              var ppr = global.db.get('ppr');
              var obj = {
              "registration": doc.accountExternalKey,
              "eda": doc.data.eda,
              "eta": doc.data.eta,
              "name": doc.data.name,
              "value": doc.data.ptype,
              "timestamp": doc.timestamp,
              "state": global.state[0]._id,
              "time": DisplayTime(jm.timestamp),
              "eventType": doc.eventType,
              "passenger": doc.data.passenger,
              "address": doc.data.address,
              "email": doc.data.email }

// console.log(obj);

              ppr.insert(obj,
                function (err, doc) {
                if (err) logErrors(err);
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
  .use(favicon())
  .use(logger('dev'))
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
