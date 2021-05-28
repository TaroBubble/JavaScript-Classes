// using an array
/* let q = [];
q.push('First');
q.push('Second');
q.push('Third');
console.log(q.shift());
console.log(q.shift());
console.log(q.shift()); */

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  //from the back
  enqueue(val) {
    let node = new Node(val);
    if (this.size === 0 || !this.first) {
      this.first = node;
      this.last = node;
    } else {
      this.last.next = node;
      this.last = node;
    }
    return ++this.size;
  }
  //from the front
  dequeue() {
    if (this.size === 0 || !this.first) {
      return null;
    }
    let curr = this.first;
    if (this.size === 1 || this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    curr.next = null;
    this.size--;
    return curr.val;
  }

  print() {
    let curr = this.first;
    while (curr) {
      console.log(curr.val);
      curr = curr.next;
    }
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

let queue = new Queue();
queue.enqueue('First');
queue.enqueue('Second');
queue.enqueue('Third');
queue.print();
console.log('Now we dequeue');
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());