/**
 * Class to store user information
 */
function User(username, password, json) {
  this.username       = username;
  this.password       = password;
  this.authenticated  = json.isAuthenticated;
  this.remembered     = json.isRemembered;
  this.accountId      = json.accountId;
}

module.exports = User;
