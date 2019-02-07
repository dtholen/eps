/**
 * Main Express router
 */
var express = require('express'),
  controllers = require('require-dir-all')('../controllers'),
  basicAuth = require('express-basic-auth'),
  validation = require('require-dir-all')('../controllers/validation'),
  sprintf = require("sprintf-js").sprintf,
  store = require('store');


  exports.indexRouterLibrary = function () {
    var indexRouter = express.Router();
    indexRouter.route('/config/entity')
        .get(controllers.entity)
        .post(controllers.entity)
    indexRouter.route('/config/teacher')
        .get(controllers.teacher)
        .post(controllers.teacher)
    indexRouter.route('/stop')
        .get(controllers.stop);
    indexRouter.route('/library')
        .get(controllers.library)
        .post(controllers.library)
    indexRouter.route('/init')
        .get(controllers.init_library);
    indexRouter.route('/reload')
        .get(controllers.reload_transactions);
    indexRouter.route('/config/subject')
        .get(controllers.subject)
        .post(controllers.subject)
    indexRouter.route('/config/book')
        .get(controllers.book)
        .post(controllers.book)
    indexRouter.route('/config/trantype')
        .get(controllers.trantype)
        .post(controllers.trantype)
    indexRouter.route('/config/entry')
        .get(controllers.entry)
        .post(controllers.entry)
    indexRouter.route('/transaction')
        .get(controllers.transaction)
        .post(controllers.transaction)
    indexRouter.route('/transaction/create')
        .get(controllers.transaction_c)
        .post(controllers.transaction_c)
    indexRouter.route('/maintain/export')
        .get(controllers.export)
        .post(controllers.export)
    indexRouter.route('/validate')
        .get(controllers.validate);
    indexRouter.route('/log')
        .get(controllers.log);
    indexRouter.route('/')
        .get(controllers.home);
    indexRouter.route('/*')
        .get(controllers.access);

    return indexRouter;
  };


exports.indexRouter = function () {
  /**
   * the new Router exposed in express 4
   * the indexRouter handles all requests to the `/` path
   */
  var indexRouter = express.Router();
  /**
   * this accepts all request methods to the `/` path
   */

  indexRouter.route('/')
    .get(controllers.events_monitor);
  indexRouter.route('/qr*')
    .get(controllers.qr);
  indexRouter.route('/events/monitor')
    .get(controllers.events_monitor);
  indexRouter.route('/events')
    .post(controllers.events);
  indexRouter.route('/device_status')
    .post(controllers.device_status);
  indexRouter.route('/device_time')
    .get(controllers.device_time);
  indexRouter.route('/battery')
    .get(controllers.battery);
  indexRouter.route('/switch')
    .get(controllers.switch);
  indexRouter.route('/temp')
    .get(controllers.temp);
  indexRouter.route('/alexa/message')
      .get(controllers.message);
  indexRouter.route('/alexa/temperature')
      .get(controllers.temperature);
  indexRouter.route('/stop')
      .get(controllers.stop);
  indexRouter.route('/baro')
    .get(controllers.baro);
  indexRouter.route('/chart')
    .get(controllers.chart);
  indexRouter.route('/chart_time')
    .get(controllers.chart_time);
  indexRouter.route('/device')
    .get(controllers.device)
    .post(controllers.device)
  indexRouter.route('/hum')
    .get(controllers.hum);
  indexRouter.route('/state')
    .get(controllers.state);
  indexRouter.route('/act')
    .get(controllers.act);
  indexRouter.route('/mqtt/create')
    .post(controllers.mqtt_create);
  indexRouter.route('/events/home')
    .get(controllers.AODB_home);
  indexRouter.route('/init')
    .get(controllers.init);
  indexRouter.route('/se/:text')
    .get(controllers.service_use)
  indexRouter.route('/service/home')
    .get(controllers.service_home)
  indexRouter.route('/service/create')
    .get(controllers.service_create)
  indexRouter.route('/pilots/myticket')
    .get(controllers.myticket)
  indexRouter.route('/pilots/home')
    .get(controllers.pilots_home)
  indexRouter.route('/pilots/myflights')
    .get(controllers.myflights);
  indexRouter.route('/pilots/ppr')
    .get(controllers.pilots_ppr)
    .post(controllers.pilots_ppr);
  indexRouter.route('/reset')
    .get(function (req, res) {
      req.session.destroy();
      res.redirect('/');
  });


  return indexRouter;
};

exports.indexRouterAlexa = function () {
  /**
   * the new Router exposed in express 4
   * the indexRouter handles all requests to the `/` path
   */
  var indexRouter = express.Router();
  /**
   * this accepts all request methods to the `/` path
   */

  indexRouter.route('/alexa/message')
      .get(controllers.message);
  indexRouter.route('/alexa/temperature')
      .get(controllers.temperature);
  indexRouter.route('/stop')
      .get(controllers.stop);
  indexRouter.route('/*')
      .get(controllers.access);
  return indexRouter;
};
