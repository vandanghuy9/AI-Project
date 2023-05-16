import { data } from "./data.js";
class Graph {
  constructor() {
    this.vertex = data.length;
    this.edge = new Map();
  }

  get getEdge() {
    return this.edge;
  }
  addVertex() {
    for (let d of data) {
      this.edge.set(d, { edges: [], previous: {} });
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

  bfs(startingNode) {
    let queue = [];
    let visited = {};
    queue.push(startingNode);
    while (queue.length > 0) {
      const node = queue.shift();
      console.log(node);
      for (let n in this.edge.get(node)) {
        if (!visited[n]) {
          visited[n] = true;
          queue.push(n);
        }
      }
    }
  }
}

const algo = () => {
  const graph = new Graph();

  graph.addVertex();
  console.log(graph.getEdge.keys);
  // graph.addEdge(
  //   {
  //     id: 2,
  //     coor: [21.03635, 105.80762],
  //   },
  //   {
  //     id: 3,
  //     coor: [21.0362, 105.80801],
  //   }
  // );
  // graph.addEdge(
  //   {
  //     id: 3,
  //     coor: [21.0362, 105.80801],
  //   },
  //   {
  //     id: 4,
  //     coor: [21.03622, 105.80814],
  //   }
  // );
  // graph.addEdge(
  //   {
  //     id: 4,
  //     coor: [21.03622, 105.80814],
  //   },
  //   {
  //     id: 5,
  //     coor: [21.03621, 105.80836],
  //   }
  // );
  // graph.addEdge(
  //   {
  //     id: 4,
  //     coor: [21.03622, 105.80814],
  //   },
  //   {
  //     id: 6,
  //     coor: [21.03589, 105.80823],
  //   }
  // );
  // graph.addEdge(
  //   {
  //     id: 6,
  //     coor: [21.03589, 105.80823],
  //   },
  //   {
  //     id: 7,
  //     coor: [21.03587, 105.8081],
  //   }
  // );

  // graph.bfs({
  //   id: 1,
  //   coor: [21.03673, 105.80696],
  // });
};

export { algo };
