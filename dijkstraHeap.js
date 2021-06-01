//going to use custome priority queue class that uses heap instead of an array to make the program run faster
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
    const queue = new MinBinaryHeap();
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

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class MinBinaryHeap {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    let node = new Node(val, priority);
    this.values.push(node);
    this.bubble();
  }

  bubble() {
    let index = this.values.length - 1;
    let node = this.values[index];
    while (index > 0) {
      //swap
      let parentIndex = Math.floor((index - 1) / 2);
      let parentVal = this.values[parentIndex];
      //if the parent priority is bigger or equal to the child priority break out the loop
      if (node.priority >= parentVal.priority) {
        break;
      }
      //if the child is bigger priority than parent swap
      [this.values[parentIndex], this.values[index]] = [
        this.values[index],
        this.values[parentIndex],
      ];
      index = parentIndex;
    }
    return this;
  }

  dequeue() {
    let min = this.values[0];
    let pop = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = pop;
      this.bubbledown();
    }
    return min;
  }

  bubbledown() {
    let index = 0;
    let len = this.values.length;
    let value = this.values[0];
    while (true) {
      let leftIndex = 2 * index + 1;
      let rightIndex = 2 * index + 2;
      let swap = null;
      let leftVal, rightVal;
      //check if out of bounds
      if (leftIndex < len) {
        leftVal = this.values[leftIndex];
        if (value.priority > leftVal.priority) {
          swap = leftIndex;
        }
      }
      if (rightIndex < len) {
        rightVal = this.values[rightIndex];
        if (
          (swap === null && rightVal.priority < value.priority) ||
          (swap !== null && rightVal.priority < this.values[swap].priority)
        ) {
          swap = rightIndex;
        }
      }
      //while loop break condition
      if (swap === null) {
        break;
      }
      [this.values[index], this.values[swap]] = [
        this.values[swap],
        this.values[index],
      ];
      //update index to correspond to the index of the swap value
      index = swap;
    }
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
