import { algo, getVertex } from "./Graph.js";
// import { data } from "./data.js";
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
    // console.log(checkDistance);
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
  // console.log(startingNode, endingNode);
  const pathData = algo(startingNode.id, endingNode.id);
  pathData.unshift(b);
  pathData.push(a);
  const path = L.polyline(pathData, {
    delay: 400,
    weight: 2,
    color: "black",
    paused: true,
    reverse: false,
    fill: false,
  }).addTo(map);
  map.addLayer(path);
  map.fitBounds(path.getBounds());
};

const drawEntireGraph = () => {
  // const graphData = drawGraph();
  // console.log(graphData);
  // const path = L.polyline(graphData, {
  //   delay: 400,
  //   //   dashArray: [10, 20],
  //   weight: 2,
  //   color: "black",
  //   paused: true,
  //   reverse: false,
  //   fill: false,
  // }).addTo(map);
  // map.addLayer(path);
  // map.fitBounds(path.getBounds());
  const vertexData = getVertex();
  vertexData.forEach(({ id, coor }) => {
    let popup = L.marker(coor, {
      title: id,
    }).addTo(map);
  });
};
const main = () => {
  let clickNum = 0;
  let userCoor = [];
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
  map.on("dblclick", (e) => {
    const marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    clickNum++;
    userCoor.push([e.latlng.lat, e.latlng.lng]);
    if (clickNum === 2) {
      drawPath(userCoor);
    }
  });

  drawEntireGraph();
};

main();
