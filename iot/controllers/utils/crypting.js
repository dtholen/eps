/**
 * NodeJs encryption using constant password and algorithm values
 */
var crypto = require('crypto'),
  algorithm = 'aes-256-ctr',
  password = 'd6F3Efeq';

module.exports = {
  encrypt: function (text) {
    var cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  },
  decrypt: function (text) {
    var decipher = crypto.createDecipher(algorithm, password);
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  },
  emailToken: function () {
    var token = crypto.randomBytes(16).toString('hex');
    return token;
  },
  resetPasswordToken: function () {
    var token = crypto.randomBytes(32).toString('hex');
    return token;
  }
};
