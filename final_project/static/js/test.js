// Creating map object
var polygon_data ;
var myMap = L.map("map", {
 center: [0, 0],
 zoom: 3
});
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
 polygon_data = data;
var co2_data ;
d3.csv("../static/js/co2.csv", function(csv_data){
 console.log(csv_data);
co2_data= csv_data.map(function(x){
if ( x["2014"].length > 0){
 return x;
}
});
var geo_row ;
var final_data = [];
for ( x=0 ; x< co2_data.length ; x++ ){
 //polygon_data.filter(  )
console.log(co2_data[x]["Country Code"]);
geo_row={};
var geo_tab = polygon_data.features.filter(a=>a.properties.ISO_A3 == co2_data[x]["Country Code"] );  //Naga : Problem in the condition. it should be "==" instead "="
if(geo_tab){
geo_row = geo_tab[0];
};
let n = +co2_data[x]["2014"];
geo_row.properties.co2_2014 = co2_data[x]["2014"]=n.toFixed(2);
n=0;
n = +co2_data[x]["2013"];
geo_row.properties.co2_2013 = co2_data[x]["2013"]=n.toFixed(2);
n=0;
n = +co2_data[x]["2012"];
geo_row.properties.co2_2012 = co2_data[x]["2012"]=n.toFixed(2);
n=0;
n = +co2_data[x]["2011"];
geo_row.properties.co2_2011 = co2_data[x]["2011"]=n.toFixed(2);
n=0;
n = +co2_data[x]["2010"];
geo_row.properties.co2_2010 = co2_data[x]["2010"]=n.toFixed(2);
n=0;
n = +co2_data[x]["2009"];
geo_row.properties.co2_2009 = co2_data[x]["2009"]=n.toFixed(2);
n=0;
n = +co2_data[x]["2000"];
geo_row.properties.co2_2000 = co2_data[x]["2000"]=n.toFixed(2);
n=0;
n = +co2_data[x]["1990"];
geo_row.properties.co2_1990 = co2_data[x]["1990"]=n.toFixed(2);
final_data.push(geo_row);
}
console.log(final_data);
// console.log(final_data.[0].properties);
L.geoJSON(final_data,
 { 
    onEachFeature: function(feature, layer) {
    console.log(feature.properties);
   layer.bindPopup(feature.properties.ADMIN + ", " + feature.properties.ISO_A3 
   + "<br>Co2 Levels Per Capita:<br> (metric tons) <br>" + feature.properties.co2_2014);
 },
 
 style: function(feature)
{
    
    function getColor(d) {
        console.log(d);
    
    
        return d > 30 ? '#FF0000' :
        d > 20 ? '#FF1100' :
        d > 10  ? '#FF4600' :
        d > 5 ? '#FF9E00' :
        // d > 5 ? '#475c1f' :
        d > 1  ? '#FFC100' :
        // d > 20   ? '#FEB24C' :
        // d > 10   ? '#FED976' :
                   '#D4FF00';
};
 var geojsonMarkerOptions = {
    fillColor: getColor(feature.properties.co2_2014),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
  };
  return (feature,geojsonMarkerOptions);
 
//  function style(feature) {
//     return {
//         fillColor: "red",
//         weight: 2,
//         opacity: 1,
//         color: 'white',
//         dashArray: '3',
//         fillOpacity: 0.7
//     };
}
    
     
    
   
 
 
} ).addTo(myMap);
 
 
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0,1,5,10,20,30],
        labels = [];
        function getColor(d) {
            console.log(d);
        
        
            return d > 30 ? '#FF0000' :
            d > 20 ? '#FF1100' :
            d >10  ? '#FF4600' :
            d >5 ? '#FF9E00' :
            // d > 5 ? '#475c1f' :
            d >1  ? '#FFC100' :
            // d > 20   ? '#FEB24C' :
            // d > 10   ? '#FED976' :
                       '#D4FF00';
    };
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + ';width:10px;display:inline-block">&nbsp;</i> ' +
            grades[i] + (grades[i + 1] ? '&dash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};
legend.addTo(myMap);
});
});