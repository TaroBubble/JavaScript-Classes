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
    let index = this.values.length-1;
    let node = this.values[index];
    while(index > 0) {
      //swap
      let parentIndex = Math.floor((index-1)/2);
      let parentVal = this.values[parentIndex];
      //if the parent priority is bigger or equal to the child priority break out the loop
      if(node.priority >= parentVal.priority) {
        break;
      }
      //if the child is bigger priority than parent swap
      [this.values[parentIndex], this.values[index]] = [this.values[index], this.values[parentIndex]];
      index = parentIndex;
    }
    return this;
  }

  dequeue() {
    let min = this.values[0];
    let pop = this.values.pop();
    if(this.values.length > 0) {
      this.values[0] = pop;
      this.bubbledown();
    }
    return min;
  }

  bubbledown() {
    let index = 0;
    let len = this.values.length;
    let value = this.values[0];
    while(true) {
      let leftIndex = 2*index+1;
      let rightIndex = 2*index+2;
      let swap = null;
      let leftVal, rightVal;
      //check if out of bounds
      if(leftIndex < len) {
        leftVal = this.values[leftIndex];
        if (value.priority > leftVal.priority) {
          swap = leftIndex;
        }
      }
      if(rightIndex < len) {
        rightVal = this.values[rightIndex];
        if ((swap === null && rightVal.priority < value.priority) || (swap !== null && rightVal.priority < this.values[swap].priority)) {
          swap = rightIndex;
        }
      }
      //while loop break condition
      if(swap === null) {
        break;
      }
      [this.values[index], this.values[swap]] = [this.values[swap], this.values[index]];
      //update index to correspond to the index of the swap value
      index = swap;
    }
  }
}

let q = new MinBinaryHeap();
q.enqueue('High Fever', 4);
q.enqueue('Covid', 2);
q.enqueue('Flu', 3);
q.enqueue('Broken Arm', 2);
q.enqueue('Gunshot Wound', 1);
console.log(q.values);
console.log(q.dequeue());
console.log(q.values);