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
    indexRouter.route('/maintain/backup')
        .get(controllers.backup);
    indexRouter.route('/log')
        .get(controllers.log)
    indexRouter.route('/test')
        .get(controllers.test)
        .post(controllers.test)
    indexRouter.route('/')
        .get(controllers.home)
    indexRouter.route('/*')
        .get(controllers.access)

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
