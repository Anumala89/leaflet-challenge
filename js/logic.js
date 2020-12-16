// Creating map object
var myMap = L.map("mapid", {
    center: [37.09, -95.71],
    zoom: 5
    //layers: [streetmap, earthquakes]
});
  
// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
  }).addTo(myMap);
  
 // Load in geojson data
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// variable to keep geojson layer
var geojson;

// function to change color according to depth
function Color(d) {
  if (d > 90) {
    return 'red'
  } 
  else if (d > 70) {
    return 'orange'
  } 
  else if (d > 50) {
    return "yellow"
  } 
  else if (d > 30) {
    return 'lightgreen'
  } 
  else if (d > 10) {
    return 'limegreen'
  } 
  else {
    return 'green'
  }
};

// grab data with d3
d3.json(queryURL, function(data) {
  console.log(data)

  // function to style the circle
  function style(feature) {
    return {
      radius: feature.properties.mag *4,
      fillOpacity: 0.75,
      color: "black",
      fillColor: Color(feature.geometry.coordinates[2]),
      weight: 1,
      opacity: 0
    };
  } 

  //Create a GeoJSON layer containing the features
  geojson = L.geoJson(data.features, {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
    pointTolayer: function (feature, latlng) {
      return L.circleMarker(latlng, style(feature));
    },
    onEachFeature : function(feature, layer) {
    console.log(feature)
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }
  }).addTo(myMap)     

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    
    var div = L.DomUtil.create("div", "info legend");
    var depth = [0, 10, 30, 50, 70, 90];
 
    for (var i = 0; i < depth.length; i++) {
      div.innerHTML +=
        '<i style = "background:'+ Color(depth[i] +1) +'"></i> ' +
        depth[i] + (depth[i + 1] ? '&ndash;'+ depth[i +1] +'<br>' :'+');
    }
    return div;
  };
 
  // Adding legend to the map
  legend.addTo(myMap);
});
    