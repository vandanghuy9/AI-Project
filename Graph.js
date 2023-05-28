import { data } from "./data.js";
class Graph {
  constructor() {
    this.vertex = data.length;
    this.edge = new Map();
  }

  getEdge() {
    return this.edge;
  }
  addVertex() {
    for (let d of data) {
      this.edge.set(d.id, { edges: [], previous: null });
    }
  }

  getVertexByID(id) {
    const foundVertex = data.find((d) => d.id === id);
    if (!foundVertex) {
      return false;
    }
    return foundVertex;
  }

  addEdge(v, w) {
    const startingNode = this.getVertexByID(v);
    const endingNode = this.getVertexByID(w);
    const x = endingNode.coor[0] - startingNode.coor[0];
    const y = endingNode.coor[1] - startingNode.coor[1];
    const weight = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    this.edge.get(v).edges.push({ w, weight });
    this.edge.get(w).edges.push({ w: v, weight });
  }

  bfs(startingNode, endingNode) {
    let queue = [];
    let visited = {};
    queue.push(startingNode);
    visited[startingNode] = true;

    while (queue.length > 0) {
      const node = queue.shift();
      // console.log(node);
      const edgeVertexs = this.edge.get(node).edges;
      for (let i = 0; i < edgeVertexs.length; i++) {
        let n = edgeVertexs[i].w;
        if (n === endingNode) {
          this.edge.get(n).previous = node;
          return n;
        }
        if (visited[n] != true) {
          visited[n] = true;
          this.edge.get(n).previous = node;
          queue.push(n);
        }
      }
      // console.log(queue, visited);
    }
  }
  drawGraph() {
    const graphData = data.map(({ id, coor }) => coor);
    return graphData;
  }
  getVertex() {
    return data;
  }

  shortestPath(startingNode, endingNode) {}
}

const graph = new Graph();
const algo = (startingNode, endingNode) => {
  graph.addVertex();
  graph.addEdge(1, 2);
  graph.addEdge(2, 3);
  graph.addEdge(3, 4);
  graph.addEdge(4, 5);
  graph.addEdge(4, 6);
  graph.addEdge(6, 7);
  graph.addEdge(5, 8);
  graph.addEdge(8, 9);
  graph.addEdge(9, 10);
  graph.addEdge(10, 11);
  graph.addEdge(11, 12);
  graph.addEdge(12, 13);
  graph.addEdge(13, 14);
  graph.addEdge(14, 15);
  graph.addEdge(15, 16);
  graph.addEdge(16, 17);
  graph.addEdge(17, 18);
  graph.addEdge(18, 19);
  graph.addEdge(19, 20);
  graph.addEdge(20, 21);
  graph.addEdge(2, 22);
  graph.addEdge(22, 23);
  graph.addEdge(22, 24);
  graph.addEdge(24, 25);
  graph.addEdge(25, 26);
  graph.addEdge(24, 27);
  graph.addEdge(27, 28);
  graph.addEdge(28, 29);
  graph.addEdge(29, 30);
  graph.addEdge(30, 31);
  graph.addEdge(31, 32);
  graph.addEdge(28, 33);
  graph.addEdge(27, 34);
  graph.addEdge(34, 35);
  graph.addEdge(35, 36);
  graph.addEdge(34, 37);
  graph.addEdge(37, 38);
  graph.addEdge(37, 39);
  graph.addEdge(39, 40);
  graph.addEdge(40, 41);
  graph.addEdge(41, 42);
  graph.addEdge(42, 43);
  graph.addEdge(43, 44);
  graph.addEdge(44, 45);
  graph.addEdge(44, 46);
  graph.addEdge(41, 47);
  graph.addEdge(47, 48);
  graph.addEdge(48, 49);
  graph.addEdge(49, 50);
  graph.addEdge(50, 51);
  graph.addEdge(51, 52);
  graph.addEdge(16, 153);
  graph.addEdge(153, 154);
  graph.addEdge(154, 155);
  graph.addEdge(155, 156);
  graph.addEdge(155, 156);
  graph.addEdge(156, 157);
  graph.addEdge(157, 158);
  graph.addEdge(158, 159);
  graph.addEdge(159, 160);
  graph.addEdge(159, 170);
  graph.addEdge(169, 170);
  graph.addEdge(158, 169);
  //
  graph.addEdge(17, 161);
  graph.addEdge(168, 169);
  graph.addEdge(167, 168);
  graph.addEdge(166, 167);
  graph.addEdge(165, 166);
  graph.addEdge(164, 168);
  graph.addEdge(163, 164);
  graph.addEdge(163, 167);
  graph.addEdge(161, 163);
  graph.addEdge(161, 165);
  //
  graph.addEdge(5, 103);
  graph.addEdge(102, 103);
  graph.addEdge(94, 102);
  graph.addEdge(91, 92);
  graph.addEdge(87, 91);
  graph.addEdge(86, 87);
  graph.addEdge(87, 88);
  graph.addEdge(88, 89);
  graph.addEdge(88, 90);
  graph.addEdge(95, 96);
  //
  graph.addEdge(85, 86);
  graph.addEdge(85, 101);
  graph.addEdge(101, 97);
  graph.addEdge(97, 171);
  graph.addEdge(12, 171);
  graph.addEdge(94, 172);
  graph.addEdge(95, 172);
  graph.addEdge(95, 96);

  //
  graph.addEdge(85, 82);
  graph.addEdge(98, 101);
  graph.addEdge(82, 83);
  graph.addEdge(83, 84);
  graph.addEdge(81, 82);
  graph.addEdge(80, 81);
  graph.addEdge(79, 80);
  graph.addEdge(78, 79);
  graph.addEdge(65, 78);
  graph.addEdge(64, 65);
  graph.addEdge(64, 56);
  graph.addEdge(53, 56);
  graph.addEdge(53, 54);
  graph.addEdge(54, 55);
  graph.addEdge(16, 55);
  graph.addEdge(14, 60);
  graph.addEdge(54, 60);
  graph.addEdge(60, 61);
  graph.addEdge(61, 62);
  graph.addEdge(62, 109);
  graph.addEdge(109, 107);
  graph.addEdge(106, 107);
  graph.addEdge(105, 106);
  graph.addEdge(105, 104);
  graph.addEdge(100, 104);
  graph.addEdge(99, 173);
  graph.addEdge(98, 173);
  graph.addEdge(98, 101);
  graph.addEdge(56, 63);
  graph.addEdge(53, 59);
  graph.addEdge(54, 57);
  graph.addEdge(59, 57);
  graph.addEdge(57, 58);
  graph.addEdge(58, 56);
  graph.addEdge(55, 56);
  graph.addEdge(63, 66);
  graph.addEdge(78, 66);
  graph.addEdge(66, 67);
  //
  graph.addEdge(67, 111);
  graph.addEdge(111, 110);
  graph.addEdge(111, 114);
  graph.addEdge(113, 114);
  graph.addEdge(112, 113);
  graph.addEdge(110, 112);
  graph.addEdge(112, 115);
  graph.addEdge(68, 116);
  graph.addEdge(116, 117);
  graph.addEdge(68, 70);
  graph.addEdge(70, 126);
  graph.addEdge(126, 127);
  graph.addEdge(10, 125);
  graph.addEdge(125, 72);
  graph.addEdge(72, 128);
  graph.addEdge(126, 128);
  graph.addEdge(128, 129);
  graph.addEdge(127, 129);
  graph.addEdge(129, 142);
  graph.addEdge(142, 147);
  graph.addEdge(142, 144);
  graph.addEdge(20, 144);
  graph.addEdge(146, 147);
  graph.addEdge(146, 149);
  graph.addEdge(148, 149);
  graph.addEdge(149, 150);
  graph.addEdge(150, 152);
  graph.addEdge(18, 152);
  graph.addEdge(128, 130);
  graph.addEdge(129, 133);
  graph.addEdge(130, 133);
  graph.addEdge(130, 131);
  graph.addEdge(133, 134);
  graph.addEdge(131, 134);
  graph.addEdge(134, 135);
  graph.addEdge(135, 137);
  graph.addEdge(137, 139);
  graph.addEdge(142, 139);

  const foundVertex = graph.bfs(startingNode, endingNode);
  let n = foundVertex;
  let path = [];
  while (n !== null) {
    const coor = data.find((d) => d.id === n);
    path.push(coor.coor);
    // console.log(coor);
    n = graph.getEdge().get(n).previous;
  }

  return path;
};

const drawGraph = () => {
  return graph.drawGraph();
};
const getVertex = () => graph.getVertex();
export { algo, drawGraph, getVertex };
// [[a],[b],[c]]
