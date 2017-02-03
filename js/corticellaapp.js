

var ShiftWork = function(){
    var self = this;
    // anno del footer
    self.copyrightyear = ko.computed(function(){
      return new Date().getFullYear();
      }, self);
// datepicker
    var displayMode = {
          view: "VIEW",
          edit: "EDIT"
        };

    /* model for shifts */
    var shiftModel = function(item) {
        self.data = {};
        self.data.day = ko.observable(item.date);
        self.data.description = ko.observable(item.turni);
    };
    var mydate = ko.observable();
    var myopening = ko.observable();
    var openings = ko.observableArray();

    var ShiftClient = function (url) {
        /* the base url for the rest service */
        var baseUrl = url;
        /* method to retrieve data */
        var getShifts = function(callback) {
            $.ajax({
                url: baseUrl + "/schedule-corticella",
                type: "GET",
                success: function(result) {
                    console.log("Schedule retrieved: " + JSON.stringify(result));
                    callback(result);
                }
            });
        };
        return{
            getShifts: getShifts
        };
    };

    var client = ShiftClient("http://localhost:8081");

/* method to retrieve products using the client */
    var retrieveShifts = function () {
        console.log("Retrieving products from server ...");
        client.getShifts(retrieveShiftsCallback);
    };

    /* callback for when the products are retrieved from the server */
    var retrieveShiftsCallback = function (data) {
        data.forEach(function(item) {
            openings.push(new shiftModel(item));

        });
    };
var myformatdate = function (date){
          var date = new Date(date);
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
//Search and filter the items (markers) using the input form
    self.orari = ko.computed(function() {
        var substrdate = myformatdate(self.mydate());
        return ko.utils.arrayFilter(self.openings(), function(item) {
          if (item.day.indexOf(substrdate) > -1){
            return true;
          } else {
            return false;
          }
        });
        }
    }, self);

     viewModel.beers = ko.dependentObservable(function() {
        var search = this.query().toLowerCase();
        return ko.utils.arrayFilter(beers, function(beer) {
            return beer.name.toLowerCase().indexOf(search) >= 0;
        });
    }, viewModel);








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
        $("#calendar").datepicker({
            dateFormat: "dd/mm/yy"
        });

        //apply ko bindings
        ko.applyBindings(ShiftWork, document.getElementById('koturni'));
    };

    /* execute the init function when the DOM is ready */
    $(init);

    return {
        /* add members that will be exposed publicly */
       openings: openings,
       mydate: mydate
    };
}();




/////////////////////////////////////////////
// APPUNTI

// $(".calendar").datepicker({
//     dateFormat: "dd/mm/yy",
//     showWeek: true,
//     onSelect: function(dateText, inst) {
//       var newDate = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay);
//       dateFormat: "'Week Number '" + $.datepicker.iso8601Week(newDate),
//         $(".week").val('Week:' + $.datepicker.iso8601Week(newDate));
//     }
// var configureBindingHandlers = function(){
//         ko.bindingHandlers.datepicker = {
//             init: function (element, valueAccessor, allBindingsAccessor) {
//                 var options = allBindingsAccessor().datepickerOptions || {};
//                 $(element).datepicker(options);

//                 //handle the field changing
//                 ko.utils.registerEventHandler(element, "change", function () {
//                     var observable = valueAccessor();
//                     observable($(element).datepicker("getDate"));
//                 });

//                 //handle disposal (if KO removes by the template binding)
//                 ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
//                     $(element).datepicker("destroy");
//                 });
//             }
//         };
//     };
// $( "#calendar" ).datepicker({
//         showWeek: true,
//         onSelect: function(dateText, inst) {
//             alert($.datepicker.iso8601Week(new Date(dateText)))
//      }
// });
// $("#calendar").datepicker({
//         showWeek: true,
//         onSelect: function(dateText, inst) {
//             $(this).val("'Week Number '" + $.datepicker.iso8601Week(new Date(dateText)));
//         }
//     })

// $('#datepicker').datepicker({
//     onSelect: function (dateText, inst) {
//           var date = $(this).datepicker('getWeek');
//           alert($.datepicker.formatDate('DD', date));
//     }
// });
// function toDate(selector) {
//           var from = $(selector).val().split("-");
//           return new Date(from[2], from[1] - 1, from[0]);
//       }

// function AppViewModel() {

//     self.value2 = ko.observableArray([]);
// evtjson = [
//       { name: "Bungle", apdate: "01-01-2017" },
//     { name: "George", apdate: "02-02-2017" },
//     { name: "Zippy", apdate: "03-03-2017" }
//     ];
//     self.value1 = ko.observable();


    // $("#datepicker").datepicker({
    //                     dateFormat: "@", // Unix timestamp
    //                     onSelect: function(dateText, inst){
    //                         addOrRemoveDate(dateText);
    //                     },
    //                     beforeShowDay: function(date){
    //                         var gotDate = $.inArray($.datepicker.formatDate($(this).datepicker('option', 'dateFormat'), date), dates);
    //                         if (gotDate >= 0) {
    //                             return [false,"ui-state-highlight", "Event Name"];
    //                         }
    //                         return [true, ""];
    //                     }
    //                 });
    //self.value2(new Date(2000, 0, 1));
    //$("#txtDate").val($.datepicker.formatDate('dd M yy', new Date()));
    //$( "#datepicker" ).datepicker();
    //$.datepicker.parseDate(new Date(1957, 24, 12));





//}

// Activates knockout.js
//ko.applyBindings(new AppViewModel());
