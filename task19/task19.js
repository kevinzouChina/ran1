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

//将队列的操作封装
var queue={
	arr:[],
	paint:function(){
		var str="";
		this.arr.forEach(function(item,index,array){str+="<div style='height:"+item+"px'></div>";})
		wrap.innerHTML=str;
		addDivDelete();
	},

	leftPush:function(num){
		if(this.arr.length>60){
			alert("队列中最多有60个数据");
			return;
		}
		else{
			this.arr.unshift(num);
			this.paint();
		}

	},

	rightPush:function(num){
		if(this.arr.length>60){
			alert("队列中最多有60个数据");
			return;			
		}
		else{
			this.arr.push(num);
			this.paint();			
		}

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
	},

	disorganize:function(){
		this.arr.sort(function(){
			return 0.5-Math.random();
		})
		this.paint();
		console.log(this.arr);
	},

	sortBubble:function(){
		for(var i=0;i<this.arr.length;i++){
			for(var j=0;j<this.arr.length-1-i;j++){
				if(this.arr[j]>this.arr[j+1]){
					var temp=this.arr[j];
					this.arr[j]=this.arr[j+1];
					this.arr[j+1]=temp;
				}
			}
		}
		this.paint();
		console.log(this.arr);
	},

	sortOption:function(){
		for(var i=0;i<this.arr.length;i++){
			var index=i;
			for(var j=i+1;j<this.arr.length;j++){
				if(this.arr[index]>this.arr[j]){
					index=j;
				}
			}
			if(i !=index){
				var temp=this.arr[i];
				this.arr[i]=this.arr[index];
				this.arr[index]=temp;
			}
		}
		this.paint();
		console.log(this.arr);
	}

}



eventUtil.addEvent(change[0],"click",function(){
	var input=number.value;
	if(input>=10&&input<=100&&/^\+?[1-9][0-9]*$/.test(input)){
		queue.leftPush(input);
	}
	else{
		alert("请输入10到100的整数");
		number.value="";
	}
})

eventUtil.addEvent(change[1],"click",function(){
	var input=number.value;
	if(input>=10&&input<=100&&/^\+?[1-9][0-9]*$/.test(input)){
		queue.rightPush(input);
	}
	else{
		alert("请输入10到100的整数");
		number.value="";
	}
	
})

eventUtil.addEvent(change[2],"click",function(){queue.leftPop()});
eventUtil.addEvent(change[3],"click",function(){queue.rightPop()});
eventUtil.addEvent(change[4],"click",function(){queue.disorganize()});
eventUtil.addEvent(change[5],"click",function(){queue.sortBubble()});
eventUtil.addEvent(change[6],"click",function(){queue.sortOption()});
//给每个wrap里面的div绑定删除函数

// function addDivDelete(){
// 	for(var i=0;i<wrap.childNodes.length;i++){
// 		eventUtil.addEvent(wrap.childNodes[i],"click",(function(i){
// 			return function(){
// 				return queue.deleteId(i);
// 		};
// 		})(i))
// 	}
// }
eventUtil.addEvent(wrap,"click",function(event){
	// for(var i=0;i<wrap.children.length;i++){
	// 	if(wrap.children[i]==event.srcElement){
	// 		queue.deleteId(i);
	// 	}
		
	// }
	var i=[].indexOf(wrap.children,event.srcElement);
	queue.deleteId(i);
	// wrap.removeChild(event.srcElement);
})



