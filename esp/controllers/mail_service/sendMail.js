/**
 * Create custom field in killbill table. Username password for account. This field will be used for authorization
 */
var unirest = require('unirest');
var constant = require('../utils/globalVars');

module.exports = function (req, userEmail, subject, data, cbresult) {

  var mshost = req.app.get('mshost'),
    msport = req.app.get('msport'),
    mssecurityToken = req.app.get('mssecurityToken');

  var resturl = 'http://' + mshost + ':' + msport + '/mail';

  console.log('Calling ' + resturl);
  unirest.post(resturl)
    .headers({
      'Content-Type': 'application/json',
      'SecurityToken': mssecurityToken
    })
    .send(
      {
        'sender': 'ot-cloud-billing@gmx.de',
        'recipient': userEmail,
        'subject': subject,
        'text': data
      })
    .end(function (response) {
      switch (response.code) {
        case 200: //Custom field created
          console.log('Message was sent to: ' + userEmail + ' successfully');
          cbresult(null, response.code);
          break;
        default:
          console.log('Response: ' + JSON.stringify(response.body) + 'ResponseCode: ' + response.code);
          cbresult(new Error(constant.ERRORMESSAGE_SENDMAIL), null);
          break;
      }
    });
};
