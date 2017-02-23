

var ShiftWork = function(){
    var myformatdate = function (mydate){
          var date = new Date(mydate);
          year = date.getFullYear();
          mm = date.getMonth()+1;
          dd = date.getDate();
          if(dd<10){
              dd='0'+dd
          }
          if(mm<10){
              mm='0'+mm
          }
          result = dd+'/'+mm+'/'+year;
          return result;
  };

    $("#calendar").datepicker({
            dateFormat: "dd/mm/yy"
        });

    // anno del footer
    this.copyrightyear = ko.computed(function(){
      return new Date().getFullYear();
      }, this);

    /* model for shifts */
    var shiftModel = function(item) {
        this.data = {};
        this.data.day = ko.observable(item.date);
        this.data.description = ko.observable(item.turni);
    };
    var today = new Date();

    var mydate = ko.observable(today);
    var myopening = ko.observable();
    var openings = ko.observableArray();
    var showMessage = ko.observable(false);
    var showdate = ko.computed(function(){
        return myformatdate(mydate());
    });
    var close = ko.observable(false);
    var ShiftClient = function (url) {
        /* the base url for the rest service */
        var baseUrl = url;
        /* method to retrieve data */
        var getMyShifts = function(callback) {
            $.ajax({
                url: baseUrl,
                type: "GET",
                dataType: "json",
                jsonpCallback: "_testcb",
                success: function(result) {
                    console.log("Schedule retrieved: " + JSON.stringify(result));
                    callback(result);
                    showMessage(false);
                },
                error: function(){
                    showMessage(true);
                    console.log("Acciderbolina!")
                }
            });
        };
        return{
            getMyShifts: getMyShifts
        };
    };

    var client = new ShiftClient("http://207.154.202.235/js/turni.json");

/* method to retrieve products using the client */
    var retrieveShifts = function () {
        console.log("Retrieving products from server ...");
        client.getMyShifts(retrieveShiftsCallback);
    };

    /* callback for when the products are retrieved from the server */
    var retrieveShiftsCallback = function (data) {
        data.forEach(function(item) {
            openings.push(new shiftModel(item));
        });

    };
    this.orari = ko.computed(function(){
        // check first if server include information
        for(var i = 0 ; i < openings().length; i++){
            if(myformatdate(openings()[i].data.day()) === myformatdate(mydate())) {
               close(false);
               return (new shiftModel({date: mydate(), turni: openings()[i].data.description()}));
            }
        }
        // if the server do not include information evaluate this
        if (mydate().toString().search('Sat') > -1) {
            close(true);
            return (new shiftModel({date: mydate(), turni: "Siamo chiusi"}));
        } else if (mydate().toString().search('Sun') > -1) {
            close(true);
            return (new shiftModel({date: mydate(), turni: "Siamo chiusi"}));
        }
        else {
            close(false);
            return (new shiftModel({date: mydate(), turni: "Siamo aperti dalle 8.30 alle 12.30 e dalle 15.30 alle 19.30"}));
        }
    }, this);



ko.bindingHandlers.datepicker = {
    init: function(element, valueAccessor, allBindingsAccessor) {
        var $el = $(element);
        //initialize datepicker with some optional options
        var options = allBindingsAccessor().datepickerOptions || {};
        $el.datepicker(options);
        //handle the field changing
        ko.utils.registerEventHandler(element, "change", function() {
            var observable = valueAccessor();
            observable($el.datepicker("getDate"));
        });
        //handle disposal (if KO removes by the template binding)
        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            $el.datepicker("destroy");
        });
    },
    update: function(element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
            $el = $(element);
            $el.datepicker("setDate", value);
    }
};


var init = function () {
        /* add code to initialise this module */
        // configureBindingHandlers();
        retrieveShifts();


        //apply ko bindings
        ko.applyBindings(ShiftWork, document.getElementById('koturni'));
    };

    /* execute the init function when the DOM is ready */
    $(init);

    return {
        /* add members that will be exposed publicly */
       openings: openings,
       mydate: mydate,
       showMessage: showMessage,
       orari: orari,
       copyrightyear: copyrightyear,
       showdate: showdate,
       close: close
    };
}();


