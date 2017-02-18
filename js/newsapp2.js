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

  /* product observable array */
  self.products = ko.observableArray();
  // $.ajax({
  //   url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Fwww.agi.it%2Fsalute%2Frss%22&format=json&diagnostics=false&callback=',
  //   dataType: 'json',
  //   success: function(data) {
  //               var items = data.query.results.item;

  //               var no_items=items.length;
  //               for(var i=0;i<no_items;i++){
  //                 var title = items[i].title;
  //                 var link = items[i].link;
  //                 var date = items[i].puDate;
  //                 var enclosure = items[i].enclosure.url;
  //                 self.products.push(new productModel({
  //                   title: title,
  //                   date: date,
  //                   link: link,
  //                   enclosure: enclosure
  //                    }));
  //                 console.log(items[i]);
  //                 //self.tasks.push(new Task({ title: this.newTaskText() }));
  //               };
  //             },
  //   error: function(){
  //           alert("Abbiamo riscontrato un problema nell\'aggiornamento delle notizie. Riprovate fra qualche minuto.");
  //       }
  //   });

   // $(data).find("item").each(function () { // or "item" or whatever suits your feed
   //            var el = $(this);
   //            item = {
   //              "title": el.find("title").text(),
   //              "date": el.find("pubDate").text(),
   //              "link": el.find("link").text(),
   //              "enclosure": el.find("enclosure").attr('url')};
   //            products.push(new productModel(item));
   //            });
$.ajax({
    url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%20%3D%20'http%3A%2F%2Fwww.agi.it%2Fsalute%2Frss'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
    datatype: 'json',
    success: function(data){
              $(data).find('item').each(function () { // or "item" or whatever suits your feed
              var el = $(this);
              items = {
                "title": el.find("title").text(),
                "date": el.find("pubDate").text(),
                "link": el.find("link").text(),
                "enclosure": el.find("enclosure").attr('url')};
              self.products.push(items);

              });
              console.log(self.products()[0])
        },
    error: function(){
            alert("Abbiamo riscontrato un problema nell\'aggiornamento delle notizie. Riprovate fra qualche minuto.");
        }
    });


  self.formattedDate = ko.pureComputed(function(){
            return mydate(self.data.date());
    }, self);


};

var yqlError = function(){
  alert("Abbiamo riscontrato un problema nell\'aggiornamento delle notizie. Riprovate fra qualche minuto.");
};

ko.applyBindings(new RetrieveNews(), document.getElementById("notizie"));