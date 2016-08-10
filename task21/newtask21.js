var Creat1=(function(){
	function CreatObject(wrap,self,button){

		//定义私有变量number
		// var number;
		// this.getNumber=function(){
		// 	return number;
		// }

		// this.setNumber=function(num){
		// 	number=num;
		// }

		this.wrap=document.getElementById(wrap);
		this.self=document.getElementById(self);
		this.button=document.getElementById(button);
		this.getData=function(){
			var value;
			if(self=="tag"){
				 value=this.self.value.slice(0,-1);
				 console.log(value);
			}
			else if(self=="content"){
				value=this.self.value.trim().split(/,|，|\s|\n|\r|\t/);
			}
			return value;
		}

		this.render=function(value){
			var div=document.createElement("div");
			div.innerText=value;
			div.className="content";
			this.wrap.appendChild(div);
			// number++;
				
		}

		// this.setNumber(0);
		this.button?this.init("bottonEvent"):this.init("keyEvent");
	}




	CreatObject.prototype={
		deRepeat:function(data){
			for(var i=0;i<this.wrap.children.length;i++){
				// console.log(this.wrap.children[i].innerHTML);
				// console.log(data);
				if(this.wrap.children[i].innerHTML.localeCompare(data)===0){
					this.self.value="";
					// this.setNumber(this.wrap.children.length);
					return true;
				}			
			}

		},

		toDelete:function(ele){
			this.wrap.removeChild(ele);
			// this.setNumber(this.wrap.children.length);
		},

		init:function(type){
			var that=this;
			that.wrap.addEventListener('mouseover',function(event){
				event.target.innerHTML="删除"+event.target.innerHTML;
			},false)

			that.wrap.addEventListener('click',function(event){
				that.toDelete(event.target);
			},false)


			that.wrap.addEventListener('mouseout',function(event){
				event.target.innerHTML=event.target.innerHTML.slice(2);
			},false)

			switch(type){
				case "bottonEvent":
					that.button.addEventListener('click',function(event){
						for(var i=0;i<that.getData().length;i++){							
							that.deRepeat(that.getData()[i]) || that.render(that.getData()[i]);;
							// if(that.getNumber()>10){
							if(that.wrap.children.length>10){
								that.toDelete(that.wrap.firstChild);
							
							}
						}
						that.self.value="";
					},false)
					break;

				case "keyEvent":
					that.self.addEventListener('keyup',function(event){				
						if(/,|，|\s|\n|\r|\t/.test(that.self.value)){
							that.deRepeat(that.getData()) || that.render(that.getData());																													
							// if(that.getNumber()>10){
								if(that.wrap.children.length>10){
								that.toDelete(that.wrap.firstChild);
							}
							that.self.value="";
						}
						
					},false)
					break;
			}
		}
	}
	return CreatObject
})()


var tap=new Creat1('tagContent','tag');
var habit=new Creat1('wrap','content','insert');