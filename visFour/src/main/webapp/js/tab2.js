(function(){
    console.log("tab2立即执行函数")
    showH();
    showE();
    showJ();
    showB();
})()
var all_data;
function showH(tmp){
    var chartDom = document.querySelector('.H .chart');
    var myChart = echarts.init(chartDom);
    var option
    const factor = [
        "PM2.5","PM10","SO2","NO2","CO","O3"
    ];
    const gas = [
        "PM2.5","PM10","SO2","NO2","CO","O3",
        "TEMP","RH","PSFC"
    ];
    var data = []
    // 生成随机数据
    for (let i = 0; i < gas.length; i++) {
        for (let j = 0; j < factor.length; j++) {
        data.push([
            factor[j],
            gas[i],
            Math.random().toFixed(1)  // 随机生成0到10之间的值
        ]);
        }
    }
    if(tmp) data = tmp
    option = {
        tooltip: {
            position: 'top'
        },
        grid: {
            left:"15%",
            right:"5%",
            height: '80%',
            top: '10%'
        },
        xAxis: {
            type: 'category',
            data: factor,
            splitArea: {
                show: true
            },
            axisLabel: {
                color: '#fff', 
                fontSize: 12
            }
        },
        yAxis: {
            type: 'category',
            data: gas,
            splitArea: {
                show: true
            },
            axisLabel: {
                color: '#fff', 
                fontSize: 12
            }
        },
        visualMap: {
            min: 0,
            max: 1,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            height:"5%",
            show:false
        },
        series: [
            {
            name: 'R',
            type: 'heatmap',
            data: data,
            label: {
                show: true
            },
            emphasis: {
                itemStyle: {
                shadowBlur: 1,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
            }
        ]
    };
    option && myChart.setOption(option);
    // 监听图表的大小
    window.addEventListener("resize", function() {
        myChart.resize();
    });

}
function showE(tmp){
    var chartDom = document.querySelector('.E .chart');
    var myChart = echarts.init(chartDom);
    var option
    //生成模拟数据
    var data = []
    for(var i=1;i<=31;i++){
        var date = i
        var aqi = Math.floor(Math.random()*500)
        var PM25 = Math.floor(Math.random()*500)
        var PM10 = Math.floor(Math.random()*500)
        var CO = Math.floor(Math.random()*500)
        var O3 = Math.floor(Math.random()*500)
        var NO2 = Math.floor(Math.random()*500)
        var SO2 = Math.floor(Math.random()*500)
        var TEMP = Math.floor(Math.random()*500)
        var RH = Math.floor(Math.random()*100)
        var PSFC = Math.floor(Math.random()*500)
        var level
        if(aqi>300) level="严重污染"
        else if(aqi>=201) level = "重度污染"
        else if(aqi>=151) level = "中度污染"
        else if(aqi>=101) level = "轻度污染"
        else if(aqi>=51) level = "良"
        else level = "优"
        data.push([date,aqi,PM25,PM10,CO,O3,NO2,SO2,TEMP,
            RH,PSFC,level])
    }
    if(tmp) data = tmp
    var schema = [
    { name: 'date', index: 0, text: '日期' },
    { name: 'AQI', index: 1, text: 'AQI' },
    { name: 'PM25', index: 2, text: 'PM2.5' },
    { name: 'PM10', index: 3, text: 'PM10' },
    { name: 'CO', index: 4, text: ' CO' },
    { name: 'O3', index: 5, text: ' O3' },
    { name: 'NO2', index: 6, text: 'NO2' },
    { name: 'SO2', index: 7, text: 'SO2' },
    { name: 'TEMP', index: 8, text: 'TEMP' },
    { name: 'RH', index: 9, text: 'RH' },
    { name: 'PSFC', index: 10, text: 'PSFC' },
    { name: '等级', index: 11, text: '等级' }
    ];
    var lineStyle = {
        width: 1,
        opacity: 0.5
    };
    option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {

            }
        },
        parallelAxis: [
            {
                dim: 0,
                type:"category",
                name: schema[0].text,
                inverse: true,
                interval:data.length/5,
                min: data[0][0],
                max: data[data.length-1][0],
                nameLocation: 'start',
                axisLabel: {
                    formatter: function (value) {
                        return value
                    }
                },
            },
            {   dim: 1, 
                name: schema[1].text ,
                max:Math.max(...data.map(item => item[1])),
            },
            {   dim: 2,
                name: schema[2].text,
                max:Math.max(...data.map(item => item[2]))
            },
            {   dim: 3,
                name: schema[3].text,
                max:Math.max(...data.map(item => item[3]))
            },
            {   dim: 4,
                name: schema[4].text,
                max:Math.max(...data.map(item => item[4]))
            },
            {   dim: 5,
                name: schema[5].text,
                max:Math.max(...data.map(item => item[5]))
            },
            {   dim: 6,
                name: schema[6].text,
                max:Math.max(...data.map(item => item[6]))
            },
            {   dim: 7,
                name: schema[7].text,
                max:Math.max(...data.map(item => item[7]))
            },
            {   dim: 8,
                name: schema[8].text,
                min:Math.min(...data.map(item => item[8])),
                max:Math.max(...data.map(item => item[8]))
            },
            {   dim: 9,
                name: schema[9].text,
                max:100
            },
            {   dim: 10,
                name: schema[10].text,
                min:Math.min(...data.map(item => item[10])),
                max:Math.max(...data.map(item => item[10]))
            },
            {
                dim: 11,
                name: schema[11].text,
                type: 'category',
                data: ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染']
            }
        ],
        visualMap: {
            top:"20%",
            bottom:"5%",
            show: true,
            min: 0,
            max: 500,
            dimension: 2,
            inRange: {
            color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
            // colorAlpha: [0, 1]
            }
        },
        parallel: {
            top:"50",
            left: '5%',
            right: '10%',
            bottom:"10%",
            parallelAxisDefault: {
            type: 'value',
            name: 'AQI指数',
            nameLocation: 'end',
            nameGap: 20,
            nameTextStyle: {
                color: '#fff',
                fontSize: 14
            },
            axisLine: {
                lineStyle: {
                color: '#aaa'
                }
            },
            axisTick: {
                lineStyle: {
                    color: '#777'
                }
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                color: '#fff',
            }
            }
        },
        series: [
            {
                // name: '某地',
                type: 'parallel',
                lineStyle: lineStyle,
                data: data
            }
        ]
    };
      
    option && myChart.setOption(option);

    // 监听图表的大小
    window.addEventListener("resize", function() {
        myChart.resize();
    });
}
function showJ(tmp){
    var chartDom = document.querySelector('.J .chart');
    var myChart = echarts.init(chartDom);
    var option
    var data = {time:["20130101","20130102"],data:[
              {
                name: 'PM2.5',
                type: 'line',
                stack: 'Total',
                data: [120,130]
              },
            {
                name: 'PM10',
                type: 'line',
                stack: 'Total',
                data: [140,150]
            },
            {
                name: 'SO2',
                type: 'line',
                stack: 'Total',
                data: [100,100]
            },
            {
                name: 'NO2',
                type: 'line',
                stack: 'Total',
                data: [120,100]
            },
            {
                name: 'CO',
                type: 'line',
                stack: 'Total',
                data: [120,130]
            },
            {
                name: 'O3',
                type: 'line',
                stack: 'Total',
                data: [120,130]
            },
            {
                name: 'AQI',
                type: 'line',
                stack: 'Total',
                data: [180,110]
            },
        ]}

    if(tmp) data = tmp
    var legend = ["PM2.5","PM10","SO2","NO2","CO","O3","AQI"]
    option = {
        pause:false,
        tooltip: {
          trigger: 'axis'
        },
        legend: {
            textStyle: {
                color: '#FFF'
            },
            data: legend
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '20%',
          containLabel: true
        },
        dataZoom: [
            {
                top:"85%",
                left:"7%",
                height:"10%",
                start:0,
                end:10,
                startValue: '20130101',
                throttle: 200
            },
            {
              type: 'inside'
            }
        ],
        xAxis: {
          type: 'category',
          axisLabel: {
              color: '#FFF'
          },
          boundaryGap: false,
          data: data.time
            
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#FFF'
            }
          }
        },
        series:data.data
      };

    option && myChart.setOption(option);
    // 监听图表的大小
    window.addEventListener("resize", function() {
        myChart.resize();
    });

}
function showB(tmp){
    var chartDom = document.querySelector('.B .chart');
    var myChart = echarts.init(chartDom);
    var option;
    // 模拟数据
    var data = [
    { time: '20130101', windSpeed: 5, gas: 220, windDirection: 45 },
    { time: '20130102', windSpeed: 8, gas: 30, windDirection: 135 },
    { time: '20130103', windSpeed: 10, gas: 140, windDirection: 225 },
    { time: '20130104', windSpeed: 7, gas: 400, windDirection: 315 },
    { time: '20130105', windSpeed: 9, gas: 25, windDirection: -90 },
    { time: '20130106', windSpeed: 7, gas: 25, windDirection: 90 },
    { time: '20130107', windSpeed: 1, gas: 120, windDirection: 0 }
    ];
    if(tmp) data = tmp;
    data = data.map(item =>[item.time,item.gas,item.windSpeed,item.windDirection])
    option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                var data = params.data;
                return '时间: ' + data[0] + '<br/>' +
                    '浓度: ' + data[1] + '<br/>' +
                    '风速: ' + data[2] + 'm/s<br/>' +
                    '风向: ' + data[3]+"°";
            }
        },
        brush: {
            toolbox: ['lineY', 'clear'], // 设置刷选工具箱中的按钮类型
            throttleType: 'debounce', // 设置触发刷选的方式为防抖动模式
            throttleDelay: 300, // 设置防抖动延迟时间，单位为毫秒
            xAxisIndex:"all",
            brushType: 'lineY' // 设置刷选方向为横向和纵向
        },
        grid:{
            top:"10%",
            bottom:"23%",
            left:"10%",
            right:"10%"
        },
        dataZoom: [
            {
              top:"87%",
              left:"10%",
              height:"10%",
            },
            {
              type: 'inside'
            }
        ],
        xAxis: {
            type: 'category',
            data: data.map(item => item[0]),
            axisLabel: {
                textStyle: {
                  color: '#fff' ,
                  fontSize:10
                }
            },
            axisTick: {
                alignWithLabel: true // 让刻度和标签对齐
            },
            splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed',
                  color: '#fff' // 设置虚线颜色为白色
                }
              }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                textStyle: {
                  color: '#fff' // 设置坐标轴字体颜色为白色
                },
                fontSize:10
            }
        },
        visualMap: {
            type: 'continuous', // 设置为渐变
            show: false,
            dimension: 1,  // 指定gas浓度在数据中的维度
            min: 0, // 颜色映射的最小值
            max: Math.max(...data.map(item => item[1])), // 颜色映射的最大值
            inRange: {
                color: ['#00E400', '#7E0023'] // 渐变颜色范围
            }
        },
        series: [{
            type: 'scatter',
            symbol: "arrow",
            symbolSize: function (data) {
                return Math.log(data[2])*8;
            },
            itemStyle: {
            },
            encode: {
                x: 'time',
                y: 'gas',
                tooltip: [2]
            },
            data:data,
            // 根据windDirection设置箭头旋转角度
            symbolRotate: function (data) {
                return -data[3];
            }
        }]
    };
    option && myChart.setOption(option);
    // 监听图表的大小
    window.addEventListener("resize", function() {
        myChart.resize();
    });
}

function interactive_J2BE(){
    var chartDom = document.querySelector('.J .chart');
    var myChart = echarts.init(chartDom);
    myChart.on('dataZoom', function(params) {
        var xAxis = myChart.getOption().xAxis[0]; // Get the first x-axis instance
        var length = xAxis.data.length
        var min_index = Math.round(params.start*length/100)
        var max_index = Math.max(Math.round(params.end*length/100)-1,0)
        var lat = $("#lat").text()
        var lon = $("#lon").text()
        if(all_data){
            var data = all_data
            //更新E平行坐标折线图
            var tmp = []
            for(var i=min_index;i<=max_index;i++){
                var level;
                var level_num = data[i].level
                if(level_num == 1){
                    level="优"
                }else if(level_num == 2){
                    level="良"
                }else if(level_num == 3){
                    level="轻度污染"
                }else if(level_num == 4){
                    level="中度污染"
                }else if(level_num == 5){
                    level="重度污染"
                }else if(level_num == 6){
                    level="严重污染"
                }
                tmp.push([data[i].time,data[i].aqi,data[i].pm25,data[i].pm10,
                    data[i].co,data[i].o3,data[i].no2,data[i].so2,data[i].temp,
                    data[i].rh,data[i].psfc,level])
            }
            showE(tmp)
            var tmp = []
            for(var j=min_index;j<=max_index;j++){
                tmp.push({time:data[j].time,gas:+data[j]["no2"],windSpeed: +data[j].wind_speed, windDirection: data[j].wind_degree})
            }
            showB(tmp)
        }
        else getData(lat,lon,2).then((data)=>{
            data.sort(function(a,b){
                return +a.time-+b.time
            })
            all_data = data
            //更新E平行坐标折线图
            var tmp = []
            for(var i=min_index;i<=max_index;i++){
                var level;
                var level_num = data[i].level
                if(level_num == 1){
                    level="优"
                }else if(level_num == 2){
                    level="良"
                }else if(level_num == 3){
                    level="轻度污染"
                }else if(level_num == 4){
                    level="中度污染"
                }else if(level_num == 5){
                    level="重度污染"
                }else if(level_num == 6){
                    level="严重污染"
                }
                tmp.push([data[i].time,data[i].aqi,data[i].pm25,data[i].pm10,
                    data[i].co,data[i].o3,data[i].no2,data[i].so2,data[i].temp,
                    data[i].rh,data[i].psfc,level])
            }
            showE(tmp)
            //更新B风向图
            var tmp = []
            for(var j=min_index;j<=max_index;j++){
                tmp.push({time:data[j].time,gas:+data[j]["no2"],windSpeed: +data[j].wind_speed, windDirection: data[j].wind_degree})
            }
            showB(tmp)
        })
    });
}
interactive_J2BE()
function interactive_B() {
    $(".B .gas").change(function() {
        // 获取选择的选项的值
        var gas = $(this).val();
        var lat = $("#lat").text()
        var lon = $("#lon").text()
        getBData(lat,lon,gas)
    });
}
interactive_B()
var timer
function startAutoplay_J() {
    //自动播放设置
    timer = setInterval(function () {
        var chartDom = document.querySelector('.J .chart');
        var myChart = echarts.init(chartDom);
        var option = myChart.getOption()
        option.dataZoom[0].end += 1
        // 检查数据索引是否达到末尾
        if (option.dataZoom[0].end > 100) {
            //重置数据索引以重新开始
            option.dataZoom[0].start = 0;
            option.dataZoom[0].end = 1;
        }
        // 使用新的数据索引更新图表
        myChart.setOption(option);
    }, 3000);


}
startAutoplay_J()
function stopAutoplay_J(){
    // 暂停自动播放
    $("#pauseJ").on('click', function () {
        var chartDom = document.querySelector('.J .chart');
        var myChart = echarts.init(chartDom);
        var option = myChart.getOption()
        console.log("pause:",option.pause)
        if (option.pause == false) {
            console.log("想要通过点击暂定")
            clearInterval(timer);
            option.pause = true;
        } else {
            console.log("想要通过点击继续")
            startAutoplay_J();
            option.pause = false;
        }
        myChart.setOption(option)
    });
}
stopAutoplay_J()