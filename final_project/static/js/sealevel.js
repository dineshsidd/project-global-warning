/*d3.json("/sealevel", function(x){
    var layout = {

        paper_bgcolor: "rgb(255,255,255)", 
        plot_bgcolor: "rgb(229,229,229)", 
        xaxis: {
          gridcolor: "rgb(255,255,255)", 
          showgrid: true, 
          showline: false, 
          showticklabels: true, 
          tickcolor: "rgb(127,127,127)", 
          ticks: "outside", 
          zeroline: false
        }, 
        yaxis: {
          gridcolor: "rgb(255,255,255)", 
          showgrid: true, 
          showline: false, 
          showticklabels: true, 
          tickcolor: "rgb(127,127,127)", 
          ticks: "outside", 
          zeroline: false
        }
      };
    Plotly.newPlot('sealevel', x,layout);
});*/

d3.json("/sealevel", function(out_data){
d3.select("#seaSpin").remove();
var trace1 = {
  x: out_data["x"], 
  y: out_data["lb"], 
  line: {width: 0}, 
  marker: {color: "444"}, 
  mode: "lines", 
  name: "Lower Bound", 
  type: "scatter"
};

var trace2 = {
  x: out_data["x"], 
  y: out_data["y"],
  fill: "tonexty", 
  fillcolor: "#006994", 
  line: {color: "white"}, 
  mode: "lines", 
  name: "Measurement", 
  type: "scatter"
};

var trace3 = {
  x: out_data["x"], 
  y: out_data["ub"],
  fill: "tonexty", 
  fillcolor: "#006994", 
  line: {width: 0}, 
  marker: {color: "444"}, 
  mode: "lines", 
  name: "Upper Bound", 
  type: "scatter"
}

var data = [trace1, trace2, trace3];
var layout = {
  showlegend: false, 
  paper_bgcolor:'rgba(0,0,0,0)',
  plot_bgcolor:'rgba(0,0,0,0)',
  title:{ text: "Sea-level Observations ", font:{color :"white"}},
  xaxis: {
    gridcolor: 'gray', 
    tickfont: {color: '#8a95a8' },
    showgrid: true, 
    showline: true, 
    showticklabels: true, 
    zeroline: false
  }, 
  yaxis: {
    title:{ text: "Sea-Height Variation(mm)", font:{color :'#8a95a8'}},
    tickfont: {color: '#8a95a8' },
    gridcolor: "gray", 
    showgrid: true, 
    showline: true, 
    showticklabels: true, 
    zeroline: false
  }
};
Plotly.plot('sealevel', data, layout);
});



d3.json("/meanTemp", function(out_data){
    d3.select("#meanSpin").remove();
    var trace1 = {
      x: out_data["x"], 
      y: out_data["lb"], 
      line: {width: 0}, 
      marker: {color: "444"}, 
      mode: "lines", 
      name: "Lower Bound", 
      type: "scatter"
    };
    
    var trace2 = {
      x: out_data["x"], 
      y: out_data["y"],
      fill: "tonexty", 
      fillcolor: "#914023", 
      line: {color: "white"}, 
      mode: "lines", 
      name: "Measurement", 
      type: "scatter"
    };
    
    var trace3 = {
      x: out_data["x"], 
      y: out_data["ub"],
      fill: "tonexty", 
      fillcolor: "#914023", 
      line: {width: 0}, 
      marker: {color: "444"}, 
      mode: "lines", 
      name: "Upper Bound", 
      type: "scatter"
    }
    
    var data = [trace1, trace2, trace3];
    var layout = {
      showlegend: false, 
      paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)',
      title:{ text: "Average Land Temprature", font:{color :"white"}},
      xaxis: {
        gridcolor: 'gray', 
        tickfont: {color: '#916251' },
        showgrid: true, 
        showline: true, 
        showticklabels: true, 
        zeroline: false
      }, 
      yaxis: {
        title:{ text: "Temprature Variation(°C)", font:{color :'#916251'}},
        tickfont: {color: '#916251' },
        gridcolor: "gray", 
        showgrid: true, 
        showline: true, 
        showticklabels: true, 
        zeroline: false
      }
    };
    Plotly.plot('meanTemp', data, layout);
    });