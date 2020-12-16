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
  //var earthquakes = new L.LayerGroup();
  var geojson;
  // Grab data with d3
d3.json(queryURL, function(data) {
  console.log(data)
  function Color(mag) {
    if (mag > 90) {
      return 'red'
    } 
    else if (mag > 70) {
      return 'darkorange'
    } 
    else if (mag > 50) {
      return 'tan'
    } 
    else if (mag > 30) {
      return 'yellow'
    } 
    else if (mag > 10) {
      return 'darkgreen'
    } 
    else {
      return 'lightgreen'
    }
  };
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
  geojson = L.geoJson(data, {
    onEachFeature : function(feature, layer) {
    console.log(feature)
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    },
    
    pointTolayer: function (feature, latlng) {
      return L.circleMarker(latlng, style(feature));
    }
  }).addTo(myMap)     

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    console.log(geojson)
    var div = L.DomUtil.create("div", "info legend");
    //var magnitude = geojson.options.
  //         colors = earthquakes.options.colors
  //         labels = [];
  }
})
    