//构建node类
function  Node(element){
	this.element=element;
	this.next=null;
}

//构建linkedlist类
function Linkedlist(){
	this.head=new Node('head');
	this.find=find;
	this.insert=insert;
	this.remove=remove;
	this.display=display;
	this.findPre=findPre;
}

//查找节点
function find(item){
	var cur=this.head;
	while(cur.element != item){
		cur=cur.next;
	}
	return cur;
}

//查找前一个节点
function findPre(item){
	var cur=this.head;
	while(!(cur.next==null)&&(cur.next.element!=item)){
		cur=cur.next;
	}
	return cur;
}

//插入节点
function insert(ele,pre){
	//常见一个新的节点
	var newNode=new Node(ele);
	//找到前一个节点
	var preNode=this.find(pre);
	newNode.next=preNode.next;
	preNode.next=newNode;
}

//删除一个节点
function remove(node){
	var preNode=this.findPre(node);
	if(preNode.next!=null){
		preNode.next=preNode.next.next;
		preNode.next.next=null;
	}
}

//列举节点
function display(){
	var node=this.head;
	while(!(node.next==null)){
		console.log(node.next.element);
		node=node.next;
	}
}

//试验 
var list=new Linkedlist();
list.insert("one","head");
list.insert('two','one');
list.insert('three','two');
// list.display();
list.remove('two');
list.display();




