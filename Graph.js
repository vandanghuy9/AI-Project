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
    const x =
      Math.pow(endingNode.coor[0], 2) - Math.pow(startingNode.coor[0], 2);
    const y =
      Math.pow(endingNode.coor[1], 2) - Math.pow(startingNode.coor[1], 2);
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
    // const graphData = data.map(({ id, coor }) => coor);
    return data;
  }
}

const graph = new Graph();
const algo = () => {
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
  const foundVertex = graph.bfs(1, 21);
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
export { algo, drawGraph };
// [[a],[b],[c]]
