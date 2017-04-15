/**
 * Sets up start (main)page for rendering.
 */
qr = require('qr-image');
module.exports = function (req, res) {
  console.log(JSON.stringify(req.params[0]));
  var code = qr.image(req.params[0], { type: 'png', ec_level: 'H', size: 10, margin: 0 });
  res.setHeader('Content-type', 'image/png');
  code.pipe(res);
}
