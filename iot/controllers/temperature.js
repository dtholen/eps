module.exports = function (req, res) {
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify({message: "Die aktuelle Temperatur im Wohnzimmer ist 21 Grad"}));
}
