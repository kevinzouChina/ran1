(function(){
	var number=document.getElementById("number");
	var change=document.getElementsByClassName("change");
	var wrap=document.getElementsByClassName("wrap")[0];
	var arr=[];

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
		},

		stopProtation:function(event){
			if(event.stopProtation){
				event.stopProtation();
			}
			else{
				event.concalBubble=true;
			}
		}
	}

	//左侧入事件处理
	if(!number.value){
		eventUtil.addEvent(change[0],"click",function(event){
			var theValue=number.value;
			arr.unshift(theValue);
			console.log(arr);
			var div=document.createElement("div");
			div.innerHTML=theValue;
			wrap.insertBefore(div,wrap.firstElementChild);			
		});
	}

	//右侧入事件处理
	if(!number.value){
		eventUtil.addEvent(change[1],"click",function(event){
			var theValue=number.value;
			arr.push(theValue);
			console.log(arr);
			var div=document.createElement("div");
			div.innerHTML=theValue;
			wrap.appendChild(div);			
		});
	}

	//左侧出事件处理
	eventUtil.addEvent(change[2],"click",function(event){
		//对左侧出理解错了，以为是随机删除那个数，从左侧
		// var theValue=number.value;
		// for(var i=0;i<arr.length;i++){
		// 	if(arr[i]==theValue){
		// 		arr.splice(i,1);
		// 		console.log(arr);
		// 		console.log(wrap.childNodes[i]);
		// 		wrap.removeChild(wrap.childNodes[i]);
		// 	}
		// }
		var first=arr.shift();
		alert(first);
		wrap.removeChild(wrap.firstElementChild);
	})

	//右侧出事件处理
	eventUtil.addEvent(change[3],"click",function(event){
		// var theValue=number.value;
		// for(var i=0;i<arr.length;i++){
		// 	if(arr[i]==theValue){
		// 		arr.splice(i,1);
		// 		console.log(arr);
		// 		// console.log(wrap.childNodes[i]);
		// 		wrap.removeChild(wrap.childNodes[i]);
		// 	}
		// }
		var last=arr.pop();
		alert(last);
		wrap.removeChild(wrap.lastElementChild);
	})

	//随机点击事件处理
	eventUtil.addEvent(wrap,"click",function(event){
		var theEvent=eventUtil.getEvent(event);
		var theSrcElement=eventUtil.getSource(event);
		for(var i=0;i<arr.length;i++){
			if(arr[i]==theSrcElement.innerHTML){
				arr.splice(i,1);
			}
		}		
		wrap.removeChild(theSrcElement);
	})
})()