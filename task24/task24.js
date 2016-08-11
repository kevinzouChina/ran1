//获取元素
var four=document.getElementsByClassName("four");
var btn=document.getElementsByClassName("button");
var inquire=document.getElementsByClassName("inquire");
var content=document.getElementsByClassName("content")[0];
var theDelete=document.getElementById("delete");
var theText=document.getElementById("theText");
var add=document.getElementById("add");
var arr=[];
var index=0;
var timer=null;

//事件兼容性处理
function addEvent(ele,type,handle){
	if(ele.addEventListenter){
		ele.addEventListenter(type,handle);
	}

	else if(ele.attachEvent){
		ele.attachEvent("on"+type,handle);
	}
	else{
		ele["on"+type]=handle;
	}
}

//创建树构造器
function CreateTree(){};
CreateTree.prototype={
	//深度优先排序
	deepOrder:function(node){
		if(node){
			arr.push(node);
			for(var i=0;i<node.children.length;i++){
				arguments.callee(node.children[i]);
			}
		}
	},

	rangeOrder:function(node){
		if(node){
			arr.push(node);
			arguments.callee(node.nextElementSibling);
			node=arr[index++];
			arguments.callee(node.firstElementChild)
		}
	}
}

//动画效果
function animation1(){
	var j=0;
	arr[j].style.background="red";
	timer=setInterval(function(){
		j++;
		if(j<arr.length){
			arr[j-1].style.background="#fff";
			arr[j].style.background="red";			
		}
		else{
			arr[arr.length-1].style.background="#fff";
		}
	},500)
}

function animation(){
	var j=0;
	arr[j].style.background="red";
	timer=setInterval(function(){
		j++;
		if(j<arr.length){
			arr[j-1].style.background="#fff";
			arr[j].style.background="red";			
		}
	},500)
}

//初始化
function inti(){
	clearInterval(timer);
	if(arr.length!==0){
		for(var i=0;i<arr.length;i++){
			arr[i].style.background="#fff";
		}
	}
	arr=[];
}
var tree=new CreateTree();

//深度遍历事件绑定
addEvent(btn[0],"click",function(){
	inti();
	tree.deepOrder(four[0]);
	animation1();
})

//广度遍历事件绑定
addEvent(btn[1],"click",function(){
	inti();
	tree.rangeOrder(four[0]);
	animation1();
})


function toInquire(handle){
	if(content.value==""){
		alert("请输入要查询字符");
	}
	else{
		var flag;
		var value=content.value;
		inti();
		handle(four[0]);
		for(var i=0;i<arr.length;i++){
			var innerValue=arr[i].firstChild.nodeValue;
			if(innerValue.indexOf(value)!==-1){
				flag=false;
				arr.length=i+1;
				break;		
			}
			else{
				flag=true;
			}
		}
		if(flag){
			animation();
			setTimeout(function(){
				arr[arr.length-1].style.background="#fff";
				alert("该字符不存在，请重新输入!");				
			},arr.length*500);
		}
		else{
			animation();
		}		
	}
}

//选中某个节点
function toSelect(event){
	var divs=document.getElementsByTagName("div");
	event=event || window.event;
	var theTarget=event.target || event.srcElement;
	for(var i=0;i<divs.length;i++){
		divs[i].style.background="#fff";
	}
	theTarget.style.background="yellow";
}

//删除选中节点
function toDelete(){
	var divs=document.getElementsByTagName("div");
	for(var i=0;i<divs.length;i++){
		if(divs[i].style.background=="yellow"){
			divs[i].parentNode.removeChild(divs[i]);
		}
	}	
}

//添加节点
function toAdd(){
	if(theText.value==""){
		alert("请先添加节点中的内容");
	}
	else{
		var theValue=theText.value;
		var divs=document.getElementsByTagName("div");
		for(var i=0;i<divs.length;i++){
			if(divs[i].style.background=="yellow"){
				var theDiv=document.createElement("div");
				theDiv.innerText=theValue;
				divs[i].appendChild(theDiv);
				theText.value="";
			}
		}		
	}
}

//事件处理
addEvent(inquire[0],"click",function(){toInquire(tree.deepOrder)})
addEvent(inquire[1],"click",function(){toInquire(tree.rangeOrder)})
addEvent(four[0],"click",toSelect);
addEvent(theDelete,"click",toDelete);
addEvent(add,"click",toAdd);


