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
    this.edge.get(v).edges.push(w);
    this.edge.get(w).edges.push(v);
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
        let n = edgeVertexs[i];
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
}

const algo = () => {
  const graph = new Graph();

  graph.addVertex();
  graph.addEdge(1, 2);
  graph.addEdge(2, 3);
  graph.addEdge(3, 4);
  graph.addEdge(4, 5);
  graph.addEdge(4, 6);
  graph.addEdge(6, 7);
  const foundVertex = graph.bfs(1, 7);
  let n = foundVertex;
  let path = [];
  while (n !== null) {
    const coor = data.find((d) => d.id === n);
    path.push(coor.coor);
    n = graph.getEdge().get(n).previous;
  }

  return path;
};

export { algo };
