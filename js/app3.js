

      var styles= [
          {
            featureType: 'water',
            stylers: [
              { color: '#19a0d8' }
            ]},
          {
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [
              { color: '#ffffff' },
              { weight: 6 }
            ]
          },{
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [
              { color: '#e85113' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
              { color: '#efe9e4' },
              { lightness: -40 }
            ]
          },{
            featureType: 'transit.station',
            stylers: [
              { weight: 9 },
              { hue: '#e85113' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [
              { visibility: 'off' }
            ]
          },{
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
              { lightness: 100 }
            ]
          },{
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
              { lightness: -100 }
            ]
          },{
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              { visibility: 'on' },
              { color: '#f0e4d3' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
              { color: '#efe9e4' },
              { lightness: -25 }
            ]
          }
          ];
      
     
      
     function initMap() {
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;
       
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 44.5466389, lng: 11.3566971},
          zoom: 14,
          styles: styles,
          mapTypeControl: true
        });
        
      var largeInfowindow = new google.maps.InfoWindow;
      
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });

         $( "#mytest" ).data( "test", pos);
         $( "#mytest" ).text( $( "#mytest" ).data( "test" ) )
         //ko.toJSON(viewModel)
         

        directionsDisplay.setMap(map);

        calculateAndDisplayRoute(directionsService, directionsDisplay);
        document.getElementById('mode').addEventListener('change', function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        });


        }, function() {
            handleLocationError(true, largeInfowindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, largeInfowindow, map.getCenter());
        }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var selectedMode = document.getElementById('mode').value;
        directionsService.route({
          origin:  $( "#mytest" ).data( "test"), 
          destination: map.center,  
          // Note that Javascript allows us to access the constant
          // using square brackets and a string value as its
          // "property."
          travelMode: google.maps.TravelMode[selectedMode]
        }, function(response, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(response);
            var bounds = new google.maps.LatLngBounds();
            bounds.extend($( "#mytest" ).data( "test"));
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

      
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }
     
        
}
     
function AppViewModel() {
  var self = this;
    self.copyrightyear = ko.computed(function(){
      return new Date().getFullYear();
      });
     

    
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());