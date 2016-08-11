//存放遍历到节点的数组
var arr=[];
var index=0;
//定时器变量
var time=null;

//获取对应节点
var pre=document.getElementsByClassName("order");
var wrap=document.getElementsByClassName("four")[0];

//构造一颗树
function CreateTree(){};
CreateTree.prototype={
	//前序遍历	
	preOrder:function(node){
		if(!(node == null)){
			arr.push(node);
			arguments.callee(node.firstElementChild);
			arguments.callee(node.lastElementChild);		
		}
	},
	//中序遍历
	inOrder:function(node){
		if(!(node == null)){
			arguments.callee(node.firstElementChild);
			arr.push(node);
			arguments.callee(node.lastElementChild);
		}		
	},
	//后序遍历
	lastOrder:function(node){
		if(!(node == null)){
			arguments.callee(node.firstElementChild);
			arguments.callee(node.lastElementChild);
			arr.push(node);
		}

	},

	//树的深度遍历
	treeOrder:function(node){
		if(!(node == null)){
			arr.push(node);
			for(var i=0;i<node.children.length;i++){
				arguments.callee(node.children[i]);	
			}
		}
	},

	//树的广度遍历
	breadOrder:function(node){
		if(node){
			arr.push(node);
			arguments.callee(node.nextElementSibling);
			node=arr[index++];
			arguments.callee(node.firstElementChild);
		}
	}		
}
CreateTree.prototype.constructor=CreateTree;

//实例化一棵树
var tree=new CreateTree();

//事件兼容性处理
function addEvent(ele,type,handle){
	if(ele.addEventListener){
		ele.addEventListener(type,handle,false);
	}
	else if(ele.attachEvent){
		ele.attachEvent("on"+type,handle);
	}
	else {
		ele["on"+type]=handle;
	}
}

//绑定事件
addEvent(pre[0],'click',function(){
	//初始化
	init();
	//得到遍历数组arr;
	tree.preOrder(wrap);
	//设置动画效果
	animation();
})

addEvent(pre[1],'click',function(){
	//初始化
	init();
	//得到遍历数组arr;
	tree.inOrder(wrap);
	//设置动画效果
	animation();
})

addEvent(pre[2],'click',function(){
	//初始化
	init();
	//得到遍历数组arr;
	tree.lastOrder(wrap);
	//设置动画效果
	animation();
})

addEvent(pre[3],'click',function(){
	//初始化
	init();
	//得到遍历数组arr;
	tree.treeOrder(wrap);
	//设置动画效果
	animation();
})

//树的广度遍历
addEvent(pre[4],'click',function(){
	//初始化
	init();
	//得到遍历数组arr;
	tree.breadOrder(wrap);
	//设置动画效果
	animation();
})

//动画效果
function animation(){
	var j=0;
	arr[0].style.background="red";
	time=setInterval(function(){
		j++;
		if(j<arr.length){
			arr[j-1].style.background="#fff";
			arr[j].style.background="red";
		}
		else{
			clearInterval(time);
			arr[arr.length-1].style.background="#fff";
		}

	},500)
}

//初始化处理
function init(){
	arr=[];
	clearInterval(time);
	var divs=document.getElementsByTagName("div");
	for(var i=0;i<divs.length;i++){
		divs[i].style.background="#fff";
	}
}