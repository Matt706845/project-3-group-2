// Define the URL as a constant variable
//const dataURL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json('restaurant_week_2018_final.json').then(function(data) {
    var type_restaurants = [];
    var distinct_type = [];

    for (var i = 0; i < data.length; i++) {
        type_restaurants.push(data[i].restaurant_main_type);

        if (!distinct_type.includes(data[i].restaurant_main_type)) {
            distinct_type.push(data[i].restaurant_main_type);
        }
    }

    console.log(distinct_type);
});


/*// Initialize the dashboard at start up 
function initializeDashboard() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Use D3 to get sample names and populate the drop-down selector
    d3.json(dataURL).then((data) => {
        
        // Set a variable for the sample names
        let names = data.names;

        // Add samples to dropdown menu
        names.forEach((id) => {

            // Log the value of id for each iteration of the loop
            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value", id);
        });

        // Set the first sample from the list
        let firstSample = names[0];

        // Log the value of firstSample
        console.log(firstSample);

        // Build the initial plots
        buildMetadata(firstSample);
        buildBarChart(firstSample);
        buildBubbleChart(firstSample);
        buildGaugeChart(firstSample);

    });
};

// Function that populates metadata info
function buildMetadata(sample) {

    // Use D3 to retrieve all of the data
    d3.json(dataURL).then((data) => {

        // Retrieve all metadata
        let metadata = data.metadata;

        // Filter based on the value of the sample
        let sampleData = metadata.filter(result => result.id == sample);

        // Log the array of metadata objects after they have been filtered
        console.log(sampleData)

        // Get the first index from the array
        let sampleMetadata = sampleData[0];

        // Clear out metadata
        d3.select("#sample-metadata").html("");

        // Use Object.entries to add each key/value pair to the panel
        Object.entries(sampleMetadata).forEach(([key, value]) => {

            // Log the individual key/value pairs as they are being appended to the metadata panel
            console.log(key, value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};

// Function that builds the bar chart
function buildBarChart(sample) {

    // Use D3 to retrieve all of the data
    d3.json(dataURL).then((data) => {

        // Retrieve all sample data
        let sampleInfo = data.samples;

        // Filter based on the value of the sample
        let sampleData = sampleInfo.filter(result => result.id == sample);

        // Get the first index from the array
        let valueData = sampleData[0];

        // Get the otu_ids, labels, and sample values
        let otuIds = valueData.otu_ids;
        let otuLabels = valueData.otu_labels;
        let sampleValues = valueData.sample_values;

        // Log the data to the console
        console.log(otuIds, otuLabels, sampleValues);

        // Set top ten items to display in descending order
        let yTicks = otuIds.slice(0, 10).map(id => `OTU ${id}`).reverse();
        let xTicks = sampleValues.slice(0, 10).reverse();
        let labels = otuLabels.slice(0, 10).reverse();
        
        // Set up the trace for the bar chart
        let trace = {
            x: xTicks,
            y: yTicks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        // Set up the layout
        let layout = {
            title: "Top 10 OTUs Present"
        };

        // Call Plotly to plot the bar chart
        Plotly.newPlot("bar", [trace], layout)
    });
};

// Function that builds the bubble chart
function buildBubbleChart(sample) {

    // Use D3 to retrieve all of the data
    d3.json(dataURL).then((data) => {
        
        // Retrieve all sample data
        let sampleInfo = data.samples;

        // Filter based on the value of the sample
        let sampleData = sampleInfo.filter(result => result.id == sample);

        // Get the first index from the array
        let valueData = sampleData[0];

        // Get the otu_ids, labels, and sample values
        let otuIds = valueData.otu_ids;
        let otuLabels = valueData.otu_labels;
        let sampleValues = valueData.sample_values;

        // Log the data to the console
        console.log(otuIds, otuLabels, sampleValues);
        
        // Set up the trace for the bubble chart
        let trace = {
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otuIds,
                colorscale: "Earth"
            }
        };

        // Set up the layout
        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        // Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [trace], layout)
    });
};

// Function that updates dashboard when sample is changed
function optionChanged(value) { 

    // Log the new value
    console.log(value); 

    // Call all functions 
    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
    buildGaugeChart(value);
};

// Call the initializeDashboard function
initializeDashboard();

*/
