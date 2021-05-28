class DLL {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  //print method
  print() {
    let curr = this.head;
    while (curr) {
      console.log(curr.val);
      curr = curr.next;
    }
  }

  push(val) {
    let node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else{
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  pop() {
    if (!this.head) {
      return null
    }
    let removeTail = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = removeTail.prev;
      this.tail.next = null;
      removeTail.prev = null;
    }
    this.length--;
    return removeTail;
  }
  //pop head
  shift() {
    if (!this.head) {
      return null;
    }
    let removedHead = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = removedHead.next;
      this.head.prev = null;
      removedHead.next = null;
    }
    this.length--;
    return this;
  }
  //add from head
  unshift(val) {
    let node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.length++;
    return this;
  }

  getVal(index) {
    if (index < 0 || index > this.length) {
      return null;
    }
    if (index <= this.length/2) {
      let count = 0;
      var curr = this.head;
      while (count !== index) {
        curr = curr.next;
        count++;
      }
    } else {
      let difference = this.length - index;
      let count = 0;
      var curr = this.tail;
      while (count !== difference) {
        curr = curr.prev;
        count++;
      }
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

  insert(index, val) {
    if (index < 0 || index > this.length) {
      return null;
    }
    if (index === 0) {
      return !!this.unshift(val);
    }
    if (index === this.length) {
      return !!this.push(val);
    }
    let prevNode = this.getVal(index-1);
    let node = new Node(val);
    let nextNode = prevNode.next;
    prevNode.next = node;
    node.prev = prevNode;
    node.next = nextNode;
    nextNode.prev = node;
    this.length++;
    return this;
  }

  remove(index) {
    if (index < 0 || index > this.length) {
      return null;
    }
    if (index === 0) {
      return !!this.shift();
    }
    if (index === this.length-1) {
      return !!this.pop();
    }
    let removeNode = this.getVal(index);
    let prevNode = removeNode.prev;
    let afterNode = removeNode.next;
    prevNode.next = afterNode;
    afterNode.prev = prevNode;
    removeNode.next = null, removeNode.prev = null;
    this.length--;
    return removeNode;
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

let list = new DLL();
list.push('Harry');
list.push('Ron');
list.push('Hermione');
console.log(list.length);
console.log(list.remove(2));
list.print();