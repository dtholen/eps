/**
 * Main Express router
 */
var express = require('express'),
  controllers = require('require-dir-all')('../controllers'),
  validation = require('require-dir-all')('../controllers/validation'),
  sprintf = require("sprintf-js").sprintf;


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
    .get(controllers.start);
  indexRouter.route('/qr*')
    .get(controllers.qr);
  indexRouter.route('/events/monitor')
    .get(controllers.events_monitor);
  indexRouter.route('/test')
    .get(controllers.sandbox);
  indexRouter.route('/expected/ppr')
    .get(controllers.expected_ppr);
  indexRouter.route('/events/create')
    .get(controllers.events_create)
    .post(controllers.events_create);
  indexRouter.route('/events/home')
    .get(controllers.AODB_home);
  indexRouter.route('/events/edit')
    .get(controllers.events_edit);
  indexRouter.route('/events/drop')
    .get(controllers.eventsD);
  indexRouter.route('/subscribe')
    .get(controllers.subscribe);
  indexRouter.route('/aircraft')
    .get(controllers.aircraft)
    .post(controllers.aircraft);
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
  indexRouter.route('/aircrafttype')
    .get(controllers.aircrafttype)
    .post(controllers.aircrafttype);
  indexRouter.route('/logout')
    .get(function (req, res) {
      req.logout();
      res.redirect('/');
    });

  return indexRouter;
};
