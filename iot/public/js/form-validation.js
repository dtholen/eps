// Wait for the DOM to be ready

//Escape function for frontend
/*function blockSpecialChar(e){
 var k;
 document.all ? k = e.keyCode : k = e.which;
 return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
 }*/

$(function () {
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  $('#register-form').validate({
    // Specify validation rules
    errorClass: 'error-message text-danger',
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      username: {
        required: true,
        remote: {
          url: '/checkUsername',
          type: "post",
          data: {
            username: function () {
              return $("#username").val();
            }
          }
        }
      },
      email: {
        required: true,
        // Specify that email should be validated
        // by the built-in "email" rule
        email: true
      },
      oldPassword: {
        required: true,
        pwcheck: true,
        minlength: 5
      },
      password: {
        required: true,
        pwcheck: true,
        minlength: 5
      },
      confirmPassword: {
        required: true,
        equalTo: '#password'
      },
      city: {
        required: true,
        rangelength: [1, 100],
        regex: '^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$'
      },
      zip_code: {
        required: true,
        digits: true
      },
      phone: {
        required: true
      },
      address: {
        required: true
      },
      company_name: {
        required: true
      },
      locale: {
        required: true,
        regex: '^[a-z]{2}_[A-Z]{2}'
      },
      captcha_code: {
        required: true,
        remote: {
          url: '/checkCaptcha',
          type: "post",
          data: {
            captcha_code: function () {
              return $("#captcha_code").val();
            }
          }
        }
      }
    },
    // Specify validation error messages
    messages: {
      username: {
        required: 'Please enter your firstname',
        remote: 'Username is already taken'
      },
      oldPassword: {
        required: 'Please provide a password',
        pwcheck: 'Password should consists only of A-Z, a-z, 0-9, !\-@._*. Should has a lower case letter. Should has a digit',
        minlength: 'Your password must be at least 5 characters long'
      },
      password: {
        required: 'Please provide a password',
        pwcheck: 'Password should consists only of A-Z, a-z, 0-9, !\-@._*. Should has a lower case letter. Should has a digit',
        minlength: 'Your password must be at least 5 characters long'
      },
      confirmPassword: 'Passwords do not match',
      email: 'Please enter a valid email address',
      city: {
        required: 'Please enter a city',
        rangelength: 'City name should be in range from 1 to 100 characters',
        regex: 'City name should contains valid characters'
      },
      phone: {
        required: 'Please enter a phone number'
      },
      zip_code: {
        required: 'Please provide a postal code',
        digits: 'Only digits are allowed'
      },
      address: 'Please enter your address',
      company_name: 'Please enter company name',
      locale: {
        required: 'Please enter locale',
        regex: 'For example de_DE, en_US and etc'
      },
      captcha_code: {
        required: 'Please enter the code displayed in the box',
        remote: 'Captcha do not match'
      }
    },

    submitHandler: function (form) {
      var options = {
        target: '#result',   // target element(s) to be updated with server response

        success: showResponse,
        error: showErrorResponse
      };
      $(form).ajaxSubmit(options);
      $("#captcha").attr("src","/captcha?timestamp=" + new Date().getTime());
      return false;
    }
  });

  $('#account-form').validate({
    // Specify validation rules
    errorClass: 'error-message text-danger',
    rules: {
      email: {
        required: true,
        email: true
      },
      oldPassword: {
        required: true,
        pwcheck: true,
        minlength: 5
      },
      password: {
        required: true,
        pwcheck: true,
        minlength: 5
      },
      confirmPassword: {
        required: true,
        equalTo: '#password'
      },
      city: {
        required: true,
        rangelength: [1, 100],
        regex: '^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$'
      },
/*      zip_code: {
        required: true,
        digits: true
      },*/
      phone: {
        required: true
      },
      address: {
        required: true
      },
      company_name: {
        required: true
      },
      locale: {
        required: true,
        regex: '^[a-z]{2}_[A-Z]{2}'
      }
    },
    // Specify validation error messages
    messages: {
      oldPassword: {
        required: 'Please provide a password',
        pwcheck: 'Password should consists only of A-Z, a-z, 0-9, !\-@._*. Should has a lower case letter. Should has a digit',
        minlength: 'Your password must be at least 5 characters long'
      },
      password: {
        required: 'Please provide a password',
        pwcheck: 'Password should consists only of A-Z, a-z, 0-9, !\-@._*. Should has a lower case letter. Should has a digit',
        minlength: 'Your password must be at least 5 characters long'
      },
      confirmPassword: 'Passwords do not match',
      email: 'Please enter a valid email address',
      city: {
        required: 'Please enter a city',
        rangelength: 'City name should be in range from 1 to 100 characters',
        regex: 'City name should contains valid characters'
      },
      phone: {
        required: 'Please enter a phone number'
      },
      zip_code: {
        required: 'Please provide a postal code',
        digits: 'Only digits are allowed'
      },
      address: 'Please enter your address',
      company_name: 'Please enter company name',
      locale: {
        required: 'Please enter locale',
        regex: 'For example de_DE, en_US and etc'
      }
    },
    submitHandler: function (form) {
        var options = {
          target: '#result',   // target element(s) to be updated with server response
          success: showResponse,
          error: showErrorResponse
        };
        $(form).ajaxSubmit(options);
        return false;
      }
  });

  $('#login-form').validate({
    // Specify validation rules
    errorClass: 'error-message text-danger',
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      username: {
        required: true
      },
      password: {
        required: true
      }
    },
    // Specify validation error messages
    messages: {
      username: {
        required: 'Please enter your firstname'
      },
      password: {
        required: 'Please provide a password'
      }
    },

    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function (form) {
      form.submit();
    }

  });

  $('#passwordReset-form').validate({
    // Specify validation rules
    errorClass: 'error-message text-danger',
    rules: {
      password: {
        required: true,
        pwcheck: true,
        minlength: 5
      },
      confirmPassword: {
        required: true,
        equalTo: '#password'
      }
    },
    // Specify validation error messages
    messages: {
      password: {
        required: 'Please provide a password',
        pwcheck: 'Password should consists only of A-Z, a-z, 0-9, !\-@._*. Should has a lower case letter. Should has a digit',
        minlength: 'Your password must be at least 5 characters long'
      },
      confirmPassword: 'Passwords do not match'
    },
    submitHandler: function (form) {
      var options = {
        target: '#result',   // target element(s) to be updated with server response
        success: showResponse,
        error: showErrorResponse
      };
      $(form).ajaxSubmit(options);
      return false;
    }
  });

  $('#passwordRecovery-form').validate({
    // Specify validation rules
    errorClass: 'error-message text-danger',
    rules: {
      username: {
        required: true
      }
    },
    // Specify validation error messages
    messages: {
      username: {
        required: 'Please enter username'
      }
    },
    submitHandler: function (form) {
      var options = {
        target: '#result',   // target element(s) to be updated with server response
        success: showResponse,
        error: showErrorResponse
      };
      $(form).ajaxSubmit(options);
      return false;
    }
  });

  $('#pay-form').validate({
    // Specify validation rules
    errorClass: 'error-message text-danger',
    rules: {
      optradio: {
        required: true
      }
    },
    // Specify validation error messages
    messages: {optradio: 'Please select amount'},
    errorPlacement: function (error, element) {
      error.appendTo(element.parents('.form-group'));
    },
    submitHandler: function (form) {
      form.submit();
    }
  });

});

$.validator.addMethod("pwcheck", function (value) {
  return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
    && /[a-z]/.test(value) // has a lowercase letter
    && /\d/.test(value); // has a digit
});

$.validator.addMethod("regex", function (value, element, regexp) {
  var re = new RegExp(regexp);
  return this.optional(element) || re.test(value);
});

function showErrorResponse(xhr, textStatus, errorThrown) {
  $("#result").removeClass('alert alert-success hidden').addClass('alert alert-danger').fadeOut(20).fadeIn(20);;
  if(xhr.status == 400){ //validation errros
    var obj = jQuery.parseJSON(xhr.responseText);
    $("#result").html('Oops, validation failed!<br>')
    $.each(obj, function(key,value) {
      $("#result").append(value.msg+'<br>'); // TARGET -> any valid selector container to radios
    });
  } else {
    $("#result").text(xhr.responseText).fadeOut(20).fadeIn(20);;
  }

}
function showResponse(responseText, statusText, xhr, $form) {
  if(xhr.status == 201) {
    $("#result").removeClass('alert-danger hidden').addClass('alert alert-success');
    setTimeout(function () {
      window.location.replace("/login");
    }, 5000);
  } else {
    $("#result").removeClass('alert-danger hidden').addClass('alert alert-success').fadeOut(20).fadeIn(20);
  }
}
