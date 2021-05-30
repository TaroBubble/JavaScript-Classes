class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  insert(val) {
    this.values.push(val);
    this.bubble(this.values.indexOf(val));
    return this;
  }

  bubble(index) {
    let parentIndex = Math.floor((index-1)/2);
    let currIndex = index;
    while(this.values[currIndex] > this.values[parentIndex]) {
      //swap
      [this.values[parentIndex], this.values[currIndex]] = [this.values[currIndex], this.values[parentIndex]];
      currIndex = parentIndex;
      parentIndex = Math.floor((currIndex-1)/2);
    }
    return this;
  }

  remove() {
    //swap first value with last
    let max = this.values[0];
    let pop = this.values.pop();
    if(this.values.length > 0) {
      this.values[0] = pop;
      this.bubbledown();
    }
    return max;
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
        if (value < leftVal) {
          swap = leftIndex;
        }
      }
      if(rightIndex < len) {
        rightVal = this.values[rightIndex];
        if ((swap === null && rightVal > value) || (swap !== null && rightVal > this.values[swap])) {
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

  print() {
    for (let i = 0; i<this.values.length; i++) {
      console.log(this.values[i]);
    }
  }
}

let heap = new MaxBinaryHeap();
heap.insert(41);
heap.insert(39);
heap.insert(33);
heap.insert(18);
heap.insert(27);
heap.insert(12);
heap.insert(55);
console.log(heap.values);
console.log(heap.remove());
console.log(heap.values);
console.log(heap.remove());
console.log(heap.values);