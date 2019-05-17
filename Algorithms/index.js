

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

  length() {
    let length = 0
    let currNode = this.head
    while (currNode.next.data !== 'head') {
      currNode = currNode.next
      length += 1
    }
    return length
  }
}


class JosephusProblem {
  constructor(num, rule) {
    this.num = num
    this.rule = rule
  }

  generateSoldiers() {
    const link = new LinkedList()
    for (let i = 0; i < this.num; i++) {
      if (i === 0) {
        link.insert(`soldier-${i + 1}`, 'head')
      } else {
        link.insert(`soldier-${i + 1}`, `soldier-${i}`)
      }
    }
    return link
  }

  startKill(soldiers) {
    while (soldiers.length() !== 2) {
      soldiers.movePointer(this.rule)
      soldiers.remove(soldiers.pointer.data)
    }
    soldiers.display()
  }

  startGame() {
    const soldiers = this.generateSoldiers()
    const survivor = this.startKill(soldiers)
    return survivor
  }
}


const p = new JosephusProblem(41, 3)
p.startGame()
