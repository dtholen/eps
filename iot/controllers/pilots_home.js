/**
 * Sets up start (main)page for rendering.
 */
module.exports = function (req, res) {
  res.render('pilots_home', {
    title: 'Welcome to Munich Airport',
    intro: 'You can register your flight themselves and thus simplify the handling at the GAT. Thank you for your contribition'
  });
};
