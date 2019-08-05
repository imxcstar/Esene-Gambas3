function loadScript(url, callback) {
 callback = typeof callback === 'function' ? callback : function() {};
 var head = document.getElementsByTagName('head')[0];
 var script = document.createElement('script');
 script.type = 'text/javascript';
 script.src = url; 
 script.onreadystatechange = function() {
 if(this.readyState == "loaded" || this.readyState == "complete"){
  callback();
 }
 }
 script.onload = callback;
 head.appendChild(script);
}

var myChart;
var app = {};

var max_x = 300;
var y_data = [];
var y_data_time = [];

function get_array_num(num) {
    var ret = [];
    for (var i = 0; i < num; i++) {
        (function(){
          ret.push(i);
        })(i)
    }
    return ret
}

function add_data(value) {
    if (y_data.length > max_x) {
        y_data.shift();
        y_data_time.shift();
    }
    y_data.push(value);
    var t_time = new Date();
    y_data_time.push('Time: ' + [t_time.getFullYear(), t_time.getMonth(), t_time.getDate()].join('-') + ' ' + [t_time.getHours(), t_time.getMinutes(), t_time.getSeconds(), t_time.getMilliseconds()].join(':') + '<br>TimeStamp: ' + t_time.getTime());

    myChart.setOption({
        series: [{
            data: y_data
        }]
    });
}

function initst(){
  var option = {
      tooltip: {
          trigger: 'axis',
          hideDelay: 30000,
          formatter: function (params) {
              return 'Position: ' + params[0].dataIndex + '<br>' + y_data_time[params[0].dataIndex] + '<br>Data: ' + y_data[params[0].dataIndex];
          },
      },
      title: {
          text: 'Data'
      },
      xAxis: {
          type: 'category',
          splitLine: {
              show: false
          },
          data: get_array_num(max_x)
      },
      yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
              show: false
          }
      },
      dataZoom: [{
          type: 'inside',
          start: 0,
          end: 100
      }, {
          start: 100,
          end: max_x,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
          }
      }],
      series: [{
          name: 'Data',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: y_data
      }]
  };

  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
}

function init(){
  document.write('<div id="container" style="height: 100%"></div>');
  loadScript("http://echarts.baidu.com/gallery/vendors/echarts/echarts.min.js",function(){
    loadScript("http://echarts.baidu.com/gallery/vendors/echarts-gl/echarts-gl.min.js",function(){
      loadScript("http://echarts.baidu.com/gallery/vendors/echarts-stat/ecStat.min.js",function(){
        loadScript("http://echarts.baidu.com/gallery/vendors/echarts/extension/dataTool.min.js",function(){
          loadScript("http://echarts.baidu.com/gallery/vendors/echarts/map/js/china.js",function(){
            loadScript("http://echarts.baidu.com/gallery/vendors/echarts/map/js/world.js",function(){
              loadScript("http://echarts.baidu.com/gallery/vendors/echarts/extension/bmap.min.js",function(){
                loadScript("http://echarts.baidu.com/gallery/vendors/simplex.js",function(){
                  var dom = document.getElementById("container");
                  myChart = echarts.init(dom);

                  initst();
                });
              });
            });
          });
        });
      });
    });
  });
}

function run(data){
  add_data(parseInt(data));
  return data;
}