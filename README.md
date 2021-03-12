# leaflet-challenge

Create a map using Leaflet that plots all of the earthquake from the dataset 

### Get Data 

The datasets are available at [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page in a number of different formats and updated every 5 minutes. Data can be selected with a click and will be in JSON format. For this assignment I pulled in the data using [this URL](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson) to visualize significant earthquakes in the past 30 days.


### Import & Visualize the Data

A map was created using Leaflet with plots of the earthquakes from the data set based on their longitude and latitude.

Data markers were used to reflect the magnitude of the earthquake by their size and depth of the earth by color. Earthquakes with higher magnitudes are made larger and earthquakes with greater depth are darker in color. Popups were included to provide additional information about the earthquake with a click on the marker and a legend was created to provide context for the map data.

The following is the map with plots of significant earthquakes in the past 30 days.

![alt text](https://github.com/Anumala89/leaflet-challenge/blob/main/image/earthquake.png?raw=true)






