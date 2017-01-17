var mystyles = [

          {
            featureType: 'water',
            stylers: [
              { color: '#19a0d8' }
            ]
          },{
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
var initMap = function() {
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;
        var largeInfowindow = new google.maps.InfoWindow;
        var map;

      // Create a new blank array for all the listing markers.
        var marker;
        var mymarker;
        var pos;
        var farma = {lat: 44.5466389, lng: 11.3566971};
      map = new google.maps.Map(document.getElementById('map'), {
          center: farma,
          zoom: 14,
          styles: mystyles,
          mapTypeControl: false
        });
         marker = new google.maps.Marker({
              position: farma,
              title: "Farmacia di Corticella",
              animation: google.maps.Animation.DROP
            });
             marker.setMap(map);


        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

mymarker = new google.maps.Marker({
              position: pos,
              title: "La tua posizione",
              animation: google.maps.Animation.DROP,
              map: map
            });



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
          origin: pos,
          destination: farma,

          travelMode: google.maps.TravelMode[selectedMode]
        }, function(response, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(response);
            var bounds = new google.maps.LatLngBounds();
            bounds.extend(pos);
          } else {
            window.alert('Non ci sono indicazioni disponibili ' + status);
          }
        });
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Scusate: il servizio di geolocalizzazione è momentaneamente non funzionante.' :
                              'Scusate: il browser sono supporta il servizio di geolocalizzazione.');
        }
}; // fine initMap
var googleError = function(){
  alert( "Scusate: al momento non vi sono mappe disponibili" );
};
