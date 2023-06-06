// Load the JSON data
d3.json("restaurant_week_2018_final.json").then(function(data) {
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
      const filteredRestaurants = data.filter(restaurant => restaurant.restaurant_type === restaurantType);
  
      // Clear the previous content
      const restaurantList = d3.select("#restaurantList");
      restaurantList.html("");
  
      if (filteredRestaurants.length > 0) {
        // Display the restaurant names and ratings
        const restaurantBoxes = restaurantList.selectAll(".restaurant-box")
          .data(filteredRestaurants)
          .enter()
          .append("div")
          .attr("class", "restaurant-box");
  
        restaurantBoxes.append("h3")
          .text(d => d.name);
  
        restaurantBoxes.append("p")
          .html(d => `Average Rating: ${d.average_rating}`);
  
        // Prepare data for the bar chart
        const ratings = filteredRestaurants.map(restaurant => restaurant.average_rating);
        const colors = ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(255, 205, 86, 0.5)', 'rgba(153, 102, 255, 0.5)', 'rgba(255, 159, 64, 0.5)'];
        const chartData = {
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
        const barChart = document.getElementById("barChart").getContext("2d");
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
      } else {
        // Display a message if no restaurants of the selected type are found
        restaurantList.html("<p>No restaurants found for the selected type.</p>");
      }
    }
  
    // Add the change event listener to the dropdown
    dropdown.on("change", function() {
      const selectedRestaurantType = d3.select(this).property("value");
      updateDashboard(selectedRestaurantType);
    });
  
    // Initialize the dashboard with the first restaurant type
    const initialRestaurantType = restaurantTypes[0];
    dropdown.property("value", initialRestaurantType);
    updateDashboard(initialRestaurantType);
  }).catch(function(error) {
    console.log("Error loading JSON data:", error);
  });
  