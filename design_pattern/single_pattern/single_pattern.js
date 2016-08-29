/**
 * 不透明的单例模式实现
 * 但是将单例属性instance作为构造函数的实例属性，有点浪费，而且不符合构造函数属性的特点
 */
var Singleton=function(name){
	this.name=name;
	this.instance=null;
}

Singleton.prototype.getName=function(){
	console.log(this.name);
}

Singleton.getIntance=function(name){
	if(!this.instance){
		this.instance=new Singleton(name);
	}
	return this.instance;
}

var a=Singleton.getIntance("haha");
var b=Singleton.getIntance("haha2");
console.log(a===b);


/**
 * 不透明的单例模式实现
 * instance作为变量存在，利用自执行函数包裹，避免污染全局环境,同时接受单例的实例化对象
 */
var Singleton=function(name){
	this.name=name;
}

Singleton.prototype.getName=function(){
	console.log(this.name);
}

Singleton.getIntance=(function(){
	var instance=null;
	return function(name){
		if(!instance){
			instance=new Singleton(name);
		}
		return instance;
	}
})();

var a=Singleton.getIntance("haha");
var b=Singleton.getIntance("haha2");
console.log(a===b);

/**
 * 透明的单例模式
 * 利用自执行函数，避免污染全局环境，而且将真正的单例构造函数返回出来。
 * 但是在构造器中构造器执行了两件事，1.初始化init;2.判断单例对象;不符合单一职责原则
 */
var getDiv=(function(){
	var instance;
	getDiv=function(html){
		if(instance){
			return instance;
		}
		this.html=html;
		this.init();
		return instance=this;
	}
	getDiv.prototype.init=function(){
		var div=document.createElement("div");
		div.innerHTML=this.html;
		document.body.appendChild(div);
	}
	return getDiv;
})()

var a=new getDiv("haha");
var b=new getDiv("haha2");
console.log(a===b)

/**
 * 用代理实现单例模式
 * 引入代理类，将原先构造函数干的两件事分了一件给代理类来实现
 */
var getDiv=function(html){
	this.html=html;
	this.init();
}

getDiv.prototype.init=function(){
	var div=document.createElement("div");
	div.innerHTML=this.html;
	document.body.appendChild(div);
}

var Poxy=(function(){
	var instance;
	return function(html){
		if(instance){
			return instance;
		}
		instance=new getDiv(html);		
		return instance;
	}
})()
var a=new Poxy("haha");
var b=new Poxy("haha2");
console.log(a===b);

var user=(function(){
	var _name="haha";
	var _age=12;
	return function(){
		console.log(_name+"--"+_age)
	}
})()

var part={};
part.namespace=function(name){
	var arr=name.split(".");
	var current=part;
	for(var i in arr){
		if(!current[arr[i]]){
			current[arr[i]]={};
		}
		current=current[arr[i]];
	}
}
part.namespace('event');
part.namespace('dom.style');
console.dir(part);

/**
 * 惰性单例
 * 只在需要的时候才实例化单例
 */
function creatDiv(){
	var div=document.createElement("div");
	div.innerHTML="我是悬浮框";
	div.style.display="none";
	document.body.appendChild(div);
	return div;
}

var poxy=(function(){
	var div;
	return function(){
		if(!div){
			div=creatDiv();
		}
		return div;
	}
})()

var btn=document.getElementById("btn");
btn.onclick=function(){
	var logoin=poxy();
	logoin.style.display="block";
}

//单例模式的应用
var div1=document.getElementById("div1");
var bind=function(){
	// div1.addEventListener("click",function(){
	// 	console.log("one");
	// })
	div1.onclick=function(){
		console.log("one");
	}
	// return true;
}

var rend=function(){
	console.log("渲染列表");
	bind();
}
rend();
rend();
rend();
