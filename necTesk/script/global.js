/* 
 * 功能：关闭顶部通知条
 * 实现流程：先判断hasnotice cookie是否存在，1、存在，将noti_nav通知条消失；
 * 											 2、不存在，设置hasnotice cookie，重复 1 操作
 *  遇到的坑：cookie设置在浏览器中打开，无法看到本地cookie
 *  解决方法：下载wrapsever服务器，解决本地cookie无法显示的问题
 */
(function(){

	function toNotice(){
		var noti_cancel=getClass(document,"icon-chacha")[1];
		var noti_nav=getClass(document,"m-hddown")[0];		 		
		if(cookieUtil.get("hasnotice")){
			noti_nav.style.display="none";
		}
		else{
			addEvent(noti_cancel,'click',function(){
				cookieUtil.set('hasnotice',true);
				noti_nav.style.display="none";
			})
		}		 	
	}
	toNotice();
})();

/* 
 * 功能：关注“网易教育产品部”/登录
 * 实现流程：1、点击关注按钮，判断，loginSuc cookie是否存在：不存在，弹出登录弹框；存在，设置followSuc cookie,并置为已关注状态
 * 			 2、在登录弹框中输入用户名和密码，通过Ajax,get方式请求，验证用户信息是否有误：
 * 			 		验证成功，设置loginSuc cookie,继续发送请求，设置followSuc cookie,并置为已关注状态
 * 			 		验证失败，弹出提示框
 * 			 3、在登录弹出的文本框，密码框输入信息时，为兼容低版本浏览器，未使用，placeholder属性；
 * 			 	考虑事件委托，focus和blur不支持冒泡，IE低版本不支持事件捕获，所以用 focusin,focusout事件处理
 * 			 4、置为关注状态以后，点击取消按钮，设置followSuc cookie,并且置为未关注状态	
 * 			 5、点击登录弹框的叉叉，退出登录，取消遮罩和弹框显示	
 *  遇到的坑：1、在两个cookie的设置和获得上，逻辑不是很清晰，使得代码乱七八糟
 *  		  2、ajax，验证用户信息，未MD5加密用户名和密码，使得一直得不到响应信息
 *  解决方法：解决1：画流程图，理解文档信息
 *  		  解决2；下载MD5文件，查了加密的方法，调用其加密
 *  疑问：  将两个文本框事件委托到登录框，怎么解决触发focusin，两个框的提示都消失？
 */
(function(){

	var con_popup=getClass(document,'m-popup')[0];
	var con_mask=getClass(document,'f-mask')[0];
	var con_concern=getClass(document,'u-concern')[0];
	var con_havaconcern=$('haveconcern');
	var con_havecancel=$('haveconcel');
	var $username=$('username');
	var $password=$('userpsd');
	var log_concel=$('iconcancel');

	// 1、点击关注按钮
	addEvent(getClass(document,'u-concern')[0],'click',function(){		
		if(cookieUtil.get('loginSuc')==""){	;
			con_mask.style.display='block';
			con_mask.style['z-index']=99;
			con_popup.style.display="block";		
		}
		else{	
			var con_concern=getClass(document,'u-concern')[0];
			cookieUtil.set('followSuc',true);
			con_havecancel.style.display="block";
			con_havaconcern.style.display="block";
			con_concern.style.display="none";
		}
		
	})

	// 2、点击登录弹框登录按钮
	addEvent($('j-userbtn'),'click',function(){
	   	var username=hex_md5($username.value);
	  	var userpsd=hex_md5($password.value);
		ajax({
			url: "http://study.163.com/webDev/login.htm",
			type: "get",
			data: {userName: username, password: userpsd},
			dataType: "json",
			success: function (response, xml) {
				if(response=="1"){
					cookieUtil.set('loginSuc','true');
					con_mask.style.display="none";
					con_popup.style.display="none";
					var userbtn=$('j-userbtn');
			 		ajax({
						url: "http://study.163.com/webDev/attention.htm",
						type: "get",
						data: {},
						dataType: "json",
				 		success: function (response, xml) {		 			
				 			var responseJson=JSON.parse(response);
				 			if(responseJson==1){
				 				cookieUtil.set('followSuc','true');
				 				con_havecancel.style.display="block";
								con_havaconcern.style.display="block";
								con_concern.style.display="none";
				 			}	
						},
					 	fail: function (status) {}
					});
				}
					
			},
			fail: function (status) {
				alert('用户名或密码不正确')
			}
		})
	})

	// 3、登录弹框文本框“获得焦点”、"失去焦点"相应操作
	// ?本想事件委托在con_popup上，减少事件的绑定，但触发focusin，两个框的提示都消失。怎么触发div执行相应的input操作

	/* addEvent(con_popup,'focusin',function(){
		$('accoutnum').innerHTML="";
		$('passwordnum').innerHTML="";
	})	
	addEvent(con_popup,'focusout',function(){
		if($username.value==""){
			$('accoutnum').innerHTML="账号";
		}
		else if($password.value==""){
			$('passwordnum').innerHTML="密码";
		}
	})	*/

	addEvent($username,'focusin',function(){
		$('accoutnum').innerHTML="";
	})
	addEvent($username,'focusout',function(){
		if($username.value==""){
			$('accoutnum').innerHTML="账号";
		}
	})
	addEvent($password,'focusin',function(){
		$('passwordnum').innerHTML="";
	})
	addEvent($password,'focusout',function(){
		if($password.value==""){
			$('passwordnum').innerHTML="密码";
		}
	})


	// 4、置为已关注状态，点击取消按钮
	addEvent(con_havecancel,'click',function(){
		con_havecancel.display="none";
		con_havaconcern.display="none";
		con_concern.display="block";
	})

	// 5、点击登录弹框的叉叉，退出登录
	addEvent(log_concel,'click',function(){
		con_mask.style.display='none';
		con_mask.style['z-index']=-99;
		con_popup.style.display="none";
	})
})();

/* 
 * 	功能：轮播图
 * 	实现流程：1.设置setBanner函数实现对轮播的封装；
 * 			  2.调用unit.js中animation函数实现动画效果
 * 			  3.设置定时器，实现动态改变图片和a的链接
 * 			  4.加入鼠标移入和鼠标移出事件的控制
 * 			  5.实现对小圆点的点击实现图片和a链接的切换  
 *  疑问：闭包为什么第二种情况不能获取i的序号 
 */
(function(){
	function setBanner(){
		var mban=$('m-banner');
		var mbanImage=getTagName(mban,"img")[0];
		var mbanI=getTagName(mban,"i");
		var mbanA=getTagName(mban,"a")[0];
		var len=mbanI.length;
		var timer=null;
		var i=1;
		var thehref=["http://open.163.com/","http://study.163.com/","http://www.icourse163.org/"];

		//利用闭包的原理，实现获取当前点击的i元素序号i2，利用i2实现动态改变当前a的href和img的src
		for(var i2=0;i2<len;i2++){
			(function(m){
				addEvent(mbanI[m],'click',function(){
					for(var i2=0;i2<len;i2++){
						mbanI[i2].className="";
					}
					animation(mbanImage,'opacity',1,100);
					mbanI[m].className="active";			
					mbanImage.src='images/banner'+ (m+1) +'.jpg';
					mbanA.href=thehref[m];
				})
			})(i2);	
		}

		/* for(var i2=0;i2<len;i2++){
			mbanI[i2].onclick=function(i){
				return (function(){
					for(var j=0;j<len;j++){
						mbanI[j].style.background="#fff";
					}
					mbanI[i].style.background="#333";
					mbanImage.src='images/banner'+ (i+1) +'.jpg';					
				})(i2)
			}
		}
		*/
		

		//利用全局变量i，实现每次调用banner,i自增，用i来实现对对应i的对应a的href和img的src的实现
		function banner(){
			var mban=$('m-banner');
			var mbanA=getTagName(mban,"a")[0];
			var mbanI=getTagName(mban,"i");
			var theI=[mbanI[0],mbanI[1],mbanI[2]];
			i++;
			mbanImage.src="images/banner"+i+".jpg";	
			animation(mbanImage,'opacity',1,100)	
			for(var j=0;j<3;j++){
				theI[j].className="";	
			}
			if(i==1){			
				mbanA.href="http://open.163.com/";
				theI[0].className="active";
			}
			else if(i==2){			
				mbanA.href="http://study.163.com/";
				theI[1].className="active";
			}
			else{
				mbanA.href="http://www.icourse163.org/";
				theI[2].className="active";
			}
			if(i==3){
				i=0;
			}
		}

		//设置定时器，实现每5S调用banner,实现具体操作
		timer=setInterval(banner,5000);
		
		//鼠标移入事件，清空定时器
		addEvent(mban,'mouseover',function(){
			clearInterval(timer);
		})

		//鼠标移出事件，开启定时器
		addEvent(mban,'mouseout',function(){
			timer=setInterval(banner,5000);	
		})
	}

	setBanner();	
})();

/* 
 * 功能：内容区tab切换,相应课程的获取，查看课程详情
 * 实现流程：1、通过用户操作获取thepagenum(当前页码)
 * 			 2、通过用户操作获得thepsize(每页返回数据个数 )
 * 			 3、通过用户操作获得thetype(筛选类型)
 * 			 4、通过调用getcourse函数获取对应的课程列表
 *  遇到的坑：1、AJax获取数据这块，本没有考虑跨域问题，后来在IE中获取不到数据
 *  		  2、初始化数据时，考虑的点比较多。如：大屏小屏的显示数据；tab的切换；不同的页数
 *  		  3、分页器的处理，发现生成了分页器，在实现与用户交互时，两边的事件有冲突
 *  解决方法：1、利用XDR对象实现对IE跨域的实现，但跨域访问存在许多限制，所以在判断获取数据和失败时需不同处理
 *  		  2、对于复杂问题的解决方法，就是分解，从面到线到点，一个一个解决，最后结合起来
 *  		  ?3、问题三还是为解决，未实现与用户交互，所以还得好好研究
 */
var browserWidth;
(function(){
	var thepsize=20;
	var thepagenum=1;
	var thetype=10;
	var cour_product=$('u-product');
	var cour_program=$('u-langeage');

	// 1、调用分页器填充,获得页数 thepagenum
	page({
			id : 'thepage',
			nowNum : 1,
			allNum : 29,
			callBack : function(now,all){
				addEvent($('thepage'),'click',function(event){
					var event=event || window.event;
					var targetNode= event.target || event.srcElement;
					// alert(targetNode.href);
					for(var i=0;i<=9;i++){
						if (i==0 || i==9) {
							$('thepage').children[i].style.color="#fff";
						}
						else{
							$('thepage').children[i].style.color="#666";
						}
					}
					var aA = $('thepage').getElementsByTagName('a');	
					targetNode.style.color="#39a030";
					thepagenum=parseInt(targetNode.getAttribute('href').substring(1));
					getcourse(thepagenum,thepsize,thetype);
				})
			}		
	});

	// 2、根据屏幕大小，获得thepsize(课程列表显示课程的数目)
	addEvent(window,'resize',function(){
		browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	 	thepsize=browserWidth >1205?20:15;
	 	getcourse(thepagenum,thepsize,thetype);	
	});
	
	// 3、根据点击事件，实现tab的切换，获得thetype(筛选类型（10：产品设计；20：编程语言）)
	addEvent(cour_product,'click',function(){
		thetype=10;
		cour_product.className="active";
		cour_program.className = "";
		thepagenum=1;
		getcourse(thepagenum,thepsize,thetype);
		$('thepage').innerHTML="";
		page({
			id : 'thepage',
			nowNum : 1,
			allNum : 29
		})
	})

	addEvent(cour_program,'click',function(){
		thetype=20;
		cour_product.className="";
		cour_program.className = "active";
		thepagenum=1;
		getcourse(thepagenum,thepsize,thetype);
		$('thepage').innerHTML="";
		page({
			id : 'thepage',
			nowNum : 1,
			allNum : 29
		})
	})

	// 4、封装getcourse函数，通过Ajax获取课程数据，传递的请求参数(pageNo;psize;type)
	//通过以上操作获取，通过getcourse函数参数传递
	function getcourse(cou_no,cou_psize,cou_type){
	 	ajax({
			url: "http://study.163.com/webDev/couresByCategory.htm",
			type: "get",
			//pageNo:页码 psize:显示数据个数 type:产品还是设计
			data: {pageNo:cou_no,psize:cou_psize,type:cou_type},
			dataType: "json",
			success: function (response, xml) {
	   		 	var responseJson=JSON.parse(response);		 	
	   		 	var cour_content=getClass(document,'g-wrapcontent')[0];
	   		 	cour_content.innerHTML="";
				for(var i=0;i<cou_psize;i++){      					
	 				var cour_whd=getClass(document,'g-wraphd')[0];
					var cour_mnc=document.createElement('div');
					var cour_photo=document.createElement('img');
					cour_mnc.appendChild(cour_photo);
					var cour_name=document.createElement('p');
					cour_mnc.appendChild(cour_name);
					cour_name.id="courName";
					var cour_provider=document.createElement('p');
					cour_mnc.appendChild(cour_provider);
					var cour_court=document.createElement('span');		
					cour_mnc.appendChild(cour_court);
					var cour_price=document.createElement('strong');
					cour_mnc.appendChild(cour_price);
					cour_content.appendChild(cour_mnc);
					cour_mnc.className="m-mnc";
					cour_photo.src=responseJson.list[i].middlePhotoUrl;
					cour_name.innerHTML=responseJson.list[i]['name'];
					cour_provider.innerHTML=responseJson.list[i].provider;
					cour_court.innerHTML=responseJson.list[i].learnerCount;
					if(responseJson.list[i].price==0){
						cour_price.innerHTML="免费";
					}
					else{
						cour_price.innerHTML="￥"+responseJson.list[i].price;
					}				
					var cour_a = document.createElement('a');
					cour_a.innerHTML = '<img src="' + responseJson.list[i].middlePhotoUrl +'" /><h3>' + responseJson.list[i].name + '</h3><span>' + responseJson.list[i].learnerCount + '人在学</span><p class="categoryname">发布者：' + responseJson.list[i].provider + '</br>分类：' + responseJson.list[i].categoryName + '</p><p class="description">' +  responseJson.list[i].description + '</p>';
					cour_mnc.appendChild(cour_a);
				}						
			},
			fail: function (status) {}
		});
	} 
	getcourse(1,20,10);
	// getBroserWidth();
	// if( browserWidth>1205 ){
	// 	changeCss();
	// 	getcourse(1,20,10);
	// }
	// else{
	// 	changeCss();
	// 	getcourse(1,15,10);
	// }	
})();

/* 
 * 功能：“机构介绍”中的视频介绍
 * 实现流程：点击事件触发vi_popup遮罩层的显示实现视频播放
 */
(function(){
	function getvideo(){
	 	var vi_img=getClass(document,'u-vdoimg')[0];
	 	var vi_popup=getClass(document,'popupvideo')[0];
	 	addEvent(vi_img,'click',function(){
	 		vi_popup.style.display="block";	  		
	 	})
 	}
    getvideo();

})();

/* 
 * 功能：“机构介绍”中的视频介绍
 * 实现流程：1、通过Ajax获取到对应数据
 * 			 2、调用封装toMove函数，在其中调用animation实现动画效果
 * 			 3、设置定时器，实现隔5秒更新一门课程
 * 			 4、事件处理，鼠标移入清除定时器；鼠标移出，设置定时器
 */
(function(){
	var li_wrap=getClass(document,"m-list")[0];	
	var li_hotwrap=getClass(document,'hot-wrap')[0];

	// 1、获取最热排行课程数据
	function gethotcoures(){	
		ajax({
			url: "http://study.163.com/webDev/hotcouresByCategory.htm",
			type: "get",
			dataType: "json",
				success: function (response, xml) {	
			 	var responseJson=JSON.parse(response);
				for(var i=0;i<20;i++){
					var li_list=document.createElement('div');
					li_wrap.appendChild(li_list);
					li_list.className="m-list1";
					var li_a=document.createElement('a');
					li_list.appendChild(li_a);
					var li_div=document.createElement('div');
					li_a.appendChild(li_div);
					var li_img=document.createElement('img');
					li_div.appendChild(li_img);
					var li_p=document.createElement('p');
					li_a.appendChild(li_p);
					var li_span=document.createElement('span');
					li_a.appendChild(li_span);
					li_img.src=responseJson[i].smallPhotoUrl;
					li_p.innerHTML=responseJson[i].name;
					li_span.innerHTML=responseJson[i].learnerCount;      					    					
				}
			 },
			fail: function (status) {}
		});
	}	
	gethotcoures();

	// 2、最热排行实现动画效果
	var step=0;	
	function toMove(){		
		step++;
		var thetop=-70*step;
		var theend=-70*(step+1);
		animation(li_wrap,'top',thetop,theend);
		if(step==9){
			step=1;
		}			
	}

	// 3、设置定时器
	var timer=setInterval(toMove,5000)	


	// 4、鼠标移入移出事件处理
	addEvent(li_hotwrap,'mouseover',function(){
		clearInterval(timer);
		li_hotwrap.style['box-shadow']="0 2px 2px #d4d3d3";
		li_hotwrap.style.background="#d4d3d3";
	})
	addEvent(li_hotwrap,'mouseout',function(){
		 timer=setInterval(toMove,5000);
		 li_hotwrap.style.background="#fff";
		li_hotwrap.style['box-shadow']="0 1px 1px #d4d3d3";
	})
})();

/* 
 * 功能：解决IE8下的媒体查询兼容性
 * 实现流程：通过resize事件实现，判断当前的屏幕为大小屏，动态调用不同的样式表
 */
var filename;
var thehead=getTagName(document,'head')[0];
var thelink=document.createElement("link");  
thelink.setAttribute("rel", "stylesheet");  
thelink.setAttribute("type", "text/css");  	
thehead.appendChild(thelink); 
changeCss();

function changeCss(){
	if(browserWidth<1205){
		filename="style/smallscreen.css";
	}
	else{
		filename="style/bigscreen.css";
	}		
	thelink.setAttribute("href", filename);  
}
addEvent(window,'resize',changeCss);




// 总结： 1、对于复杂问题的分解化有一定提高
//        2、对于功能的实现，函数的模块化还是不够的
//        3、对于组件开发，如分页器，轮播，弹框。还是不够，这里只是实现了当前效果，对代码复用还是不行的
//        4、对于分页组件，在理解上还是有一定问题的，所以实现不理想，接下来一定要分解慢慢弄
//        5、对于网页的性能问题，还没有怎么考虑，单纯实现了效果。对于定时器的使用，用户频繁触发事件，
//        	  作用域中变量的释放函数的调用内存问题，这方面还是不够的。

