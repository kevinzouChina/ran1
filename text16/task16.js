/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
window.onload=function(){
var aqiData = {};
var ocity=document.getElementById("aqi-city-input");
var oinputvalue=document.getElementById("aqi-value-input");
var obtn=document.getElementById("add-btn");


/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city=ocity.value.trim();
    var inputvalue=oinputvalue.value.trim(); 
    
    /*function isChar(){
    	var reg=/^[A-Za-z\u4E00-\u9FA5]+$/;
    	if(!reg.test(city)){
    		alert("请输入中英文字符");
    	}
    }

     function isNumber(){
    	var reg=/^\d+$/;
    	if(!reg.test(inputvalue)){
    		alert("请输入数字");
    	}
    }

    if(isChar() && isNumber()){
    	aqiData[city]=inputvalue;
    }
    
}*/
        if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
        	alert("请输入中英文字符");
        	return;
        }
        if(!inputvalue.match(/^\d+$/)){
        	alert("请输入数字");
        	return;
        }
    aqiData[city]=inputvalue;
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var ohead="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for(var city in aqiData){
    	ohead += "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button data-city='"+city+"'>删除</button></td></tr>"
    }
    document.getElementById("aqi-table").innerHTML = city ? ohead : "";

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  delete aqiData[city];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

   obtn.onclick=addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
   document.getElementById("aqi-table").addEventListener("click", function(event){
        if(event.target.nodeName.toLowerCase() === 'button') delBtnHandle.call(null, event.target.dataset.city);
    })
}

init();
}