//we will use a priority queue that uses an array this can be faster if we used the priority queue we use the custome priority queue class that was written
class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2, weight) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push({ node: vertex2, weight });
      this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }
  }

  dijkstra(start, end) {
    if (!this.adjacencyList[start] || !this.adjacencyList[end]) {
      return null;
    }
    const queue = new PriorityQueue();
    let distances = {};
    let previous = {};
    let res = [];
    let min;
    //add vertex/nodes into data structures
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        queue.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        queue.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }
    //run code as long as queue is not empty
    while (queue.values.length) {
      min = queue.dequeue().val;
      if (min === end) {
        //done
        while (previous[min]) {
          res.push(min);
          min = previous[min];
        }
        break;
      }
      if (min || distances[min] !== Infinity) {
        for (let neighbor in this.adjacencyList[min]) {
          let neighborVertex = this.adjacencyList[min][neighbor];
          let currDistance = distances[min] + neighborVertex.weight;
          let nextNode = neighborVertex.node;
          if (currDistance < distances[nextNode]) {
            distances[nextNode] = currDistance;
            previous[nextNode] = min;
            queue.enqueue(nextNode, currDistance);
          }
        }
      }
    }
    return res.concat(start).reverse();
  }
}

let graph = new WeightedGraph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");
graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "F", 4);
graph.addEdge("D", "F", 1);
graph.addEdge("F", "E", 1);
graph.addEdge("D", "E", 3);
graph.addEdge("B", "E", 3);
//console.log(graph.adjacencyList);
console.log(graph.dijkstra("A", "E"));
