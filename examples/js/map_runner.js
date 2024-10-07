leaflet_container = L.DomUtil.get("map");
if (leaflet_container != null) {
  leaflet_container._leaflet_id = null;
}
leaflet_map = L.map("map").setView([37.229573, -80.413939], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(leaflet_map);

L.marker([37.229573, -80.413939])
  .addTo(leaflet_map)
  .bindPopup("<b>Rhaxonycha carolina</b><br />specimen")
  .openPopup();

L.circle([37.229573, -80.413939], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 500,
})
  .addTo(leaflet_map)
  .bindPopup("");

// leaflet_polygon = L.polygon([
// 	[37.229573, -80.45],
// 	[37.229573, -80.49],
// 	[37.229573, -80.40]
// ]).addTo(leaflet_map).bindPopup('');

// leaflet_popup = L.popup()
// 	.setLatLng([37.229573, -80.413939])
// 	.setContent('')
// 	.openOn(leaflet_map);

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent(`You clicked the map at ${e.latlng.toString()}`)
    .openOn(leaflet_map);
}

leaflet_map.on("click", onMapClick);
