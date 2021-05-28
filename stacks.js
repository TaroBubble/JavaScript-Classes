class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  //from front
  push(val) {
    let node = new Node(val);
    if (this.size === 0) {
      this.first = node;
      this.last = node;
    } else {
      let currFirstNode = this.first;
      this.first = node;
      this.first.next = currFirstNode;
    }
    return ++this.size;
  }
  //from front
  pop() {
    if (!this.first || this.size === 0) {
      return null;
    }
    let curr = this.first;
    if (this.size === 1 || this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return curr.val;
  }

  print() {
    let item = this.first;
    while (item) {
      console.log(item.val);
      item = item.next;
    }
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

let stack = new Stack();
stack.push(50);
stack.push(30);
stack.print();
stack.pop();
stack.pop();
console.log('After pop');
stack.print();
// you can use an array with push/pop shift/unshift, if you don't need to index the elements and all you want is to add and remove