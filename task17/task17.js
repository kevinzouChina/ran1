/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}


var wrap=document.getElementsByClassName('aqi-chart-wrap')[0];
var city=document.getElementById("city-select");
var time=document.getElementById("form-gra-time");

/*
 * 事件处理兼容性解决方案
 */
var eventUtil={
  addEvent:function(ele,type,fn){
    if(ele.addEventListener){
      ele.addEventListener(type,fn,false);
    }

    else if(ele.attachEvent){
      ele.attachEvent("on"+type,fn);
    }
    else{
      ele["on"+type]=fn;
    }
  },

  getEvent:function(event){
    return event || window.event;
  },

  getSource:function(event){
    return event.srcElement || event.target;
  }
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "month"
}

/**
 * 渲染图表
 */
function renderChart() {
  var str="";
  for(var i in charData){
      // var color="#"+Math.floor(Math.random() * oxFFFFFF).toString(16);
      var color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
      var marginLeft=(wrap.clientWidth/(Object.keys(charData).length))/2;
      var width=(wrap.clientWidth/(Object.keys(charData).length))/2;
      str+="<div"+"  title="+i+":"+charData[i]+"  style='display:inner-block;height:"+charData[i]+"px; "+"background:"+color+"; width:"+Math.floor(width)+"px; float:left; margin-right:"+Math.floor(marginLeft)+"px;'></div>";
  }
  wrap.innerHTML=str;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(evevt) {
  // 确定是否选项发生了变化 
  event=eventUtil.getEvent();
  var nowTarget=eventUtil.getSource(event);
  // 设置对应数据
  var nowTime=nowTarget.value;
  pageState.nowGraTime=nowTime;
  // 调用图表渲染函数
  initAqiChartData();
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(event) {
  // 确定是否选项发生了变化 
  event=eventUtil.getEvent();
  var nowTarget=eventUtil.getSource(event);
  var nowCity=nowTarget.value;
  
  // 设置对应数据
  pageState.nowSelectCity=nowCity;

  // 调用图表渲染函数
  initAqiChartData();
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  eventUtil.addEvent(time,"change",graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {

  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  city.innerHTML=null;
  for(var i in aqiSourceData){
    var opt =new Option(i,i);
    city.appendChild(opt);
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  eventUtil.addEvent(city,"change",citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var nowCharData=aqiSourceData[pageState.nowSelectCity];
  if(pageState.nowGraTime=="day"){
      charData=nowCharData;
  }

  if(pageState.nowGraTime=="week"){
      charData={};
      var countSeed=0,week=0,sumDay=0;
      for(var i in nowCharData){
        countSeed+=nowCharData[i];
        sumDay++;
        if(new Date(i).getDay() == 6){
          week++;
          charData[week]=Math.ceil(countSeed/7);
          countSeed=0;
          sumDay=0;
        }
      }

      //最后不满一周的处理
      if(sumDay != 0){
        week++;
        charData[week]=Math.ceil(countSeed/sumDay);
      }
  }

  if(pageState.nowGraTime=="month"){
    charData={};
    var monthSeed=0;month=0;sumMonth=0;
    for(var i in nowCharData){
      monthSeed +=nowCharData[i];
      sumMonth++;
      if((new Date(i).getMonth()) !== month){
        month++;
        charData[month]=Math.ceil(monthSeed/sumMonth);
        monthSeed=0;
        sumMonth=0;
      }
    }

    //最后一月不是整月天处理
    if(sumMonth != 0){
      month++;
      charData[month]=Math.ceil(monthSeed/sumMonth);
    }
  }  
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}
init();
renderChart();