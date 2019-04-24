

class LinkedNode {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = new LinkedNode('head')
    this.head.next = this.head
    this.pointer = this.head
  }

  find(target) {
    let currNode = this.head
    while (currNode.data !== target) {
      currNode = currNode.next
    }
    return currNode
  }

  movePointer(n) {
    while (n > 0) {
      if (this.pointer.next.data === 'head') {
        this.pointer = this.pointer.next.next
      } else {
        this.pointer = this.pointer.next
      }
      n --
    }
  }

  insert(newNode, target) {
    const node = new LinkedNode(newNode)
    const item = this.find(target)
    node.next = item.next
    item.next = node
  }

  display() {
    let currNode = this.head
    while (currNode.next.data !== 'head') {
      console.log(currNode.next.data)
      currNode = currNode.next
    }
  }

  findPrevious(target) {
    let currNode = this.head
    while (currNode.next.data !== target) {
      currNode = currNode.next
    }
    return currNode
  }

  remove(target) {
    const node = this.find(target)
    const preNode = this.findPrevious(target)
    preNode.next = node.next
  }
}


const link = new LinkedList()
link.insert('shisongyan', 'head')
link.insert('cailele', 'shisongyan')
link.insert('caixiaojie', 'cailele')
link.movePointer(2)
console.log(link.pointer)
