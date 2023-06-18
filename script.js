import { getVertex } from "./Graph.js";
import { algo } from "./Graph.js";
let edges;
let clickNum = 0;
let userCoor = [],
  marker = [];
let path;
const edgeUrl = "./edge.json";
function getEdge(edgeUrl, cb) {
  fetch(edgeUrl)
    .then((response) => response.json())
    .then((result) => cb(result));
}
// console.log(edges);
var map = L.map("map").setView([21.035556, 105.807778], 18);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const findClosestVertex = ([lat, lng]) => {
  const data = getVertex();
  let foundVertex = {};
  let distance = 20;
  for (let i = 0; i < data.length; i++) {
    const x = data[i].coor[0] - lat;
    const y = data[i].coor[1] - lng;
    const checkDistance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    if (checkDistance < distance) {
      foundVertex = { ...data[i] };
      distance = checkDistance;
    }
  }
  return foundVertex;
};

const drawPath = ([a, b]) => {
  const startingNode = findClosestVertex(a);
  const endingNode = findClosestVertex(b);

  const pathData = algo(startingNode.id, endingNode.id);
  if (pathData.length > 0) {
    pathData.unshift(b);
    pathData.push(a);
    path = L.polyline(pathData, {
      delay: 400,
      weight: 2,
      color: "blue",
      paused: true,
      reverse: false,
      fill: false,
    }).addTo(map);
    map.addLayer(path);
    map.fitBounds(path.getBounds());
  } else {
    alert(`Can't find road to destination`);
  }
};

const drawEdge = ([a, b]) => {
  const pathData = [a, b];
  // console.log(pathData);
  const path = L.polyline(pathData, {
    delay: 400,
    weight: 2,
    color: "green",
    paused: true,
    reverse: false,
    fill: false,
  }).addTo(map);
  map.addLayer(path);
  map.fitBounds(path.getBounds());
};

const drawEntireGraph = () => {
  const vertexData = getVertex();
  vertexData.forEach(({ id, coor }) => {
    let popup = L.marker(coor, {
      title: id,
    }).addTo(map);
  });
};
const main = () => {
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
    weight: 2,
    color: "black",
    paused: true,
    reverse: false,
    fill: false,
  }).addTo(map);
  map.addLayer(boundary);
  map.fitBounds(boundary.getBounds());
  map.on("dblclick", (e) => {
    if (clickNum <= 2) {
      marker[clickNum] = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
      clickNum++;
      userCoor.push([e.latlng.lat, e.latlng.lng]);
      if (clickNum === 2) {
        drawPath(userCoor);
        clickNum++;
      }
    }
  });

  document.getElementById("btn").onclick = () => {
    if (map.hasLayer(path)) {
      map.removeLayer(path);
      map.removeLayer(marker[0]);
      map.removeLayer(marker[1]);
      clickNum = 0;
      userCoor = [];
      marker = [];
    }
  };
};
main();
// drawEntireGraph();
// getEdge(edgeUrl, (res) => {
//   edges = res;
//   const data = getVertex();
//   edges.forEach((edge) => {
//     console.log(edge);
//     let coor1 = data.find((vertex) => vertex.id === edge[0]).coor;
//     let coor2 = data.find((vertex) => vertex.id === edge[1]).coor;
//     drawEdge([coor1, coor2]);
//   });
// });
