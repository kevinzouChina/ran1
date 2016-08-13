//将字符串转成DOM节点的方法
var theTree=document.getElementsByClassName("tree")[0];
function htmlStr(ele,str){
	ele.innerHTML=str;
}

var theInput=document.getElementById("content");
var theSeach=document.getElementById("seach");
var theDelete=document.getElementById("delete");
var arr=[];
var timer=null;
var temport=
			'<div class="one div"><span class="icon"></span>食物<span class="chachajia"><i class="iconfont icon-jia"></i><i class="iconfont icon-chacha"></i></span>\
				<div class="two div"><span class="icon"></span>水果<span class="chachajia"><i class="iconfont icon-jia"></i><i class="iconfont icon-chacha"></i></span>\
					<div class="three div"><span class="icon"></span>苹果<span class="chachajia"><i class="iconfont icon-jia"></i><i class="iconfont icon-chacha"></i></span></div>\
					<div class="three div"><span class="icon"></span>香蕉<span class="chachajia"><i class="iconfont icon-jia"></i><i class="iconfont icon-chacha"></i></span></div>\
					<div class="three div"><span class="icon"></span>葡萄<span class="chachajia"><i class="iconfont icon-jia"></i><i class="iconfont icon-chacha"></i></span>\
						<div class="four div"><span class="icon"></span>水晶葡萄<span class="chachajia"><i class="iconfont icon-jia"></i><i class="iconfont icon-chacha"></i></span></div>\
					</div>\
				</div>\
				<div class="two div"><span class="icon"></span>蔬菜<span class="chachajia"><i class="iconfont icon-jia"></i><i class="iconfont icon-chacha"></i></span>\
					<div class="three div"><span class="icon"></span>包菜<span class="chachajia"><i class="iconfont icon-jia"></i><i class="iconfont icon-chacha"></i></span></div>\
					<div class="three div"><span class="icon"></span>白菜<span class="chachajia"><i class="iconfont icon-jia"></i><i class="iconfont icon-chacha"></i></span></div>\
					<div class="three div"><span class="icon"></span>萝卜<span class="chachajia"><i class="iconfont icon-jia"></i><i class="iconfont icon-chacha"></i></span>\
						<div class="four div"><span class="icon"></span>红萝卜<span class="chachajia"><i class="iconfont icon-jia"></i><i class="iconfont icon-chacha"></i></span></div>\
						<div class="four div"><span class="icon"></span>白萝卜<span class="chachajia"><i class="iconfont icon-jia"></i><i class="iconfont icon-chacha"></i></span></div>\
					</div>\
				</div>\
				<div class="two div"><span class="icon"></span>肉类<span class="chachajia"><i class="iconfont icon-jia"></i><i class="iconfont icon-chacha"></i></span>\
					<div class="three div"><span class="icon"></span>鸡肉<span class="chachajia"><i class="iconfont icon-jia"></i><i class="iconfont icon-chacha"></i></span></div>\
					<div class="three div"><span class="icon"></span>瘦肉<span class="chachajia"><i class="iconfont icon-jia"></i><i class="iconfont icon-chacha"></i></span></div>\
					<div class="three div"><span class="icon"></span>鸭肉<span class="chachajia"><i class="iconfont icon-jia"></i><i class="iconfont icon-chacha"></i></span></div>\
				</div>\
			</div>';

function Tree(){
	htmlStr(theTree,temport);
	this.init();
}

Tree.prototype={

	//展开和隐藏
	tohidden:function(ele){
		var divs=ele.parentNode.getElementsByTagName("div");
		for(var i=0;i<divs.length;i++){
			if(divs[i].style.display=="block"){
				divs[i].style.display="none";			
				ele.className="checkicon";					
			}
			else{
				divs[i].style.display="block";	
				ele.className="icon";					
			}

		}
	},

	//添加节点
	toAdd:function(ele,value){
		var theValue=theInput.value;
		if(theValue){
			var div=document.createElement("div");
			div.innerHTML='<span class="icon"></span>'+theValue+'<span class="chachajia"><i class="iconfont icon-jia"></i><i class="iconfont icon-chacha"></i></span>'
			div.className="three div";
			ele.parentNode.parentNode.appendChild(div);			
		}
		else{
			alert("请输入要添加节点的值");
		}
	},

	//删除节点
	toDelete:function(ele){
		arr=[];
		ele.parentNode.parentNode.parentNode.removeChild(ele.parentNode.parentNode);
	},

	//遍历节点
	toSearch:function(node){
		arr.push(node);
		for(var i=0;i<node.children.length;i++){
			if(node.children[i].nodeName=="DIV"){
				this.toSearch(node.children[i]);				
			}
		}
	},
	animation:function(fun){
		var j=0;
		timer=setInterval(function(){
			j++;
			if(j<arr.length){
				arr[j-1].style.background="#fff";
				arr[j].style.background="yellow";				
			}
			else{
				arr[arr.length-1].style.background="#fff";
				clearInterval(timer);
				fun();
			}

		},500)
	},

	//初始化样式
	toRemove:function(){
		theInput.value="";
		this.toSearch(theTree);
		for(var i=0;i<arr.length;i++){
			arr[i].style.background="#fff";
		}		
	},

	//初始化
	init:function(){

		theTree.addEventListener("click",function(event){
			if(event.target.className.indexOf("icon")!==-1){
				newTree.tohidden(event.target);
			}
		})

		theTree.addEventListener("click",function(event){
			if(event.target.className.indexOf("icon-jia")!==-1){
				newTree.toAdd(event.target);
			}
		})

		
		theTree.addEventListener("click",function(event){
			if(event.target.className.indexOf("icon-chacha")!==-1){
				newTree.toDelete(event.target);
			}
		})


		theDelete.addEventListener("click",this.toRemove.bind(this));

		theSeach.addEventListener("click",function(){
			clearInterval(timer);
			if(theInput.value){
				arr=[];
				var divs=theTree.getElementsByTagName("div");
				for(var j=0;j<divs.length;j++){
					if(divs[j].style.display=="none"){
						divs[j].style.display="block";
					}
				}
				newTree.toSearch(theTree);
				for(var i=1;i<arr.length;i++){
					var flag=false;
					var result=arr[i].childNodes[1].nodeValue.trim();
					if(result==theInput.value){
						flag=true;
						break;
					}			
				}
				if(flag){
					arr.length=i+1;
					newTree.animation(function(){arr[arr.length-1].style.background="yellow";});
				}
				else{
					newTree.animation(function(){alert("你查询的字符串不存在");});
				}
			}
			else{
				alert("请输入要查询的字符串");
			}
		})
	}
}
var newTree=new Tree();