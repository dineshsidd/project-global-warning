d3.json("/icelevel", function(out_data){
  d3.select("#iceSpin").remove();
  var trace1 = {
    x: out_data["x"], 
    y: out_data["nh"], 
    line: {width: 0}, 
    marker: {color: "444"}, 
    mode: "lines", 
    name: "Lower Bound", 
    type: "scatter"
  };
  
  var trace2 = {
    x: out_data["x"], 
    y: out_data["sh"],
    fill: "tonexty", 
    fillcolor: "#006994", 
    line: {color: "white"}, 
    mode: "lines", 
    name: "Measurement", 
    type: "scatter"
  };
  
  var data = [trace1, trace2];
  var layout = {
    showlegend: false, 
    paper_bgcolor:'rgba(0,0,0,0)',
    plot_bgcolor:'rgba(0,0,0,0)',
    title:{ text: "Ice-level Observations ", font:{color :"white"}},
    xaxis: {
      gridcolor: 'gray', 
      tickfont: {color: '#8a95a8' },
      showgrid: true, 
      showline: true, 
      showticklabels: true, 
      zeroline: false
    }, 
    yaxis: {
      title:{ text: "Sea-Ice Extent (10^6 sq km)", font:{color :'#8a95a8'}},
      tickfont: {color: '#8a95a8' },
      gridcolor: "gray", 
      showgrid: true, 
      showline: true, 
      showticklabels: true, 
      zeroline: false
    }
  };
  Plotly.plot('icelevel', data, layout);
  });
  