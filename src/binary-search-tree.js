const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/




class BinarySearchTree {

  constructor() {
    this.r = null
  }

  root() {
          return this.r
  }

  add(data) {
    const newNode = new Node(data)
    if (!this.r) {
      this.r = newNode
      return
    }

    let currentNode = this.r

    while(currentNode) {
      if(newNode.data < currentNode.data){
        if(!currentNode.left) {
          currentNode.left = newNode
          return
        }
        currentNode = currentNode.left
      } else {
        if(!currentNode.right) {
          currentNode.right = newNode
          return
        }
        currentNode = currentNode.right
      }
    }
  }

  has(data) {
    const queue = [this.r]
    while(queue.length){
      const node = queue.shift()
      

      if(node.left){
        queue.push(node.left)
      }

      if(node.right){
        queue.push(node.right)
      }
      if(data == node.data) {
        return true
      }
    }
    
    return false
  }

  find(data) {
    const queue = [this.r]
    while(queue.length){
      const node = queue.shift()
      if(data == node.data) {
        return node
      }
      if(node.left){
        queue.push(node.left)
      }
      if(node.right){
        queue.push(node.right)
      }
    }  
    return null
  }

  remove(/* data */) {
    throw new NotImplementedError('Not implemented');
    // remove line with error and write your code here
  }

  min() {
    const queue = [this.r]
    while(queue.length){
      const node = queue.shift()
      if(node.left){
        queue.push(node.left)
      } else {
        return node.data
      }
    }  
  }

  max() {
    const queue = [this.r]
    while(queue.length){
      const node = queue.shift()
      if(node.right){
        queue.push(node.right)
      } else {
        return node.data
      }
    }  
  }
}

module.exports = {
  BinarySearchTree
};