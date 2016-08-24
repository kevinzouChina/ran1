//构造字典类的构造函数
function Dictionary(){
	this.datastore=new Array();
	this.add=add;
	this.remove=remove;
	this.showAll=showAll;
	this.count=count;
	this.clear=clear;
	this.sort=sort;
}

/**
 * 添加元素
 * @param  key   键值
 * @param value  对应的值
 */
function add(key,value){
	this.datastore[key]=value;
}

/**
 * 删除元素
 * @param  key 键值
 * 
 */
function remove(key){
	delete this.datastore[key];
}

/**
 * 展示所有元素
 *
 */
function showAll(){
	var arr= Object.keys(this.datastore);
	for(var i=0;i<arr.length;i++){
		console.log(arr[i]+"-->"+this.datastore[arr[i]]);
	}
}
/**
 * 获取字典中元素的个数
 * @return 元素个数总和
 */
function count(){
	var arr=Object.keys(this.datastore);
	return arr.length;
}

/**
 * 清除字典中所有元素
 * 
 */
function clear(){
	var arr=Object.keys(this.datastore);
	for(var i=0;i<arr.length;i++){
		delete this.datastore[arr[i]];
	}
}

function sort(){
	var arr=Object.keys(this.datastore).sort();
	for(var i=0;i<arr.length;i++){
		console.log(arr[i]+'------>>'+this.datastore[arr[i]]);	
	}
}
//试验
var dictionary=new Dictionary();
dictionary.add("a",1);
dictionary.add("c",3);
dictionary.add("b",2);
dictionary.showAll();
var countLength=dictionary.count()
dictionary.sort()

