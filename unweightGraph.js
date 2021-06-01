class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVert(value) {
    if (!this.adjacencyList[value]) this.adjacencyList[value] = [];
  }

  //for undirected graphs we add the 2 way connection, for directed graph we only add 1 way direction
  addEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push(vertex2);
      this.adjacencyList[vertex2].push(vertex1);
    }
  }

  removeEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
        (vertex) => vertex !== vertex2
      );
      this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
        (vertex) => vertex !== vertex1
      );
    }
  }

  removeVertex(vertex) {
    if (this.adjacencyList[vertex]) {
      while (this.adjacencyList[vertex].length > 0) {
        let poppedVertex = this.adjacencyList[vertex].pop();
        this.removeEdge(vertex, poppedVertex);
      }
      delete this.adjacencyList[vertex];
    }
  }

  dfsRecur(start) {
    let res = [];
    let visited = [];
    const adjList = this.adjacencyList;
    function dfsHelper(vert) {
      if (!vert) return null;
      res.push(vert);
      visited.push(vert);
      adjList[vert].forEach((neighbor) => {
        if (!visited.includes(neighbor)) {
          return dfsHelper(neighbor);
        }
      });
    }
    dfsHelper(start);
    return res;
  }
  //using a stack to keep the LIFO order of dfs. DFS = LIFO vs BFS = FIFO, so for dfs we can just use an array but use push/pop operation to keep the LIFO order
  dfsIter(start) {
    let stack = [start];
    let visited = [];
    let res = [];
    let popped;

    visited.push(start);

    while (stack.length) {
      popped = stack.pop();
      res.push(popped);
      this.adjacencyList[popped].forEach((neighbor) => {
        if (!visited.includes(neighbor)) {
          visited.push(neighbor);
          stack.push(neighbor);
        }
      });
    }
    return res;
  }

  //BFS = Queue FIFO so we will use an array with push/shift to achieve that order
  bfsIter(start) {
    let queue = [start];
    let visited = [];
    let res = [];
    let popped;

    visited.push(start);
    while (queue.length) {
      popped = queue.shift();
      res.push(popped);
      this.adjacencyList[popped].forEach((neighbor) => {
        if (!visited.includes(neighbor)) {
          visited.push(neighbor);
          queue.push(neighbor);
        }
      });
    }
    return res;
  }
}

let graphObj = new Graph();
graphObj.addVert("A");
graphObj.addVert("B");
graphObj.addVert("C");
graphObj.addVert("D");
graphObj.addVert("E");
graphObj.addVert("F");
graphObj.addEdge("A", "B");
graphObj.addEdge("A", "C");
graphObj.addEdge("B", "D");
graphObj.addEdge("C", "E");
graphObj.addEdge("D", "E");
graphObj.addEdge("D", "F");
graphObj.addEdge("E", "F");
console.log(graphObj.dfsIter("A"));
console.log(graphObj.dfsRecur("A"));
console.log(graphObj.bfsIter("A"));
