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
  self.displayOtherNews = ko.observable(false);

  var productModel = function(item) {
    self.data = {};
    self.data.title = ko.observable(item.title);
    self.data.date = ko.observable(item.date);
    self.data.link = ko.observable(item.link);
    self.data.enclosure = ko.observable(item.enclosure);
    //this.displayMode = ko.observable(itemMode);
  };

  var products = ko.observableArray();


 var url = 'http://www.agi.it/salute/rss'
  feednami.load(url,function(result){
    if(result.error){
      console.log(result.error)
    }
    else{
      var entries = result.feed.entries
      for(var i = 0; i < entries.length; i++){
        var entry = entries[i];
        items = {
                "title": entry.title,
                "date": entry.date,
                "link": entry.link,
                "enclosure": entry.enclosures[0].url};
                console.log(items);
        products.push(new productModel(items));
        console.log(products());
      }
    }
  })

  self.formattedDate = ko.pureComputed(function(){
            return mydate(self.data.date());
    }, self);




// var yqlError = function(){
//   alert("Abbiamo riscontrato un problema nell\'aggiornamento delle notizie. Riprovate fra qualche minuto.");
// };


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