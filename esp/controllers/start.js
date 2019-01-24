/**
 * Sets up start (main)page for rendering.
 */
module.exports = function (req, res) {
  res.render('start', {
    title: 'HA Desk - Home'
  });
};
