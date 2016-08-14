/**
 * 构造树形组件
 * @param {Object} contain 生成节点添加的容器
 * @param {Object} obj     构造节点所需的数据
 */
function Tree(contain,obj){
	this.contain=contain;
	this.obj=obj;
	//初始化
	this.init();
}


Tree.prototype={

  	/**
  	 * 遍历获取对象中的值
  	 * @param  {Object} obj 数据对象
  	 * @return {Array}      存放对象中的值
  	 */
    getParams:function (obj) {
      var params = [];
      for (var key in obj) {
        params.push(key);
      }
      return params;
    },


    /**
     * 递归实现遍历对象
     * @param  {Object} obj 数据对象
     * @return {String}     Dom节点字符串
     */
   findSub:function(obj) {
      var params =this.getParams(obj);
      var html = "";
      if(params.length){
        for (var i = 0; i < params.length; i++) {
          html += '<div class="div visible seached"><span class="icon"></span>'+params[i]+'<span class="chachajia"><i class="iconfont icon-jia"></i><i class="iconfont icon-chacha"></i></span>'+this.findSub(obj[params[i]]) +'</div>';
        }
      }
      return html;
    },


    /**
     * 根据Dom节点字符串创建Dom树
     * 
     */
   createTree:function () {
      this.contain.innerHTML = this.findSub(this.obj);
    },


	/**
	 * DOM节点展开和隐藏
	 * @param  {Object} ele 事件触发的元素
	 * 
	 */
	tohidden:function(ele){
		var divs=ele.parentNode.getElementsByTagName("div");
		for(var i=0;i<divs.length;i++){
			if(divs[i].className.indexOf("visible")!=-1){
				divs[i].className=divs[i].className.replace("visible","hidden");
				ele.className="checkicon";					
			}
			else{
				divs[i].className=divs[i].className.replace("hidden","visible");	
				ele.className="icon";					
			}

		}
	},


	/**
	 * 添加节点
	 * @param  {Object} ele   事件触发的元素
	 * @param  {String} value 节点中的文本
	 * 
	 */
	toAdd:function(ele,value){
		var theValue=theInput.value;
		if(theValue){
			var div=document.createElement("div");
			div.innerHTML='<span class="icon"></span>'+theValue+'<span class="chachajia"><i class="iconfont icon-jia"></i><i class="iconfont icon-chacha"></i></span>'
			div.className="div visible seached";
			ele.parentNode.parentNode.appendChild(div);			
		}
		else{
			alert("请在文本框输入要添加节点的值");
		}
	},


	/**
	 * 删除节点
	 * @param  {Object} ele 事件触发的节点
	 * 
	 */
	toDelete:function(ele){
		ele.parentNode.parentNode.innerHTML="";
	},


	/**
	 * 遍历节点
	 * @param  {Object} node 遍历的根节点
	 * @return {[type]}      [description]
	 */
	toSearch:function(node){
		arr.push(node);
		for(var i=0;i<node.children.length;i++){
			if(node.children[i].nodeName=="DIV"){
				this.toSearch(node.children[i]);				
			}
		}
	},


	/**
	 * 遍历中的动画效果
	 * @param  {Function} fun 动画结束时的回调
	 * 
	 */
	animation:function(fun){
		var j=0;
		timer=setInterval(function(){
			j++;
			if(j<arr.length){
				arr[j-1].className=arr[j-1].className.replace("nowSeach","seached");
				arr[j].className=arr[j].className.replace("seached","nowSeach");					
			}
			else{
				arr[arr.length-1].className=arr[arr.length-1].className.replace("nowSeach","seached");
				clearInterval(timer);
				//回调函数的实现
				fun();
			}

		},500)
	},


	/**
	 * 初始化样式
	 * 
	 */
	toRemove:function(){
		theInput.value="";
		this.toSearch(theTree);
		for(var i=0;i<arr.length;i++){
			arr[i].className=arr[i].className.replace("nowSeach","seached");
		}		
	},


	/**
	 * 初始化
	 * 
	 */
	init:function(){
		var theSeach=document.getElementById("seach");
		var theDelete=document.getElementById("delete");

		//展开和隐藏事件绑定
		theTree.addEventListener("click",function(event){
			console.log(event.target.className)
			if(event.target.className.indexOf("icon")!==-1){
				newTree.tohidden(event.target);
			}
		})

		//添加节点事件绑定
		theTree.addEventListener("click",function(event){
			if(event.target.className.indexOf("icon-jia")!==-1){
				newTree.toAdd(event.target);
			}
		})

		//删除节点事件绑定
		theTree.addEventListener("click",function(event){
			if(event.target.className.indexOf("icon-chacha")!==-1){
				newTree.toDelete(event.target);
			}
		})

		//点击清除按钮事件绑定
		theDelete.addEventListener("click",this.toRemove.bind(this));

		//点击搜索事件绑定
		theSeach.addEventListener("click",function(){
			clearInterval(timer);
			if(theInput.value){
				arr=[];
				var divs=theTree.getElementsByTagName("div");
				for(var j=0;j<divs.length;j++){
					if(divs[j].className.indexOf("hidden")!==-1){
						divs[j].className.replace("hidden","visible");
					}
				}
				newTree.toSearch(theTree);
				for(var i=1;i<arr.length;i++){
					var flag=false;
					console.log(arr[i].childNodes[1].nodeValue);
					var result=arr[i].childNodes[1].nodeValue.trim();
					if(result==theInput.value){
						flag=true;
						break;
					}			
				}
				if(flag){
					arr.length=i+1;
					newTree.animation(function(){arr[arr.length-1].className=arr[arr.length-1].className.replace("seached","nowSeach");});
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
