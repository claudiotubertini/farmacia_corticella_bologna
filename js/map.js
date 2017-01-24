
var googlestyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]



var mystyles = [

          {
            featureType: 'water',
            stylers: [
              { color: '#9d9489' }
            ]
          },{
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [
              { color: '#000' },
              { weight: 6 }
            ]
          },{
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [
              { color: '#9d9489' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
              { color: '#9d9489' },
              { lightness: -50 },
              { saturation: -100 }
            ]
          },{
            featureType: 'transit.station',
            stylers: [
              { weight: 9 },
              { hue: '#9d9489' }
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
              { lightness: -100 }
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
              { color: '#9d9489' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
              { color: '#FFF' },
              { lightness: -200 }
            ]
          }
        ];
var map;
var farma = {lat: 44.5466389, lng: 11.3566971};

var initMap = function() {
  

        var directionsDisplay = new google.maps.DirectionsRenderer({
          suppressMarkers: true
        });
        var directionsService = new google.maps.DirectionsService;
        var largeInfowindow = new google.maps.InfoWindow;
        var marker;
        var mymarker;
        var pos;
    map = new google.maps.Map(document.getElementById('map'), {
      center: farma,
      zoom: 14,
      styles: googlestyle,
      mapTypeControl: false
    });
  
    function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }
      var imageFarma = {
            url: 'http://46.101.102.250/documents/img/image.png',
            size: new google.maps.Size(50,46),
            origin: new google.maps.Point(0,0),
            anchor: new google.maps.Point(25,46),
            scaledSize: new google.maps.Size(25, 25)
          };
      
      var shape = {
            coord: [0,0,50,46],
            type: 'rect'
          };
      var defaultIcon = makeMarkerIcon('99CC00');
      var yourIcon = makeMarkerIcon('CFCFCF');
     
         marker = new google.maps.Marker({
              position: farma,
              title: "Farmacia di Corticella",
              animation: google.maps.Animation.DROP,
              icon: imageFarma
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
              map: map,
              icon: yourIcon
            });



        directionsDisplay.setMap(map);
        directionsDisplay.setOptions({
          polylineOptions:'#99CC00'
        });
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
