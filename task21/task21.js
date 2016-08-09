(function(){
	var insert=document.getElementById("insert");
	var search=document.getElementById("search");
	var wrap=document.getElementById("wrap");
	var tag=document.getElementById("tag");
	var tagContent=document.getElementById("tagContent");
	//事件兼容性处理函数
	var eventUtil={
		addEvent:function(ele,type,handle){
			if(ele.addEventLinstener){
				ele.addEventLinstener(type,handle,false);
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

		getSrcElement:function(event){
			return event.srcElement || event.target;
		}
	}

	//Tag的鼠标移入，鼠标移出，点击，className的绑定
	eventUtil.addEvent(tagContent,"mouseover",function(event){
		event=eventUtil.getEvent(event);
		var nowSrc=eventUtil.getSrcElement(event);					
		nowSrc.firstChild.insertData(0,"删除");
	})

	eventUtil.addEvent(tagContent,"mouseout",function(event){
		event=eventUtil.getEvent(event);
		var nowSrc=eventUtil.getSrcElement(event);	
		nowSrc.firstChild.deleteData(0,2);
	})

	eventUtil.addEvent(tagContent,"click",function(event){
		event=eventUtil.getEvent(event);
		var nowSrc=eventUtil.getSrcElement(event);
		var index=queue.arr2.indexOf(nowSrc.innerHTML.slice(2));
		queue.arr2.splice(index,1);
		tagContent.removeChild(nowSrc);
	})


	var queue={
		arr1:[],
		arr2:[],

		//绘制图形
		paint:function(wrap,arr){
			var str="";
			arr.forEach(function(item){str+="<div class='content'>"+item+"</div>"});
			wrap.innerHTML=str;
		},

		//注：这样数组去重不行是因为在splice删除一个数组项的时候改变了arr的length所以在遍历的时候会改变了
		// deWeight:function(arr){
		// 	console.log(arr);
		// 	for(var i=0;i<arr.length;i++){
		// 		for(var j=i+1;j<arr.length;j++){
		// 			if(arr[j] === arr[i]){
		// 				arr.splice(j,1);
		// 				console.log(arr);
		// 			}
		// 		}
		// 	}
		// 	console.log(arr);
		// },

		//数组去重，相同数组项取后面一个
		// deWeight:function(arr){
		// 	var resultArr=[];
		// 	for(var i=0;i<arr.length;i++){
		// 		var flag=false;
		// 		for(var j=i+1;j<arr.length;j++){
		// 			if(arr[i] === arr[j]){
		// 				flag=true;
		// 				break;
		// 			}
		// 		}
		// 		if(!flag){
		// 			resultArr.push(arr[i]);
		// 		}
				
		// 	}
		// 	return resultArr;
		// },

		//第二套去重方案，当两个数组项相等时，取前面一个，符合Tag的功能需求
		deWeight:function(arr){
			var resultArr=[];
			for(var i=arr.length-1;i>=0;i--){
				var flag=false;
				for(var j=i-1;j>=0;j--){
					if(arr[i] === arr[j]){
						flag=true;
						break;
					}
				}
				if(!flag){
					resultArr.push(arr[i]);
				}
				
			}
			return resultArr.reverse();
		},

		toJudgeNum:function(arr){
			var theGap=arr.length-10;
			if(theGap>=1){
				for(var i=0;i<theGap;i++){
					arr.shift();
				}
			}
		},

		//插入操作，兴趣爱好
		toAppend:function(){
			var content=document.getElementById("content");	
			var theContent=content.value.trim();
			if(theContent){
				this.arr1=(theContent.replace(/[^0-9a-zA-Z\u4e00-\u9fa5]+/g,",")).split(",");
			}
			else{
				return;
			}
			this.arr1=this.deWeight(this.arr1);
			this.deWeight(this.arr1);
			this.toJudgeNum(this.arr1);
			this.paint(wrap,this.arr1);
		},

		//插入操作，Tag
		toAppend2:function(){
			var tagValue=tag.value;			
			if(/[^0-9a-zA-Z\u4e00-\u9fa5]+/g.test(tagValue)){
				var nowTagValue=tagValue.slice(0,-1).trim();		
				this.arr2.push(nowTagValue);
				this.arr2=this.deWeight(this.arr2);
				this.toJudgeNum(this.arr2);
				tag.value="";
				//第一次压进数组处理
				// if(this.arr2.length===0){
				// 	this.arr2.push(nowTagValue);
				// 	tag.value="";
				// }

				// //以后每压进一次，做去重处理
				// else{
				// 	for(var i=0;i<(this.arr2.length);i++){
				// 		var flag=false;
				// 		if(nowTagValue !== this.arr2[i]){
				// 			flag=true;
				// 		}
				// 	}
				// 	if(flag){
				// 		this.arr2.push(nowTagValue);	
				// 		tag.value="";
				// 	}
				// 	else{
				// 		tag.value="";
				// 	}
				// }
			}
			if(this.arr2.length!==0){		
				this.paint(tagContent,this.arr2);	
			}
		}
	}
	eventUtil.addEvent(insert,"click",function(){ return queue.toAppend()});
	eventUtil.addEvent(tag,"keyup",function(){  return queue.toAppend2()});
})()