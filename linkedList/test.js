//链表节点
function Node(element){
  this.element = element;
  this.next = null;
}

//定义链表类
function LList(){
  this.head = new Node("head");
  this.head.next = this.head;
  this.find = find;
  this.insert = insert;
  this.findPrevious = findPrevious;
  this.remove = remove;
  this.currentNode = this.head;
  //从链表当前节点向前移动n个节点
  this.advance = advance;    
  //当前链表中有多少个元素
  this.count = count;
  this.display = display;
}

//查找节点
function find(item){
  var currNode = this.head;
  while (currNode.element != item){
      currNode = currNode.next;
  }
  return currNode;
}

//插入新节点
function insert(newElement, item){
      var newNode = new Node(newElement);
      var current = this.find(item);
      newNode.next = current.next;
      current.next = newNode;
}

//查找当前节点的上一个节点
function findPrevious(item){
  var currNode = this.head;
  while (!(currNode.next == null) && (currNode.next.element != item)){
      currNode = currNode.next;
  }
  return currNode;
}

//移除当前节点
function remove(item){
  var prevNode = this.findPrevious(item);
  if(!(prevNode.next == null)){
      prevNode.next = prevNode.next.next;
  }
}

//向前移动n个节点
function advance(n){
  while (n>0){
      if(this.currentNode.next.element == "head"){
          this.currentNode = this.currentNode.next.next;
      }else{
          this.currentNode = this.currentNode.next;
      }        
      n--;
  }
}

//当前链表中有多少个元素
function count(){
  var node = this.head;
  var i = 0;
  while (!(node.next.element == "head")){
      node = node.next;
      i++;
  }
  return i;
}

//输出所有节点
function display(){
  var currNode = this.head;
  while (!(currNode.next == null) && !(currNode.next.element == "head")){
      document.write(currNode.next.element +  "&nbsp;");
      currNode = currNode.next;
  }
}

var person = new LList();
person.insert('1','head');
person.insert('2', '1');
person.insert('3', '2');
person.insert('4' , '3');
person.insert('5' , '4');
person.insert('6' , '5');
person.insert('7' , '6');
person.insert('8' , '7');
person.insert('9' , '8');
person.insert('10' , '9');


person.display();
document.write('<br>');

console.log(person, 'person')

var n = 3;
while (person.count() > 2){
  person.advance(n);
  person.remove(person.currentNode.element);
  person.display();
  document.write('<br>');
}