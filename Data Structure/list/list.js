//构造list类
	function List(){
		//空数组，用来操作数据元素
		this.dataStore=[];
		this.listSize=0;
		this.pos=0;
		this.length=length;
		this.clear=clear;
		this.toString=toString;
		this.getElement=getElement;
		this.insert=insert;
		this.append=append;
		this.moveTo=moveTo;
		this.currPos=currPos;
		this.hasPre=hasPre;
		this.hasNext=hasNext;
		this.next=next;
		this.prev=prev;
		this.find=find;
		this.end=end;
		this.front=front;
		this.remove=remove;
		this.contains=contains;
	}
	//获取列表中元素个数
	function length(){
		return this.listSize;
	}

	//向列表中添加元素
	function append(ele){
		this.dataStore[this.listSize++]=ele;
	}

	//在列表中找到一个元素，并返回其索引位置
	function find(ele){
		for(var i=0;i<this.dataStore.length;i++){
			if(this.dataStore[i]==ele){
				return i;
			}
			else{
				return -1;
			}
		}
	}

	//从列表中删除元素
	function remove(ele){
		var index=this.find(ele);
		if(index>-1){
			this.dataStore.splice(index,1);
			this.listSize--;
			return true;
		}
		else{
			return false;
		}
	}

	//显示列表项
	function toString(){
		return this.dataStore;
	}

	function insert(ele,pre){
		var index=this.find(pre);
		if(index>-1){
			this.dataStore.splice(index,0,ele);
			this.listSize++;
			return true;
		}
		else{
			return false;
		}
	}

	//清空列表中的元素
	function clear(){
		delete this.dataStore;
		this.listSize=this.pos=0;
	}

	//判断给定值是否在列表里面
	function contains(ele){
		var index=this.find(ele);
		if(index>-1){
			return true;
		}
		else{
			return false;
		}
	}

	//遍历列表
	function front(){
		this.pos=0;
		return this.pos;		
	}
	function end(){
		this.pos=this.listSize-1;
		return this.pos;	
	}
	function prev(){
		--this.pos;
		return this.pos;	
	}
	function next(){
		if(this.pos<this.listSize){
			++this.pos;
			return this.pos;				
		}
	}
	function currPos(){
		return this.pos;
	}
	function moveTo(position){
		this.pos=position;
	}
	function getElement(){
		return this.dataStore[this.pos];
	}
	function hasNext(){
		return this.pos<this.listSize;
	}
	function hasPre(){
		return this.pos>=0;
	}


var names=new List();
names.append('1');
names.append('2');
names.append('3');
names.front();
console.log(names.getElement());
names.next();
console.log(names.getElement());