//通过ID获取元素
function $(id){
	return document.getElementById(id);
}

//通过标签名获取元素
function getTagName(element,tagName){
	return element.getElementsByTagName(tagName);
}

//通过class获取元素
function getClass(elements,names){
	if(elements.getElementsByClassName){
		return elements.getElementsByClassName(names);
	}
	else{
		var element=getTagName(document,'*');
		var carString;
		var arr=[];
		var flag;
		var name=names.split(" ");
		for(var i=0;elements=element[i];i++){
			carString=" "+elements.className+" ";
			flag=true;
			for(var j=0;names=name[j];j++){
				if(carString.indexOf(" "+names+" ")==-1){
					flag=false;
					break;
				}
			}
			if(flag){
				arr.push(elements);
			}
		}
		return arr;
	}
}

//事件处理
function addEvent(element,type,fun){
	if(element.addEventListener){
		return element.addEventListener(type,fun,false);
	}
	else if(element.attachEvent){
		return element.attachEvent("on"+type,fun);
	}
	else{
		return element["on"+type]=fun;
	}
}

//事件对象相应特性兼容性处理
getSomething={

	//获取事件对象
	getEv:function(event){
    	 return event ||window.event;
	},

	//获取事件的目标
	getSource:function(event){
        return event.target || event.srcElement;
	},

	//阻止默认行为
	preventDefault:function(event){
        if(event.preventDefault){
	            event.preventDefault();
        }
        else{
            event.returnValue=false;
        }
	},

	//阻止事件冒泡
	stopProtation:function(event){
        if(event.stopProtation){
	          event.stopProtation();
        }
       else{
            event.cancelBubble=true;
        }
	}
}


//封装动画函数
function animation(ele,abuse,start,end){
    if(ele.timer){
	    clearInterval(ele.timer);
    }
    var step=function (){
	    var speed=(end-start)/10;
	    speed=speed>0?Math.ceil(speed):Math.floor(speed);
	    if(start==end){
		    clearInterval(ele.timer);
	    }
	    else{

	    if(abuse=="opacity"){
	        ele.style.filter='alpha(opacity:'+(start+speed)+')';
	        ele.style.opacity=(start+speed)/100;
	    }
	    else{
	        ele.style[abuse]=start+speed+'px';
	    }
		    start=start+speed;
		  }
	}	
	ele.timer=setInterval(step,30);
}

//封装ajax函数实现跨域请求（IE不支持xhr跨域，且跨域请求存在限制）
function ajax(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    var params = formatParams(options.data);
  	var xhr=creatCorsRequest();
 	xhr.open(options.type, options.url + "?" + params);
 	xhr.onload=function(){
 		 options.success && options.success(xhr.responseText);
 	}
 	xhr.onerror=function(error){
 		 options.fail && options.fail(error);
 	}
 	xhr.send();
}


//序列化参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("z=" +Math.ceil(Math.random()*100)));
    	return arr.join("&");
}


//对IE8的跨域处理
function creatCorsRequest(){
	var xhr=new XMLHttpRequest();

	//判断XHR的合法性 withCredentials同ID
	if("withCredentials" in xhr){}

	
	else if(typeof XDomainRequest != 'undefined'){
		xhr= new XDomainRequest();
	}
	else{
		xhr=null;
	}
	return xhr;
}

//cookie的相关操作
var cookieUtil={
	get:function (name){
		var cookieName=encodeURIComponent(name)+"=";
		var cookieStart=document.cookie.indexOf(cookieName);
		var cookieValue=null;
		if(cookieStart>-1){
			var cookieEnd=document.cookie.indexOf(";",cookieStart);
			if(cookieEnd==-1){
				cookieEnd=document.cookie.length;
			}
			cookieValue=decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd))
		}
		else{
			cookieValue="";
		}
		return cookieValue;
	},
	set:function(name,value,expires){
		 document.cookie=encodeURIComponent(name)+"="+encodeURIComponent(value);	
	}
}

//分页器函数
function page(opt){
	if(!opt.id){return false};
	var obj=document.getElementById(opt.id);	
	var nowNum = opt.nowNum || 1;
	var allNum = opt.allNum || 29;
	var callBack = opt.callBack || function(){};
	var oA = document.createElement('a');
	oA.href = '#' + (nowNum - 1);
	oA.innerHTML = '&lt';
	if(nowNum==1){
		oA.style.background="#ccc";
	}
	else{
		oA.style.background="#9dd8b1";
	}
	oA.id="previous";
	obj.appendChild(oA);	
	if(allNum<=8){
		for(var i=1;i<=allNum;i++){
			var oA = document.createElement('a');
			oA.href = '#' + i;
			oA.innerHTML = i;
			obj.appendChild(oA);
		}	
	}
	else{	
		for(var i=1;i<=8;i++){
			var oA = document.createElement('a');			
			if(nowNum == 1 || nowNum == 2  || nowNum==3  || nowNum==4){				
				oA.href = '#' + i;
				oA.innerHTML = i;				
			}
			else if( (allNum - nowNum) == 0 || (allNum - nowNum) == 1 || (allNum - nowNum) == 2  || (allNum - nowNum) == 3 ){			
				oA.href = '#' + (allNum - 8 + i);
				oA.innerHTML = allNum - 8 + i;		
			}
			else{
				oA.href = '#' + (nowNum - 5 + i);		
				oA.innerHTML = (nowNum - 5 + i);		
			}
			obj.appendChild(oA);			
		}	
	}
	var oA = document.createElement('a');
	if(allNum - nowNum>=1){		
		oA.href = '#' + (nowNum + 1);
		oA.style.background="#9dd8b1";

	}
	else{
		oA.href = '#' + nowNum;
		oA.style.background="#ccc";
	}
	oA.innerHTML = '&gt';	
	oA.id="next";
	obj.appendChild(oA);	
	callBack(nowNum,allNum);	
	var aA = obj.getElementsByTagName('a');	
	for(var i=0;i<aA.length;i++){
		aA[i].onclick = function(){			
			var nowNum = parseInt(this.getAttribute('href').substring(1));			
			obj.innerHTML = '';			
			page({
				id : opt.id,
				nowNum : nowNum,
				allNum : allNum,
				callBack : callBack			
			});			
			return false;	
		};
	}
}