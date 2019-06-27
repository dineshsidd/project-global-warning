// Creating map object

var myMap = L.map("map", {
  center: [0, 0],
  zoom: 1.5
});

//myMap.invalidateSize();

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// Link to GeoJSON
var APILink = "http://data.beta.nyc//dataset/d6ffa9a4-c598-4b18-8caf-14abde6a5755/resource/74cdcc33-512f-439c-" +
"a43e-c09588c4b391/download/60dbe69bcd3640d5bedde86d69ba7666geojsonmedianhouseholdincomecensustract.geojson";

var geojson;
var url = "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";


d3.json(url , function(data){
  var polygon_data= {} ;
   polygon_data.type = data.type;
   polygon_data.features = [];
var co2_data ;
d3.csv("js/co2.csv", function(csv_data){
 co2_data= csv_data.map(function(x){
if ( x["2014"].length > 0){
  return x;
}
});

var geo_row ;
var final_data = [];
for ( x=0 ; x< co2_data.length ; x++ ){
  //polygon_data.filter(  )
geo_row={};
/*var geo_tab = polygon_data.features.filter(a=>a.properties.ISO_A3 = co2_data[x]["Country Code"] );
if(geo_tab){
geo_row = geo_tab[0];
};
geo_row.properties.co2_value = co2_data[x]["2014"];
final_data.push(geo_row);
}
*/
if (
data.features.filter(a=>a.properties.ISO_A3 === co2_data[x]["Country Code"] )[0]){
let n = +co2_data[x]["2014"];
data.features.filter(a=>a.properties.ISO_A3 === co2_data[x]["Country Code"] )[0].properties.co2_vlaue = n.toFixed(2);
polygon_data.features.push(data.features.filter(a=>a.properties.ISO_A3 === co2_data[x]["Country Code"] )[0]);
}
}

function getColor(d) {
  console.log(d);
  return d > 8 ? '#FF0000' :
         d > 7 ? '#FF1100' :
         d > 6 ? '#FF4600' :
         d > 5 ? '#FF9E00' :
         d > 4 ? '#FFAF00' :
         d > 2 ? '#FFC100' :
         d > 0 ? '#E5FF00' :
                 '#D4FF00';
};



console.log(polygon_data);
// Grab data with d3

/*
  geojson = L.choropleth(polygon_data, {
   

    // Define what  property in the features to use
    valueProperty: "co2_value",

    // Set color scale
    scale: ["#ffffb2", "#b10026"],

    // Number of breaks in step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.ADMIN + ", " + feature.properties.ISO_A3 + "<br>Co2 Levels:<br>" +
         feature.properties.co2_vlaue);
    }
  }).addTo(myMap);
*/

  function style(feature) {
    console.log(feature.properties.co2_vlaue,feature.properties.ADMIN );
    return {
        fillColor: getColor(feature.properties.co2_vlaue),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

L.geoJson(polygon_data, {
  style: style,
  onEachFeature: function(feature, layer) {
    layer.bindPopup(feature.properties.ADMIN + ", " + feature.properties.ISO_A3 + "<br>Co2 Levels Per Capita:<br> (metric tons) <br>" +
       feature.properties.co2_vlaue);
  }

}).addTo(myMap);
/*
  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = [1,2,3,4,5,6,7,8,9,10] ; // geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];
   console.log(limits);
   console.log(colors);
    // Add min & max
    var legendInfo = "<h1>Co2 Levels</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);
*/
});


});



