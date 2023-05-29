import { data } from "./data.js";
let edges;
fetch("./edge.json", { method: "GET" })
  .then((response) => response.json())
  .then((data) => {
    edges = data;
    // console.log(edges);
  });
class GraphAdvanced {
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
    const startingNode = this.getVertexByID(v);
    const endingNode = this.getVertexByID(w);
    const x = endingNode.coor[0] - startingNode.coor[0];
    const y = endingNode.coor[1] - startingNode.coor[1];
    const weight = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    this.edge.get(v).edges.push({ w, weight });
    this.edge.get(w).edges.push({ w: v, weight });
  }
  getF(vertex) {
    // get f(x) of a vertex
    // console.log(this.edge.get(vertex).f);
    // console.log(vertex);
    return this.edge.get(vertex).f;
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
        if (tmpNode < lowestNode) {
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
        return path;
      }
      openList = this.popOpenList([...openList], openList[lowestIndex]);
      closedList.push(currentNode);
      const neighbors = this.edge.get(currentNode).edges;
      // console.log(neighbors);
      for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i].w;

        if (closedList.indexOf(neighbor) === -1) {
          let gScore = this.edge.get(currentNode).g;
          let gScoreIsBest = false;
          if (openList.indexOf(neighbor) === -1) {
            gScoreIsBest = true;
            this.edge.get(neighbor).h = this.heuristic(neighbor, endingNode);
            openList.push(neighbor);
          } else if (gScore < this.edge.get(neighbor).g) {
            gScoreIsBest = true;
          }
          if (gScoreIsBest) {
            this.edge.get(neighbor).previous = currentNode;
            this.edge.get(neighbor).g = gScore + neighbors[i].weight;
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
    console.log(d1 + d2);
    return d1 + d2;
  }
  getVertex() {
    return data;
  }
}

const graph = new GraphAdvanced();
const algo = (startingNode, endingNode) => {
  graph.addVertex();
  edges.forEach((edge) => {
    graph.addEdge(...edge);
  });

  const path = graph.aStar(startingNode, endingNode);

  return path;
};

export { algo };
