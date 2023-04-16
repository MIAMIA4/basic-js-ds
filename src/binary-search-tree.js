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
    
    function recFind(currentNode){
        if(currentNode == null){
            return null
        } else if(currentNode.data === data){
            return currentNode
        } else if(currentNode.data > data){
            return recFind(currentNode.left)
        } else {
            return recFind(currentNode.right)
        }
    } 
    return recFind(this.r)

}  

  remove(data) {
    function recFindDel(currentNode, prevNode){
      if(currentNode == null){
          return null
      } else if(currentNode.data === data){
          return {node: currentNode, prev: prevNode}
      } else if(currentNode.data > data){
          return recFindDel(currentNode.left, currentNode)
      } else {
          return recFindDel(currentNode.right, currentNode)
      }
  } 

  function deleteWOChild(node, prev){
      if(!prev){
          this.r = null
      } else {
          if(prev.left == node){
              prev.left = null
          } else {
              prev.right = null
          }
      }
  }

  function deleteOneChild(node, prev){
      let child
      if(node.left){
          child = node.left
      } else {
          child = node.right
      }
      if(!prev) {
          this.r = child
      } else {
          if(prev.left == node){
              prev.left = child
          } else {
              prev.right = child
          }
      }
  }

  function deleteTwoChild(node, prev){
      let prevChild = node
      let child = node.left
      if(child.right){
          while(child.right){
              prevChild = child
              child = child.right
          }
      }

      deleteOneChild.call(this, child)

      let leftChild = node.left
      let rightChild = node.right

      if(!prev){
          child.left = leftChild
          child.right = rightChild
          this.r = child
      } else {
          if(prev.left == node){
              child.left = leftChild
              child.right = rightChild
              prev.left = child
          } else {
              child.left = leftChild
              child.right = rightChild
              prev.left = child
          }
      }
  }

  let del = recFindDel(this.r, null)
  let node = del.node
  let prev = del.prev

  if(!node.left && !node.right){
      deleteWOChild.call(this, node, prev)
  } else if (!node.left && node.right || node.left && !node.right){
      deleteOneChild.call(this, node, prev)
  } else {
      deleteTwoChild.call(this, node, prev)
  }
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