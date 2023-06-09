

// Store our API endpoint as queryUrl.
var queryURL = "http://127.0.0.1:5000/restaurants"


// Perform a GET request to the query URL/
d3.json(queryURL).then(function(data) {


    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  var restaurants = new L.LayerGroup();
  // Create a baseMaps object.
  var baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
  
    // Create an overlay object to hold our overlay.
    var overlayMaps = {
      Restaurants: restaurants
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    var myMap = L.map("map", {
      center: [40.71, -74],
      zoom: 7,
      layers: [street, restaurants]
    });
          
     // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);

    

// Looping through the cities array, create one marker for each city, bind a popup containing its name and population, and add it to the map.
for (var i = 0; i < restaurants.length; i++) {
  var restaurant = restaurants[i];
  L.marker([restaurant.latitude, restaurant.longitude])
    .bindPopup(`<h1>${restaurant.name}</h1> <hr> <h3>Restaurant Type: ${restaurant.restaurant_type}</h3>`)
    .addTo(restaurants);
}


});


