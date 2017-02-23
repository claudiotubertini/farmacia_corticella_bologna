/* Module for Registration form application */
var RegistrationForm = function () {

  /* extender for required fields */
// ko.extenders.required = function(target, option) {
//   //observables to indicate an error
//   target.hasError = ko.observable(false);
//   //set the error flag whenever the value changes
//   target.subscribe(function (newValue) {
//      target.hasError(newValue ? false : true);
//   });

//   //return the original observable
//   return target;
// };
// var myComplexValue = ko.observable().extend({
//                      required: true,
//                      minLength: 3,
//                      pattern: {
//                           message: 'Hey this doesnt match my pattern',
//                           params: '^[A-Z0-9].$'
//                      }
//                  });



  var customer = {
    id: ko.observable(),
    firstName: ko.observable().extend({
                required: true,
                maxLength: 12,
                pattern: {
                  message:'Il nome deve contenere solo lettere!',
                  params: '^[A-Za-z]*$'
                }
              }),
    lastName: ko.observable().extend({
                required: true,
                maxLength: 15,
                pattern: {
                  message:'Il cognome deve contenere solo lettere!',
                  params: '^[A-Za-z]*$'
                }
              }),
    emailAddress: ko.observable().extend({
                    required: true,
                    email: true,
                    message: 'Controlla meglio la tua mail!'
                      }),
    subject: ko.observable().extend({
                    required: false,
                    maxLength: 15,
                    pattern: {
                      message: 'Puoi usare solo lettere e numeri!',
                      params: '[A-Za-z0-9\.,"\']*'
                    }
              }),

    message: ko.observable().extend({
                    required: false,
                    pattern: {
                      message: 'Puoi usare solo lettere e numeri!',
                      params: '[A-Za-z0-9\.,"\']*'
                    }
              }),
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
 // if (!viewModel.isValid()) { viewModel.errors.showAllMessages(); }
// function(){
//     self.errors = ko.validation.group(self);
//     if (self.errors().length == 0) {

//     }
//     else{
//         self.errors.showAllMessages();
//     }
// }

var client = ProductsClient("http://localhost:8081/messages");
    var submit = function () {
      self.errors = ko.validation.group(self);
      if (self.errors().length === 0) {
            alert('Grazie per averci inviato un messaggio\nLe risponderemo quanto prima.');
            console.log(ko.toJSON(customer));
            client.addProduct(customer, saveProductCallback);
        }

    };



  /* callback on successful add request */
  var saveProductCallback = function (product, id) {
      customer.id(id);

      //alert("Grazie per averci inviato un messaggio.\nProvvederemo a risponderti nel più breve tempo possibile!")
      console.log("Product saved with id [" + customer.id() + "]");
  };


  var init = function () {
    /* add code to initialize this module */
    ko.applyBindings(RegistrationForm, document.getElementById('contatti'));
    ko.validation.init();
  };

  /* execute the init function when the DOM is ready */
  $(init);

  return {
    clear: clear,
    customer: customer,
    submit: submit
    //saveProduct: saveProduct
  };
}();