//利用构造函数实现一个队列类
function Queue(){
	this.enqueue=enqueue;
	this.dequeue=dequeue;
	this.dataStore=[];
	this.front=front;
	this.end=end;
	this.toString=toString;
	this.empty=empty;
}

function enqueue(ele){
	this.dataStore.push(ele);
}

function dequeue(){
	return this.dataStore.shift();
}

function front(){
	return this.dataStore[0];
}

function end(){
	return this.dataStore[this.dataStore.length-1];
}

function toString(){
	var str='';
	for(var i=0;i<this.dataStore.length;i++){
		str+=this.dataStore[i]+'\n';
	}
	return str;
}

function empty(){
	if(this.dataStore.length==0){
		return true;
	}
	else{
		return false;
	}
}

//试验
var q=new Queue();
q.enqueue('one');
q.enqueue('two');
q.enqueue('three');
var a=q.toString();
console.log(a);
var b=q.dequeue();
console.log(b);
console.log(q.front());
console.log(q.end());
