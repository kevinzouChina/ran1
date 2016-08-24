//双向链表
function Node(element){
	this.element=element;
	this.next=null;
	this.previous=null;
}

//构建linkedlist类
function Linkedlist(){
	this.head=new Node('head');
	this.find=find;
	this.insert=insert;
	this.remove=remove;
	this.disReverse=disReverse;
	this.findLast=findLast;
}
//双向链表实现查找某个节点
function find(item){
	var cur=this.head;
	while(!(cur.next==null)&&(cur.element!=item)){
		cur=cur.next
	}
	return cur;
}

//双向链表实现插入一个节点
function insert(item,pre){
	var node=new Node(item);
	var pre=this.find(pre);
	node.next=pre.next;
	node.previous=pre;
	pre.next=node;
}

//双向链表实现删除一个节点
function remove(item){
	var cur=this.find(item);
	var pre=cur.previous;
	if(!(cur.next==null)){
		pre.next=cur.next;
		cur.next.previous=pre;
	}
	else{
		pre.next=null;
	}
	cur.next=null;
	cur.previous=null;	
}

//双向链表查找最后一个节点
function findLast(){
	var cur=this.head;
	while(!(cur.next==null)){
		cur=cur.next;
	}
	return cur;
}

//双向链表实现反向展示节点
function disReverse(){
	var cur=this.head;
	var lastNode=this.findLast();
	while(!(lastNode.previous==null)){
		console.log(lastNode.element)
		lastNode=lastNode.previous;
	}
}

//试验
var list=new Linkedlist();
list.insert('one','head');
list.insert('two','one');
list.insert('three','two');
list.disReverse();
list.remove('two');
list.disReverse();
