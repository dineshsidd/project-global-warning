// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from seaLevelData.csv
d3.csv("seaice.csv", function(error, iceData) {

  // Throw an error if one occurs
  if (error) throw error;

  // Print the milesData
  console.log(iceData);

  // Format the date and cast the miles value to a number
  iceData.forEach(function(data) {
    data.Year = +data.Year;
    data.Extent = +data.Extent;

  });

  // Set the domain for the xScale function
  // d3.extent returns the an array containing the min and max values for the property specified
  var xScale = d3.scaleLinear()
    .range([0, chartWidth])
    .domain(d3.extent(iceData, data => data.Year));

  // Configure a linear scale with a range between the chartHeight and 0
  // Set the domain for the xLinearScale function
  var yScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([0, d3.max(iceData, data => data.Extent)]);
    

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
// Create axis functions
  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);

  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  chartGroup.append("g")
    // Define the color of the axis text
    .classed("black", true)
    .call(leftAxis);

  // Configure a drawLine function which will use our scales to plot the line's points
  var trace1 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8],
    y: [10, 15, null, 17, 14, 12, 10, null, 15],
    mode: 'lines+markers',
    connectgaps: true
  };
  
  var trace2 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8],
    y: [16, null, 13, 10, 8, null, 11, 12],
    mode: 'lines',
    connectgaps: true
  };
  
  var data = [trace1, trace2];
  
  // var layout = {
  //   title: 'Connect the Gaps Between Data',
  //   showlegend: false
  // };
  
  // Plotly.newPlot('myDiv', data, layout);
  
  //------------------------------------------------------------------------------------
  // var line1 = d3.line()
  //   .x(data => xScale(data.Year))
  //   .y(data => yScale(data.Extent));

  // // Append a path for line1
  // chartGroup.append("path")
  //   .data([iceData])
  //   .attr("d", trace1)
  //   .classed("line blue", true);

  // // Append a path for line1
  // chartGroup.append("path")
  //   .data([iceData])
  //   .attr("d", trace2)
  //   .classed("line blue", true);

  // Append axes titles
  chartGroup.append("text")
  .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top})`)
    .classed("x-Axis text", true)
    .text("Years (1978-2015)");

    // Append axes titles
  chartGroup.append("text")
    .attr("transform", `translate(${margin.left- 100}, ${chartHeight/2} )` + `rotate(270)`)
    .classed("y-Axis text", true)
    .text("Change in Ice Levels (10^6 sq km)")
    ;
    
});
