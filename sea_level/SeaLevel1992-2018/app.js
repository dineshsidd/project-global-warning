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
d3.csv("seaLevelData.csv", function(error, seaData) {

  // Throw an error if one occurs
  if (error) throw error;

  // Print the milesData
  console.log(seaData);

  // Format the date and cast the miles value to a number
  seaData.forEach(function(data) {
    data.year = +data.year;
    data.TOPEX_Poseidon = +data.TOPEX_Poseidon;
    data.Jason_1 = +data.Jason_1;
    data.Jason_2 = +data.Jason_2;
    data.Jason_3 = +data.Jason_3;
  });

  // Set the domain for the xScale function
  // d3.extent returns the an array containing the min and max values for the property specified
  var xScale = d3.scaleLinear()
    .range([0, chartWidth])
    .domain(d3.extent(seaData, data => data.year));

  // Configure a linear scale with a range between the chartHeight and 0
  // Set the domain for the xLinearScale function
  var yScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([-30, d3.max(seaData, data => data.Jason_3)]);
    

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
  var line1 = d3.line()
    .x(data => xScale(data.year))
    .y(data => yScale(data.TOPEX_Poseidon));

  var line2 = d3.line()
    .x(data => xScale(data.year))
    .y(data => yScale(data.Jason_1));

  var line3 = d3.line()
    .x(data => xScale(data.year))
    .y(data => yScale(data.Jason_2));

  var line4 = d3.line()
    .x(data => xScale(data.year))
    .y(data => yScale(data.Jason_3));

  // Append a path for line1
  chartGroup.append("path")
    .data([seaData])
    .attr("d", line1)
    .classed("line blue", true);

  // Append a path for line2
  chartGroup.append("path")
    .data([seaData])
    .attr("d", line2)
    .classed("line green", true);

  // Append a path for line3
  chartGroup.append("path")
    .data([seaData])
    .attr("d", line3)
    .classed("line yellow", true);

// Append a path for line4
  chartGroup.append("path")
    .data([seaData])
    .attr("d", line4)
    .classed("line red", true);

  // Append axes titles
  chartGroup.append("text")
  .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top})`)
    .classed("x-Axis text", true)
    .text("Years (1992-2018)");

    // Append axes titles
  chartGroup.append("text")
    .attr("transform", `translate(${margin.left- 100}, ${chartHeight/2} )` + `rotate(270)`)
    .classed("y-Axis text", true)
    .text("Change in Sea Level (mm)")
    ;
    
});
