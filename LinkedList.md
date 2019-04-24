# JS 数据结构-链表

![image](https://note.youdao.com/yws/public/resource/175cec9ee8712c4046f442e505902260/xmlnote/WEBRESOURCE800a31a7255d1087b28346874659bf95/1413)

> 图片来源于百度

**数组**在大多数语言中都是非常重要的数据结构，使用频率非常高。对前端的重要性更是不言而喻。

然而数组不总是最佳的数据结构，因为，在很多编程语言中，数组的长度都是固定的，如果数组已被数据填满，再要加入新的元素是非常困难的。而且，对于数组的删除和添加操作，通常需要将数组中的其他元素向前或者向后平移，这些操作也是十分繁琐的。

然而，**JS 中数组却不存在上述问题**，主要是因为他们被**实现了成了对象**，但是与其他语言相比（比如 C 或 Java），它的**效率低**很多。

我们可以考虑使用链表(Linked-list) 来替代它，除了对数据的**随机访问**，链表几乎可以在任何可以使用一维数组的情况中。如果你正巧在使用 C 或者 Java 等高级语言，你会发现链表的表现要优于数组很多

### 那么链表到底是什么呢
> 链表由一个个的节点构成，每个节点由一个存储的数据块和一个指向下一个节点的引用（也称指针或链接）组成



### 链表与数组的差异点有哪些

- 链表中的元素是不连续的，而数组中的元素是连续的。
- 链表添加或移除元素的时候不需要移动其他元素，而数组需要(js 除外)。
- 链表需要指针，而数组不需要。
- 链表需要从表头开始迭代列表直到找到所需要的元素。数组则可以直接访问任何位置的任何元素。
- 两者都具有动态性。关于数组动态性。数组在 js 中是一个可以修改的对象，添加移除元素，它会动态的变化，但是成本很高，需要移动元素。在大多数语言中（比如 C 和 Java），数组的大小是固定的，想添加元素就要创建一个全新的数组，不能简单地往其中添加所需的元素。



#### 节点类的实现
```js
  class LinkedNode {
    constructor(data) {
      this.data = data   // 数据块
      this.next = null   // 指向下一个节点的引用
    }
  }
```
#### 链表类及方法的实现
```js
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
```

[一个简单的链表的使用场景](./JosephusProblem.md)

