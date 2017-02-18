var RetrieveNews = function (){
  var mydate = function (date){
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

  var self = this;
  var displayOtherNews = ko.observable(false);

  var productModel = function(item) {
    self.data = {};
    self.data.title = ko.observable(item.title);
    self.data.date = ko.observable(item.date);
    self.data.link = ko.observable(item.link);
    self.data.enclosure = ko.observable(item.enclosure);
    //this.displayMode = ko.observable(itemMode);
  };

  /* product observable array */
  var products = ko.observableArray();
$.ajax({
    url: 'http://www.agi.it/salute/rss',
    dataType: 'xml',
    async: true,
    cache:false,
    success: function(data) {
      $(data).find("item").each(function () { // or "item" or whatever suits your feed
              var el = $(this);
              item = {
                "title": el.find("title").text(),
                "date": el.find("pubDate").text(),
                "link": el.find("link").text(),
                "enclosure": el.find("enclosure").attr('url')};
              products.push(new productModel(item));
              });
        },
    error: function(){
            alert("Abbiamo riscontrato un problema nell\'aggiornamento delle notizie. Riprovate fra qualche minuto.");
        }
    });




        // $.get('http://www.agi.it/salute/rss', function (data) {
        //       $(data).find("item").each(function () { // or "item" or whatever suits your feed
        //       var el = $(this);
        //       item = {
        //         "title": el.find("title").text(),
        //         "date": el.find("pubDate").text(),
        //         "link": el.find("link").text(),
        //         "description": el.find("content\\:encoded").text().substring(0,100)  };
        //       products.push(new productModel(item));
        //       })
        //       .error(function(){
        //         alert( "error" );
        //       });
        //   });




// function htmlEncode(value){
//   //create a in-memory div, set it's inner text(which jQuery automatically encodes)
//   //then grab the encoded contents back out.  The div never exists on the page.
//   return $('<div/>').text(value).html();
// }
// function htmlDecode(value){
//   return $('<div/>').html(value).text();
// }
// self.formattedText = ko.pureComputed(function(){
//   if (self.data.description()){
//     return htmlDecode(self.data.description());
//   } else { return "Siamo spiacenti ma ci sono difficoltà nel collegamento. Provate Firefox."}
// }, self);


  self.formattedDate = ko.pureComputed(function(){
            return mydate(self.data.date());
    }, self);

  var init = function(){
      ko.applyBindings(RetrieveNews, document.getElementById("notizie"));
  };

  $(init);

  return {
    products: products,
    formattedDate: formattedDate,
    displayOtherNews: displayOtherNews
  };

}();
