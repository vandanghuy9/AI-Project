import { data } from "./data.js";
let edges;
fetch("./edge.json", { method: "GET" })
  .then((response) => response.json())
  .then((data) => {
    edges = data;
    // console.log(edges);
  });
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
    const oneWayVertex = [
      283, 257, 258, 259, 260, 261, 262, 202, 47, 48, 49, 50, 301, 306, 307,
      308, 313, 314, 315, 316,
    ]; // array that contains one-way edges's vertexs
    const startingNode = this.getVertexByID(v);
    const endingNode = this.getVertexByID(w);
    const x = endingNode.coor[0] - startingNode.coor[0];
    const y = endingNode.coor[1] - startingNode.coor[1];
    const weight = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    this.edge.get(v).edges.push({ w, weight });
    if (!oneWayVertex.includes(v)) {
      this.edge.get(w).edges.push({ w: v, weight });
    }
  }

  bfs(startingNode, endingNode) {
    let queue = [];
    let visited = {};
    queue.push(startingNode);
    visited[startingNode] = true;

    while (queue.length > 0) {
      const node = queue.shift();
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
    }
  }
  getVertex() {
    return data;
  }
}

const graph = new Graph();
const algo = (startingNode, endingNode) => {
  graph.addVertex();
  edges.forEach((edge) => {
    graph.addEdge(...edge);
  });
  const foundVertex = graph.bfs(startingNode, endingNode);

  let n = foundVertex;
  console.log(n);
  let path = [];
  while (n !== null && n !== undefined) {
    const coor = data.find((d) => d.id === n);

    path.push(coor.coor);
    n = graph.getEdge().get(n).previous;
  }

  return path;
};

const getVertex = () => graph.getVertex();
export { algo, getVertex };
// [[a],[b],[c]]
