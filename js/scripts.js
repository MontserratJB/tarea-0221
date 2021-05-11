// Mapa Leaflet
var mapa = L.map('mapid').setView([9.8, -84.25], 7);

// Definición de capa base
var capa_osm = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', 
  {
    maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
).addTo(mapa);	

// Definición de capa base2
var capa_dark = L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', 
  {
    maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }
).addTo(mapa);

// Definición de capa base3
var capa_esri = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
  {
    maxZoom: 19,
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }
).addTo(mapa);	

// Conjunto de capas base
var capas_base = {
  "OSM": capa_osm,
  "ESRI": capa_esri,
  "DARK": capa_dark
  };	    
	    
// Control de capas
control_capas = L.control.layers(capas_base).addTo(mapa);	

// Control de escala
L.control.scale().addTo(mapa);

// Capa vectorial de aeropuertos en formato GeoJSON
$.getJSON("https://raw.githubusercontent.com/MontserratJB/tarea-0221/master/ign/aeropuertowgs.geojson", function(geodata) {
  var capa_aero = L.geoJson(geodata, {
    style: function(feature) {
	  return {'Size': 1, 'color': "#CC0000", 'weight': 1, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Nombre</strong>: " + feature.properties.nom_ofi + "<br>" + "<strong>Codigo</strong>: " + feature.properties.codigo;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_aero, 'Aeropuertos');
});	

// Capa vectorial de linea de costa en formato GeoJSON
$.getJSON("https://raw.githubusercontent.com/MontserratJB/tarea-0221/master/ign/simplineacostawgs.geojson", function(geodata) {
  var capa_lcos = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#6699FF", 'weight': 2.5, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Linea de costa</strong>";
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_lcos, 'Linea de costa');
});	

// Capa vectorial de paramo en formato GeoJSON
$.getJSON("https://raw.githubusercontent.com/MontserratJB/tarea-0221/master/ign/paramowgs.geojson", function(geodata) {
  var capa_par = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#99FF99", 'weight': 2.5, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Categoría</strong>: " + feature.properties.categoria + "<br>" + "<strong>Area Ha</strong>: " + feature.properties.area_ha;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_par, 'Paramo');
});	