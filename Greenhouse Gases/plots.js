

Plotly.newPlot("plot", data, layout);


// Part 5 - Working Pie Chart
var trace1 = {
  labels: ["Carbon Dioxide", "Methane", "Nitrous Oxide", "HFC, PFC, SF6",],
  values: [5270.7, 656.3, 360.5, 169.1],
  hole: .4,
  type: 'pie',
  hoverinfo: 'label + percent', 
};

var data = [trace1];

var layout = {
  title: "Global Greenhouse Gas Emissions by Gas, 2017 (epa.gov)",
};

Plotly.newPlot("plot", data, layout);

// reference link - https://www.epa.gov/sites/production/files/2019-04/documents/2019_fast_facts_508_0.pdf