// Google Maps
google.maps.event.addDomListener(window, 'load', init);
function init() {
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 15
        , // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(41.112122, -73.416351), // Norwalk
        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [
            {
                "featureType": "all"
                , "elementType": "geometry.fill"
                , "stylers": [
                    {
                        "visibility": "on"
					}
                    , {
                        "saturation": "11"
					}
				]
			}
            , {
                "featureType": "administrative"
                , "elementType": "labels.text.fill"
                , "stylers": [
                    {
                        "color": "#000"
					}
				]
			}
            , {
                "featureType": "administrative.country"
                , "elementType": "labels.text.fill"
                , "stylers": [
                    {
                        "lightness": "-30"
					}
				]
			}
            , {
                "featureType": "administrative.neighborhood"
                , "elementType": "geometry"
                , "stylers": [
                    {
                        "saturation": "-43"
					}
                    , {
                        "lightness": "-19"
					}
                    , {
                        "gamma": "1.87"
					}
				]
			}
            , {
                "featureType": "administrative.neighborhood"
                , "elementType": "labels.text"
                , "stylers": [
                    {
                        "weight": "3.96"
					}
                    , {
                        "gamma": "1.88"
					}
                    , {
                        "lightness": "-12"
					}
                    , {
                        "saturation": "-100"
					}
				]
			}
            , {
                "featureType": "landscape"
                , "elementType": "all"
                , "stylers": [
                    {
                        "color": "#f2f2f2"
					}
				]
			}
            , {
                "featureType": "poi"
                , "elementType": "all"
                , "stylers": [
                    {
                        "visibility": "off"
					}
				]
			}
            , {
                "featureType": "road"
                , "elementType": "all"
                , "stylers": [
                    {
                        "saturation": -100
					}
                    , {
                        "lightness": 45
					}
				]
			}
            , {
                "featureType": "road.highway"
                , "elementType": "all"
                , "stylers": [
                    {
                        "visibility": "simplified"
					}
				]
			}
            , {
                "featureType": "road.arterial"
                , "elementType": "labels.icon"
                , "stylers": [
                    {
                        "visibility": "off"
					}
				]
			}
            , {
                "featureType": "transit"
                , "elementType": "all"
                , "stylers": [
                    {
                        "visibility": "off"
					}
				]
			}
            , {
                "featureType": "water"
                , "elementType": "all"
                , "stylers": [
                    {
                        "color": "#000"
					}
                    , {
                        "visibility": "on"
					}
				]
			}
            , {
                "featureType": "water"
                , "elementType": "geometry"
                , "stylers": [
                    {
                        "saturation": "9"
					}
                    , {
                        "color": "#BBBBBB"
					}
				]
			}
		]
    };
    var mapElement = document.getElementById('contactMap');
    var map = new google.maps.Map(mapElement, mapOptions);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(41.112122, -73.416351)
        , map: map
        , title: 'Norwalk'
    });
}