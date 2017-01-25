/* Module for Registration form application */
var RegistrationForm = function () {
var client = ProductsClient("http://localhost:8081/messages");
  /* extender for required fields */
ko.extenders.required = function(target, option) {
  //observables to indicate an error
  target.hasError = ko.observable(false);
  //set the error flag whenever the value changes
  target.subscribe(function (newValue) {
     target.hasError(newValue ? false : true);
  });

  //return the original observable
  return target;
};

  var customer = {
    id: ko.observable(),
    firstName: ko.observable().extend({ required: null}),
    lastName: ko.observable().extend({ required: null}),
    emailAddress: ko.observable().extend({ required: null}),
    subject: ko.observable(),
    message: ko.observable()
};

/* method to traverse the model and clear observables */
  var traverseAndClearModel = function(jsonObj) {
    $.each(jsonObj, function(key,val){
      if(ko.isObservable(val)) {
        if(val.removeAll != undefined) {
          val.removeAll();
        } else {
          val(null);
        }
      } else {
        traverseAndClearModel(val);
      }
    });
  };
  /* clear the model */
  var clear = function () {
    console.log("Clear customer model");
    traverseAndClearModel(customer);
  };
  /* form submission */
    var submit = function () {
      console.log(ko.toJSON(customer));
      client.addProduct(customer, saveProductCallback);
    };

  /* method to send add request to the client */
  var saveProduct = function (product) {
      client.addProduct(product, saveProductCallback);
  };

  /* callback on successful add request */
  var saveProductCallback = function (product, id) {
      customer.id(id);
      alert("Grazie per averci inviato un messaggio. <br />Provvederemo a risponderti nel più breve tempo possibile!")
      console.log("Product saved with id [" + customer.id() + "]");
  };


  var init = function () {
    /* add code to initialize this module */
    ko.applyBindings(RegistrationForm, document.getElementById('contatti'));
  };

  /* execute the init function when the DOM is ready */
  $(init);

  return {
    clear: clear,
    customer: customer,
    submit: submit,
    saveProduct: saveProduct
  };
}();