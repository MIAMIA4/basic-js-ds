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
    function find(currentNode){
      if(currentNode == null){
          return false
      } else if(currentNode.data === data){
          return true
      } else if(currentNode.data > data){
          return find(currentNode.left)
      } else {
          return find(currentNode.right)
      }
  } 
  return find(this.r)

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
    
  function recDelFind(currentNode, prevNode){
      if(currentNode == null){
          return null
      } 
      if(currentNode.data == data){
          return {node: currentNode, prev: prevNode}
      }
      if(currentNode.data > data){
          return recDelFind(currentNode.left, currentNode)
      } else {
          return recDelFind(currentNode.right, currentNode)
      }
  } 

  function deleteWOChild(node, prev){
    if(prev == null){
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
    let newNode = null
    if(node.left){
      newNode = node.left
    } else if(node.right){
      newNode = node.right
    }
    if(prev == null) {
      this.r = newNode
    } else {
      if(prev.left == node){
        prev.left = newNode
      } else {
        prev.right = newNode
      }
    }
  }

  function deleteTwoChild(node, prev){
    let prevResult = node
    let result = node.left
    if(result.right){
      while(result.right){
        prevResult = result
        result = result.right
      }
    }

    deleteOneChild.call(this, result, prevResult)

    let leftNodeChild = node.left
    let rightNodeChild = node.right
    if(prev == null){
      result.left = leftNodeChild
      result.right = rightNodeChild
      this.r = result
    } else {
      if(prev.left == node){
        result.left = leftNodeChild
        result.right = rightNodeChild
        prev.left = result
      } else {
        result.left = leftNodeChild
        result.right = rightNodeChild
        prev.right = result
      }
    }
  }

  let result = recDelFind(this.r, null)
  let node = result.node
  let prev = result.prev

  if(!node.left && !node.right){
    deleteWOChild.call(this, node, prev)
  } else if(!node.left && node.right || node.left && !node.right){
    deleteOneChild.call(this, node, prev)
  } else {
    deleteTwoChild.call(this, node, prev)
  }
}  

min() {
  function minFind(currentNode){
    if(currentNode == null){
        return null
    } else if(currentNode.left){
        return minFind(currentNode.left)
    } else {
      return currentNode.data
    }
  } 
  return minFind(this.r)
}

  max() {
    function maxFind(currentNode){
      if(currentNode == null){
          return null
      } else if(currentNode.right){
          return maxFind(currentNode.right)
      } else {
        return currentNode.data
      }
    } 
    return maxFind(this.r)
  }
}

module.exports = {
  BinarySearchTree
};