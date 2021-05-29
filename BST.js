class Node {
  constructor(val) {
    this.val = val;
    this.leftChild = null;
    this.rightChild = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(val) {
    let node = new Node(val);
    if(this.root === null) {
      this.root = node;
      return this;
    } else {
      let curr = this.root;
      while(true) {
        if(val === curr.val) {
          return null;
        }
        if(val < curr.val) {
          if(curr.leftChild === null) {
            curr.leftChild = node;
            return this;
          }
          curr = curr.leftChild;
        } else {
          if(curr.rightChild === null) {
            curr.rightChild = node;
            return this;
          }
          curr = curr.rightChild;
        }
      }
    }
  }

  contains(val) {
    let curr = this.root;
    if(!curr) {
      return false;
    }
    while(true) {
      if(curr.val === val) {
        return true;
      }
      if(val < curr.val) {
        if(curr.leftChild) {
          curr = curr.leftChild;
        } else{
          return false;
        }
      } else {
        if(curr.rightChild) {
          curr = curr.rightChild;
        } else{
          return false;
        }
      }
    }
  }

  search(val) {
    let curr = this.root;
    if(!curr) {
      return null;
    }
    while(true) {
      if(curr.val === val) {
        return curr;
      }
      if(val < curr.val) {
        if(curr.leftChild) {
          curr = curr.leftChild;
        } else{
          return null;
        }
      } else {
        if(curr.rightChild) {
          curr = curr.rightChild;
        } else{
          return null;
        }
      }
    }
  }

  //Traversals
  //Queue is BFS with FIFO
  //If you want the actual node objects instead of the value stored in the nodes
  //then you would just change bfsList.push(curr) instead bfsList.push(curr.val) works with N-ary trees
  bfs() {
    let q = [];
    let bfsList = [];
    let curr = this.root;
    q.push(curr);
    //while the q is not empty
    while(q.length) {
      curr = q.shift();
      bfsList.push(curr.val);
      if(curr.leftChild) {
        q.push(curr.leftChild);
      }
      if(curr.rightChild) {
        q.push(curr.rightChild);
      }
    }
    return bfsList;
  }

  //DFS with a stack 
  // DFS traversals are Pre-Order, Post-order, Inorder can be done Interitively with a data structure or Recursively
  // Pre order root -> left side root -> right side root
  // Post order left side root -> right side root -> root
  // In order left side root -> root -> right side root
  preorderRecur() {
    let visited = [];
    let curr = this.root;
    function helper(node) {
      visited.push(node.val);
      if(node.leftChild) helper(node.leftChild);
      if(node.rightChild) helper(node.rightChild);
    }
    helper(curr);
    return visited;
  }

  postorderRecur() {
    let visited = [];
    let curr = this.root;
    function helper(node) {
      if(node.leftChild) helper(node.leftChild)
      if(node.rightChild) helper(node.rightChild)
      visited.push(node.val);
    }
    helper(curr);
    return visited;
  }

  inorderRecur() {
    let visited = [];
    let curr = this.root;
    function helper(node) {
      if(node.leftChild) helper(node.leftChild);
      visited.push(node.val);
      if(node.rightChild) helper(node.rightChild);
    }
    helper(curr);
    return visited;
  }

}

/*          10
      5           13
  2       7    11     16*/
let tree = new BST();
tree.insert(10);
tree.insert(5);
tree.insert(2);
tree.insert(7);
tree.insert(13);
tree.insert(16);

console.log('This is Preorder: ');
console.log(tree.preorderRecur());
console.log('This is Postorder: ');
console.log(tree.postorderRecur());
console.log('This is Inorder: ');
console.log(tree.inorderRecur());