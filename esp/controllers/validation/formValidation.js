/**
 * Validate all input fields according predefined rules and escape all speciall characters for acrossing xss
 */
module.exports = {


  validate: function (req, cbresult) {

    //sanitize body
    var sanitizedBody = {};

    //Input fields validation and sanitize body
    if (req.body.username){
      req.assert('username', 'username is required').notEmpty(); //Validate username
      sanitizedBody.username = req.sanitizeBody('username').escape();
    }
    if (req.body.email) {
      req.assert('email', 'email is invalid').isEmail(); // Email validation
      sanitizedBody.email=req.sanitizeBody('email').escape();
    }
    if (req.body.password&&req.body.confirmPassword) {
      req.assert('password', 'password too short. Must be 6 characters or more').matches(/^[A-Za-z0-9\d=!\-@._*]*$/); // Password validation
      req.assert('password', 'passwords do not match').equals(req.body.confirmPassword); // confirmPassword validation
      sanitizedBody.password=req.sanitizeBody('password').escape();
      sanitizedBody.confirmPassword=req.sanitizeBody('confirmPassword').escape();
    }
    if (req.body.oldPassword) {
      req.assert('oldPassword', 'password too short. Must be 6 characters or more').matches(/^[A-Za-z0-9\d=!\-@._*]*$/); // Password validation
      sanitizedBody.oldPassword=req.sanitizeBody('oldPassword').escape();
    }
    if (req.body.captcha_code) {
      req.assert('captcha_code', 'captcha do not match').equals(req.session.captcha); // Captcha validation
      sanitizedBody.captcha_code=req.sanitizeBody('captcha_code').escape();
    }
    if (req.body.city) {
      req.assert('city', 'city is required').matches(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/); // City validation
      sanitizedBody.city=req.sanitizeBody('city').escape();
    }
    if (req.body.zip_code) {
      req.assert('zip_code', 'zip code is required').notEmpty(); // zip_code validation
      req.assert('zip_code', 'zip code should be digits').isInt(); // zip_code validation
      sanitizedBody.zip_code=req.sanitizeBody('zip_code').escape();
    }
    if (req.body.address) {
      req.assert('address', 'address is required').matches(/^[a-zA-Z0-9\-\/]/); // address validation
      sanitizedBody.address=req.sanitizeBody('address').escape();
    }
    if (req.body.phone) {
      req.assert('phone', 'phone number is required').notEmpty(); // Phone validation
      sanitizedBody.phone=req.sanitizeBody('phone').escape();
    }
    if (req.body.company_name) {
      req.assert('company_name', 'company name is required').notEmpty(); // Company name validation
      sanitizedBody.company_name=req.sanitizeBody('company_name').escape();
    }
    if (req.body.locale) {
      req.assert('locale', 'locale does not match').matches(/^[a-z]{2}_[A-Z]{2}/); // locale validation
      sanitizedBody.locale=req.sanitizeBody('locale').escape();
    }
    if (req.body.country) {
      req.assert('country', 'country is required').notEmpty(); // country validation
      sanitizedBody.country=req.sanitizeBody('country').escape();
    }
    if (req.body.account_currency) {
      req.assert('account_currency', 'currency is required').notEmpty(); // account currency validation
      sanitizedBody.account_currency=req.sanitizeBody('account_currency').escape();
    }
    if (req.body.account_time_zone) {
      req.assert('account_time_zone', 'time zone is required').notEmpty(); // account_time_zone validation
      sanitizedBody.account_time_zone=req.sanitizeBody('account_time_zone').escape();
    }
    cbresult(sanitizedBody);
  }
};

