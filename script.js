import { algo } from "./Graph.js";
import { data } from "./data.js";
const start = () => {
  var map = L.map("map").setView([21.035556, 105.807778], 18);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  const marker = L.marker([21.035556, 105.807778]).addTo(map);
  const latlngs = [
    [21.03769, 105.80638],
    [21.03595, 105.80576],
    [21.03461, 105.80649],
    [21.03274, 105.80597],
    [21.0316, 105.8099],
    [21.03161, 105.80989],
    [21.03172, 105.81176],
    [21.03277, 105.81209],
    [21.03241, 105.81357],
    [21.03712, 105.81503],
    [21.03793, 105.81339],
  ];

  var boundary = L.polygon(latlngs, {
    delay: 400,
    //   dashArray: [10, 20],
    weight: 2,
    color: "black",
    paused: true,
    reverse: false,
    fill: false,
  }).addTo(map);
  map.addLayer(boundary);
  map.fitBounds(boundary.getBounds());

  const pathData = algo();
  const path = L.polyline(pathData, {
    delay: 400,
    //   dashArray: [10, 20],
    weight: 2,
    color: "black",
    paused: true,
    reverse: false,
    fill: false,
  }).addTo(map);
  map.addLayer(path);
  map.fitBounds(path.getBounds());
};

start();
