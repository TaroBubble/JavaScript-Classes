class singlyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    let node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = this.head;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  popTail() {
    if (!this.head) {
      return null;
    }
    let curr = this.head;
    let prev = curr;
    while (curr.next) {
      prev = curr;
      curr = curr.next;
    }
    this.tail = prev;
    this.tail.next = null;
    this.length--;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    }
    return curr;
  }

  popHead() {
    if (!this.head) {
      return null;
    }
    let curr = this.head;
    this.head = curr.next;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return curr;
  }

  pushFromHead(val) {
    let node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = this.head;
    } else{
      node.next = this.head;
      this.head = node;
    }
    this.length++;
    return this;
  }

  insert(index, val) {
    if (index < 0 || index > this.length) {
      return null;
    }
    if (index === this.length) {
      return !!this.push(val);
    }
    if (index === 0) {
      return !!this.pushFromHead(val);
    }

    let prevNode = this.getVal(index-1);
    let temp = prevNode.next;
    let node = new Node(val);
    prevNode.next = node;
    node.next = temp;
    this.length++;
    return true;
  }

  remove(index) {
    if (index < 0 || index > this.length) {
      return null;
    }
    if (index === this.length-1) {
      return this.popTail();
    }
    if (index === 0) {
      return this.popHead();
    }

    let prev = this.getVal(index-1);
    let curr = prev.next;
    prev.next = curr.next;
    this.length--;
    return curr;
  }

  getVal(index) {
    if (index >= this.length || index < 0) {
      return null;
    }
    let count = 0;
    let curr = this.head;
    while (count !== index) {
      curr = curr.next;
      count++;
    }
    return curr;
  }

  updateVal(index, val) {
    let node = this.getVal(index);
    if (node) {
      node.val = val;
      return true;
    }
    return false;
  }

  printList() {
    let curr = this.head;
    while (curr) {
      console.log(curr.val);
      curr = curr.next;
    }
  }

  reverse() {
    let prev = null;
    let pointer = this.head;
    this.head = this.tail;
    this.tail = pointer;
    while (pointer) {
      let temp = pointer.next;
      pointer.next = prev;
      prev = pointer;
      pointer = temp;
    }
    return this;
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

let first = new Node('Hi');
first.next = new Node('Kevin');
first.next.next = new Node('!');

let list = new singlyLinkedList();
list.push(90);

list.printList();
console.log(list.popHead());
list.printList();
list.push(100);
list.push(201);
list.push(250);
list.push(350);
list.printList();
list.insert(2, 50);
console.log('Break');
list.printList();
list.remove(2);
console.log('Break');
list.printList();
console.log('Break');
list.reverse();
list.printList();