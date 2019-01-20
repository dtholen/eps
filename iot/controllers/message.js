module.exports = function (req, res) {
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify({message: "Das ist eine Nachricht"}));
}
