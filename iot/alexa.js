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
  var d = new Date();
  var uxt = d/1000 | 0;
  })


global.showConfig();
var port = process.env.PORT || env.server.port;
app.listen(port);
console.log('Express server listening on port '+port);
app.engine('hbs', hbs.express3());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app
  .use(compress())
  .use(favicon(path.join(__dirname,'public','images','favicon.ico')))
  .use(logger('dev'))
  .use(helmet())
  /*
  .use(basicAuth({
      users: { 'ha': 'desk' },
      challenge: true,
      realm: 'Imb4T3st4pp'
  }))
  */
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
  .use(routes.indexRouterAlexa())
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




https.createServer(options, app).listen(env.server.sslport, function () {
  console.log('Express server listening on port '+env.server.sslport);
});
