/**
 * Main Express router
 */
var express = require('express'),
  controllers = require('require-dir-all')('../controllers'),
  validation = require('require-dir-all')('../controllers/validation'),
  sprintf = require("sprintf-js").sprintf,
  store = require('store');


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
  indexRouter.route('/device_time')
    .get(controllers.device_time);
  indexRouter.route('/battery')
    .get(controllers.battery);
  indexRouter.route('/switch')
    .get(controllers.switch);
  indexRouter.route('/temp')
    .get(controllers.temp);
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
