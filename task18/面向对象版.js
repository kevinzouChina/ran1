//事件处理函数兼容性处理
var eventUtil={
	addEvent:function(ele,type,handle){
		if(ele.addEventListener){
			ele.addEventListener(type,handle,false);
		}
		else if(ele.attachEvent){
			ele.attachEvent("on"+type,handle);
		}
		else{
			ele["on"+type]=handle;
		}
	},

	getEvent:function(event){
		return event || window.event;
	},

	getSource:function(event){
		return event.target || event.srcElement;
	}
}

//获取元素
var number=document.getElementById("number");
var change=document.getElementsByClassName("change");
var wrap=document.getElementsByClassName("wrap")[0];
// var arr=[];
//数组中每个元素的迭代方法
function each(arr, fn) {
    for (var cur = 0; cur < arr.length; cur++) {
        fn(arr[cur], cur);
    }
}

//将队列的操作封装
var queue={
	arr:[],
	paint:function(){
		var str="";
		each(this.arr,function(item){str+="<div>"+item+"</div>";})
		wrap.innerHTML=str;
		addDivDelete();
	},

	leftPush:function(num){
		this.arr.unshift(num);
		this.paint();
	},

	rightPush:function(num){
		this.arr.push(num);
		console.log(this.arr);
		this.paint();
	},

	leftPop:function(){
		console.log(this.arr);
		if(this.arr.length===0){
			alert("该队列为空");
		}
		else{
			alert(this.arr.shift());
			this.paint();
		}
		
	},

	rightPop:function(){
		if(this.arr.length === 0){
			alert("该队列为空");
		}
		else{
			alert(this.arr.pop());
			this.paint();
		}
	},

	deleteId:function(id){
		this.arr.splice(id,1);
		this.paint();
	}
}

//给每个wrap里面的div绑定删除函数
function addDivDelete(){
	for(var i=0;i<wrap.childNodes.length;i++){
		eventUtil.addEvent(wrap.childNodes[i],"click",(function(i){
			return function(){
				return queue.deleteId(i);
		};
		})(i))
	}
}

eventUtil.addEvent(change[0],"click",function(){
	var input=number.value;
	queue.leftPush(input);
})

eventUtil.addEvent(change[1],"click",function(){
	var input=number.value;
	queue.rightPush(input);
})

eventUtil.addEvent(change[2],"click",function(){queue.leftPop()});
eventUtil.addEvent(change[3],"click",function(){queue.rightPop()});





