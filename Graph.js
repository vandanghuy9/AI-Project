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
      this.edge.set(d.id, { edges: [], previous: null, f: 0, g: 0, h: 0 });
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
      308, 313, 314, 315, 316, 269, 270, 271, 272, 273, 21, 323,
    ];
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
  getF(vertex) {
    // get f(x) of a vertex
    // console.log(this.edge.get(vertex).f);
    // console.log(vertex);
    return this.edge.get(vertex).f;
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
          this.edge.get(n).g = this.edge.get(node).g + edgeVertexs[i].weight;
          let foundVertex = n;
          let path = [];
          while (foundVertex !== null && foundVertex !== undefined) {
            const coor = data.find((d) => d.id === foundVertex);

            path.push(coor.coor);
            foundVertex = this.edge.get(foundVertex).previous;
          }
          const cost = this.edge.get(n).g;
          return { path, cost };
        }
        if (visited[n] != true) {
          visited[n] = true;
          this.edge.get(n).previous = node;
          this.edge.get(n).g = this.edge.get(node).g + edgeVertexs[i].weight;
          queue.push(n);
        }
      }
    }
  }
  popOpenList(openList, id) {
    return openList.filter((node) => node !== id);
  }
  aStar(startingNode, endingNode) {
    // console.log(startingNode, endingNode);
    let openList = [];
    let closedList = [];
    openList.push(startingNode);
    while (openList.length > 0) {
      let lowestIndex = 0; // find vertex that has the lowest f(x) to process
      for (let i = 0; i < openList.length; i++) {
        const tmpNode = this.getF(openList[i]);
        const lowestNode = this.getF(openList[lowestIndex]);
        if (tmpNode <= lowestNode) {
          lowestIndex = i;
        }
      }
      const currentNode = openList[lowestIndex]; // the next node is the node that has the lowest f(x)
      // console.log(currentNode);
      if (currentNode === endingNode) {
        let n = currentNode;
        let path = [];
        while (n !== null) {
          const coor = data.find((d) => d.id === n);
          path.push(coor.coor);
          n = this.edge.get(n).previous;
        }
        const cost = this.edge.get(currentNode).g;
        return { path, cost };
      }
      openList = this.popOpenList([...openList], openList[lowestIndex]);
      closedList.push(currentNode);
      const neighbors = this.edge.get(currentNode).edges;
      for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i].w;

        if (!closedList.includes(neighbor)) {
          //every visited node has the best f -> no need to return
          let gScore = this.edge.get(currentNode).g + neighbors[i].weight; // g(n-1)+c(n-1,n)
          let gScoreIsBest = false; // flag to check whether or not g(n) is the best for child's node
          if (!openList.includes(neighbor)) {
            gScoreIsBest = true;
            this.edge.get(neighbor).h = this.heuristic(neighbor, endingNode);
            openList.push(neighbor);
          } else if (gScore < this.edge.get(neighbor).g) {
            // if distance from start -> parent -> child < start -> child => found a new road to child
            gScoreIsBest = true;
          }
          if (gScoreIsBest) {
            this.edge.get(neighbor).previous = currentNode; // child's previous node is visited parent node
            this.edge.get(neighbor).g = gScore;
            this.edge.get(neighbor).f =
              this.edge.get(neighbor).g + this.edge.get(neighbor).h;
          }
        }
      }
    }
    return [];
  }

  heuristic(startingNodeID, endingNodeID) {
    const startingNode = this.getVertexByID(startingNodeID);
    const endingNode = this.getVertexByID(endingNodeID);
    const d1 = Math.abs(startingNode.coor[0] - endingNode.coor[0]);
    const d2 = Math.abs(endingNode.coor[1] - endingNode.coor[1]);
    // console.log(d1 + d2);
    return Math.sqrt(Math.pow(d1, 2) + Math.pow(d2, 2));
  }
  getVertex() {
    return data;
  }
}

const algo = (startingNode, endingNode) => {
  const graph = new Graph();
  graph.addVertex();
  edges.forEach((edge) => {
    graph.addEdge(...edge);
  });
  const path = graph.aStar(startingNode, endingNode);
  const bfsPath = graph.bfs(startingNode, endingNode);
  if (path && bfsPath) {
    return path.cost > bfsPath.cost ? bfsPath.path : path.path;
  }
  return -1;
};
const getVertex = () => {
  const graph = new Graph();
  return graph.getVertex();
};

export { algo, getVertex };
