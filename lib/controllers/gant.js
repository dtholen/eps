  sprintf = require("sprintf-js").sprintf;
  global = require('../config/globals');
  var form = require('../config/form/gant');
  module.exports = function (req, res) {
    res.render(form.entity, {
        refresh: false,
        form: form
      });
  }
