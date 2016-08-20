//用构造函数实现一个栈
function Stack(){
	this.dataStore=[];
	this.top=0;
	this.pop=pop;
	this.push=push;
	this.peek=peek;
	this.length=length;
	this.clear=clear;
}

//入栈
function push(ele){
	this.dataStore[this.top++]=ele;
}

//出栈
function pop(){
	return this.dataStore[--this.top];
}

//获取栈顶元素
function peek(){
	return this.dataStore[this.top-1];
}

//获取栈内元素总和
function length(){
	return this.top;
}

//清除栈内元素
function clear(){
	this.top=0
}

//试验
var s=new Stack();
s.push('one');
s.push('two');
s.push('three');
console.log('length'+s.length());
console.log(s.peek());
s.clear();
console.log(s.peek());


