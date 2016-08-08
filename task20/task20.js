(function(){
	var insert=document.getElementById("insert");
	var search=document.getElementById("search");
	var wrap=document.getElementById("wrap");

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
		}
	}

	//给数组每一项绑定函数
	function each(arr,fn){
		for(var i=0;i<arr.length;i++){
			fn(arr[i]);
		}
	}

	var queue={
		arr:[],

		//绘制图形
		paint:function(){
			var str="";
			each(this.arr,function(item){str+="<div>"+item+"</div>"});
			wrap.innerHTML=str;
		},

		//插入操作
		toAppend:function(){
			var content=document.getElementById("content");	
			var theContent=content.value;
			if(theContent){
				this.arr=(theContent.replace(/[^0-9a-zA-Z\u4e00-\u9fa5]+/g,",")).split(",");
			}
			else{
				return;
			}
			this.paint();
		},

		//查询操作
		getValue:function(){
			var theValue=document.getElementById("theValue");		
			for(var i=0;i<wrap.children.length;i++){
				wrap.children[i].className="";
				var theSearchValue=(theValue.value).trim();
				if(this.arr[i]==theSearchValue){
					wrap.children[i].className="checked";
				}				
			}
			theValue.value="";
		}

	}
	// eventUtil.addEvent(insert,"click",queue.toAppend);
	eventUtil.addEvent(insert,"click",function(){ return queue.toAppend()});
	eventUtil.addEvent(search,"click",function(){ return queue.getValue()});
})()