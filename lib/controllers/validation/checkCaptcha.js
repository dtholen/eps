/**
 * Compare captcha.
 */

module.exports = function (req, res) {

  if (req.body.captcha_code === req.session.captcha) {
    res.send('true');
  } else {
    res.send('false');
  }
};
