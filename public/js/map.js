
var map;

var iconTypeMap = {
    hotels: '/images/lodging_0star.png',
    restaurants: '/images/restaurant.png',
    thingsToDo: '/images/star-3.png'
}

function initialize_gmaps(lat, lng) {

    lat = lat || 40.705786;
    lng = lng || -74.007672;

    // initialize new google maps LatLng object
    var myLatlng = new google.maps.LatLng(lat, lng);

    // set the map options hash
    var mapOptions = {
        center: myLatlng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        styles: styleArr
    };
    // get the maps div's HTML obj
    var map_canvas_obj = document.getElementById('map-canvas');
    // initialize a new Google Map with the options
    map = new google.maps.Map(map_canvas_obj, mapOptions);

}

var markers = [];

function addMarker (location, id, type) {
    // Add the marker to the map
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(location[0], location[1]),
        map: map,
        id: id || null,
        icon: type ? iconTypeMap[type] : null
    });

    markers.push(marker);

}

function removeMarker (id) {

    if (!id) return;

    // Remove the marker to the map
    var marker = markers.filter(function (mark) {
        return mark.id === id
    })[0];

    if (marker) marker.setMap(null);

    // Remove markers from state (markers array)
    var removeIndex = null;
    markers.forEach(function (mark, index) {
      if (mark.id === id) removeIndex = index;
    });
    if (removeIndex != null) {
      markers.splice(removeIndex, 1);
    }
    
}

function clearMarkers () {
    markers.forEach(function (marker) {
        marker.setMap(null);
    });
    markers.length = 0;
}

var styleArr = [
    {
        "featureType": "landscape",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 60
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 40
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 30
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ef8c25"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#b6c54c"
            },
            {
                "lightness": 40
            },
            {
                "saturation": -40
            }
        ]
    },
    {}
];
