/* Module for Registration form application */
var RegistrationForm = function () {
  var customer = {
  personalInfo: {
    firstName: ko.observable(),
    lastName: ko.observable()
  },
  contactDetails: {
    phoneNumber: ko.observable(),
    emailAddress: ko.observable()
  }
};
  /* form submission */
    var submit = function () {
      console.log(ko.toJSON(customer));
    };

  var init = function () {
    /* add code to initialize this module */
    ko.applyBindings(RegistrationForm, document.getElementById('contatti'));
  };

  /* execute the init function when the DOM is ready */
  $(init);

  return {
    customer: customer,
    submit: submit
  };
}();