module.exports = function (req, res) {
    res.status(404);
    res.send('404: Page not Found', 404);
}
