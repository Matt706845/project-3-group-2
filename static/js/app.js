
// Load the API data
var queryURL = "http://127.0.0.1:5000/restaurants"
d3.json(queryURL).then(function(data) {
    // Get the unique restaurant types
    const restaurantTypes = [...new Set(data.map(restaurant => restaurant.restaurant_type))];
  
    // Populate the restaurant type dropdown
    const dropdown = d3.select("#selRestaurantType");
    dropdown.selectAll("option")
      .data(restaurantTypes)
      .enter()
      .append("option")
      .text(d => d);
  
    // Update the dashboard based on the selected restaurant type
    function updateDashboard(restaurantType) {
      // Filter restaurants based on the selected restaurant type
      var filteredRestaurants = data.filter(restaurant => restaurant.restaurant_type === restaurantType);
  
      // Clear the previous content
      var restaurantList = d3.select("#restaurant-list");
      console.log(restaurantList);
      restaurantList.html("");
  
      if (filteredRestaurants.length > 0) {
        // Display the restaurant names and ratings
        var restaurantBoxes = restaurantList.selectAll(".restaurant-box")
          .data(filteredRestaurants)
          .enter()
          .append("div")
          .attr("class", "restaurant-box");
  
        restaurantBoxes.append("h3")
          .text(d => d.name);
  
        restaurantBoxes.append("p")
          .html(d => `Average Rating: ${d.average_rating}`);
  
        // Prepare data for the bar chart
        var ratings = filteredRestaurants.map(restaurant => restaurant.average_rating);
        var colors = ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(255, 205, 86, 0.5)', 'rgba(153, 102, 255, 0.5)', 'rgba(255, 159, 64, 0.5)'];
        var chartData = {
          labels: filteredRestaurants.map(restaurant => restaurant.name),
          datasets: [{
            label: "Average Rating",
            data: ratings,
            backgroundColor: colors.slice(0, filteredRestaurants.length),
            borderColor: colors.slice(0, filteredRestaurants.length).map(color => color.replace('0.5', '1')),
            borderWidth: 1
          }]
        };
  
        // Clear previous chart
        var barChart = document.getElementById("barChart").getContext("2d");
        if (window.barChartInstance) {
          window.barChartInstance.destroy();
        }
  
        // Create the bar chart
        window.barChartInstance = new Chart(barChart, {
          type: "bar",
          data: chartData,
          options: {
            scales: {
              y: {
                beginAtZero: true,
                max: 5,
                stepSize: 1
              }
            },
            plugins: {
              legend: {
                display: false
              },
              title: {
                display: true,
                text: "Average Ratings by Restaurant"
              }
            }
          }
        });

        // Prepare data for the food review chart
var foodReviews = filteredRestaurants.map(restaurant => restaurant.food_review);
var foodReviewColors = ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 205, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)', 'rgba(255, 159, 64, 0.5)'];
var foodReviewChartData = {
  labels: filteredRestaurants.map(restaurant => restaurant.name),
  datasets: [{
    label: "Food Reviews",
    data: foodReviews,
    backgroundColor: foodReviewColors.slice(0, filteredRestaurants.length),
    borderColor: foodReviewColors.slice(0, filteredRestaurants.length).map(color => color.replace('0.5', '1')),
    borderWidth: 1
  }]
};
// Clear previous food review chart
var foodReviewChart = document.getElementById("foodReviewChart").getContext("2d");
if (window.foodReviewChartInstance) {
  window.foodReviewChartInstance.destroy();
}
// Create the food review chart
window.foodReviewChartInstance = new Chart(foodReviewChart, {
  type: "bar",
  data: foodReviewChartData,
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        stepSize: 1
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Food Reviews by Restaurant"
      }
    }
  }
});
      } else {
        // Display a message if no restaurants of the selected type are found
        restaurantList.html("<p>No restaurants found for the selected type.</p>");
      }
    }
    console.log(dropdown);
    // Add the change event listener to the dropdown
    dropdown.on("change", function(event) {
      var selectedRestaurantType = d3.select(this).property("value");
      console.log(selectedRestaurantType);
      updateDashboard(selectedRestaurantType);
    });
  
    // Initialize the dashboard with the first restaurant type
    var initialRestaurantType = restaurantTypes[0];
    dropdown.property("value", initialRestaurantType);
    updateDashboard(initialRestaurantType);
  }).catch(function(error) {
    console.log("Error loading JSON data:", error);
  });


  // Mapping the restaurant
  
// Store our API endpoint as queryUrl.
var queryURL = "http://127.0.0.1:5000/restaurants"

// Perform a GET request to the query URL/
d3.json(queryURL).then(function(data) {

    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
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
      zoom: 13,
      layers: [street, restaurants]
    });
          
     // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
    
// Looping through the cities array, create one marker for each city, bind a popup containing its name and population, and add it to the map.
for (var i = 0; i < data.length; i++) {
  var restaurant = data[i];
  console.log(restaurant)
  L.marker([restaurant.latitude, restaurant.longitude])
    .bindPopup(`<h1>${restaurant.name}</h1> <hr> <h3>Restaurant Type: ${restaurant.restaurant_type}</h3>`)
    .addTo(restaurants);
}
restaurants.addTo(myMap);

});


  
