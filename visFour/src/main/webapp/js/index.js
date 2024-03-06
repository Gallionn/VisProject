(function(){
    //console.log("启动立即执行函数...")
    showA();
    showD();
    showB();
    showF();
    showE();
    showH();
    showC();
    showG();
    calendar_ctrl();
    interactive_D2E();
    interactive_F2GB();
    interactive_C();
    interactive_D();
})()
function showA(tmp){
    //初始化echarts实例
    var myChart = echarts.init(document.querySelector(".A .chart"));

    var geoCoordMap = {
        "海门":[121.15,31.89],

    };
    var data = [
        {name: "海门", value: 50},
    ]
    var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push(geoCoord.concat(data[i].value));
        }
    }
        return res;
    };

    var option = {
        backgroundColor: 'transparent',
        title: {},
        tooltip: {
            trigger: 'item'
            // 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
        },
        legend: {
            show: false  // 将图例设置为不可见
        },

        visualMap: {
            min: 0,
            max: 300,
            splitNumber: 5,
            // 对于连续型数据，自动平均切分成几段。默认为5段。
            // 连续数据的范围需要 max 和 min 来指定。

            color: ['#d94e5d','#eac736','#50a3ba'],
            textStyle: {
                color: '#fff'
            }
        },

        geo: {
            map: "china",
            label: {
            emphasis: {
                show: true,
                color: "#fff"
            }
            },
            roam: false,
            //   放大我们的地图
            zoom: 1,
            itemStyle: {
            //normal: {
                areaColor: "rgba(43, 196, 243, 0.42)",
                borderColor: "rgba(43, 196, 243, 1)",
                borderWidth: 1,
            //},
            emphasis: {
                areaColor: "#2B91B7"
            }
            }
        },
        series: [
            {
                name: 'AQI',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(data),
                symbolSize: 20,
                encode: {
                    value: 2
                },
                label: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    label: {
                    show: true
                    }
                }
            },
            {
                name: 'AQI',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(
                data
                    .sort(function (a, b) {
                    return b.value - a.value;
                    })
                    .slice(0, 6)
                ),
                symbolSize: 20,
                encode: {
                value: 2
                },
                showEffectOn: 'render',
                rippleEffect: {
                brushType: 'stroke'
                },
                label: {
                formatter: '{b}',
                position: 'right',
                show: true
                },
                itemStyle: {
                shadowBlur: 10,
                shadowColor: '#333'
                },
                emphasis: {
                scale: true
                },
                zlevel: 1
            }
        ]
    }
    
    //使用制定的配置项和数据显示图表
    myChart.setOption(option);
}
function showD(tmp){
    //初始化echarts实例
    var myChart = echarts.init(document.querySelector(".D .chart"));

    var kind = "SO2"
    var gas = [
        [
            '1', '2', '3', '4', '5', '6', '7',
            '8', '9', '10', '11', '12',
            '13', '14', '15', '16', '17', '18',
            '19', '20', '21', '22', '23', '24',
            '25', '26', '27', '28', '29', '30',
            '31'
        ],
        [
            '1', '2', '3', '4', '5', '6', '7',
            '8', '9', '10', '11', '12',
            '13', '14', '15', '16', '17', '18',
            '19', '20', '21', '22', '23', '24',
            '25', '26', '27', '28'
        ],
        [
            '1', '2', '3', '4', '5', '6', '7',
            '8', '9', '10', '11', '12',
            '13', '14', '15', '16', '17', '18',
            '19', '20', '21', '22', '23', '24',
            '25', '26', '27', '28', '29', '30',
            '31'
        ],
        [
            '1', '2', '3', '4', '5', '6', '7',
            '8', '9', '10', '11', '12',
            '13', '14', '15', '16', '17', '18',
            '19', '20', '21', '22', '23', '24',
            '25', '26', '27', '28', '29', '30'
        ],
        [
            '1', '2', '3', '4', '5', '6', '7',
            '8', '9', '10', '11', '12',
            '13', '14', '15', '16', '17', '18',
            '19', '20', '21', '22', '23', '24',
            '25', '26', '27', '28', '29', '30',
            '31'
        ],
        [
            '1', '2', '3', '4', '5', '6', '7',
            '8', '9', '10', '11', '12',
            '13', '14', '15', '16', '17', '18',
            '19', '20', '21', '22', '23', '24',
            '25', '26', '27', '28', '29', '30'
        ],
        [
            '1', '2', '3', '4', '5', '6', '7',
            '8', '9', '10', '11', '12',
            '13', '14', '15', '16', '17', '18',
            '19', '20', '21', '22', '23', '24',
            '25', '26', '27', '28', '29', '30', "31"
        ],
        [
            '1', '2', '3', '4', '5', '6', '7',
            '8', '9', '10', '11', '12',
            '13', '14', '15', '16', '17', '18',
            '19', '20', '21', '22', '23', '24',
            '25', '26', '27', '28', '29', '30',
            '31'
        ],
        [
            '1', '2', '3', '4', '5', '6', '7',
            '8', '9', '10', '11', '12',
            '13', '14', '15', '16', '17', '18',
            '19', '20', '21', '22', '23', '24',
            '25', '26', '27', '28', '29', '30',
        ],
        [
            '1', '2', '3', '4', '5', '6', '7',
            '8', '9', '10', '11', '12',
            '13', '14', '15', '16', '17', '18',
            '19', '20', '21', '22', '23', '24',
            '25', '26', '27', '28', '29', '30',
            "31"
        ],
        [
            '1', '2', '3', '4', '5', '6', '7',
            '8', '9', '10', '11', '12',
            '13', '14', '15', '16', '17', '18',
            '19', '20', '21', '22', '23', '24',
            '25', '26', '27', '28', '29', '30',
        ],
        [
            '1', '2', '3', '4', '5', '6', '7',
            '8', '9', '10', '11', '12',
            '13', '14', '15', '16', '17', '18',
            '19', '20', '21', '22', '23', '24',
            '25', '26', '27', '28', '29', '30',
            "31"
        ],
        [
            '1', '2', '3', '4', '5', '6', '7',
            '8', '9', '10', '11', '12',
            '13', '14', '15', '16', '17', '18',
            '19', '20', '21', '22', '23', '24',
            '25', '26', '27', '28', '29'
        ]]
    var months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月",
        "8月", "9月", "10月", "11月", "12月"];
    var data = []
    if(tmp) data = tmp;
    //生成模拟数据
    for(var i=0;i<12;i++){
        var right;
        if (i==3 || i==5 || i==8 || i==10){
            right = 30;
        }
        else if(i==1){
            right = 28
        }
        else{
            right = 31;
        }
        for(var j=0;j<right;j++){
            var t = []
            t.push(i)
            var val = Math.floor(Math.random() * 10) + 1
            t.push(j)
            t.push(val)
            data.push(t)
        }
    }
    // 按照第一维进行排序
    data.sort(function(a, b) {
        return a[0] - b[0];
    });
    var title = [];
    var singleAxis = [];
    var series = [];
    months.forEach(function (month, idx) {
        title.push({
            textBaseline: 'middle',
            top: ((idx + 0.5) * 90) / 12 + 1.75 + '%',
            text: month,
            textStyle: {
                color: '#FFF' // 设置month的颜色为白色
              }
        });
        // 设置坐标轴的样式
        singleAxis.push({
            left: 60,
            type: 'category',
            boundaryGap: false,
            data: gas[idx],
            top: (idx * 90) / 12 + 6 + '%',
            height: 90 / 12 - 12 + '%',
            axisLabel: {
                interval: 4,
                textStyle: {
                    color: '#FFF'
                  }
            },
            axisLine: {
                lineStyle: {
                    color: "#4c9bfd"
                }
            },
            axisTick: {
                show: false,
            },
        });
        // 把点放进来
        series.push({
            singleAxisIndex: idx,
            coordinateSystem: 'singleAxis',
            type: 'scatter',
            data: [],
            symbolSize: function (dataItem) {
                return dataItem[1];
            }
        });
    });
    data.forEach(function (dataItem) {
        series[dataItem[0]].data.push([dataItem[1],dataItem[2]]);
    });
    option = {
        tooltip: {
            trigger: 'item',
            position: 'top',
            formatter: function (params) {
                var seriesIndex = params.seriesIndex;
                var dataIndex = params.dataIndex;
                var value = series[seriesIndex].data[dataIndex];
                return (value[0]+1) + '日' + kind +":"+ value[1];
            }
        },
        title: title,
        singleAxis: singleAxis,
        series: series
    };
    // 把配置给实例对象
    myChart.setOption(option);

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
    // 生成option配置
    option = {
        grid:{
            top:"10%",
            bottom:"10%",
            left:"10%",
            right:"10%"
        },
        xAxis: {
            type: 'category',
            data: data.map(item => item.time),
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
            dimension: 2,  // 指定gas浓度在数据中的维度
            min: 0, // 颜色映射的最小值
            max: 500, // 颜色映射的最大值
            inRange: {
                color: ['#00E400', '#7E0023'] // 渐变颜色范围
            }
        },
        series: [{
            type: 'scatter',
            symbol: "arrow",
            symbolSize: function (data) {
                return Math.log(data[2])*4;
            },
            itemStyle: {
            },
            encode: {
                x: 'time',
                y: 'windSpeed',
                tooltip: [2]
            },
            data:  data.map(item =>[item.time,item.windSpeed,item.gas,item.windDirection]),
            // 根据windDirection设置箭头旋转角度
            symbolRotate: function (data) {
            return -data[3];
        }
        }]
    };
    option && myChart.setOption(option);

}
function showF(tmp){
    var chartDom = document.querySelector('.F .chart');
    var myChart = echarts.init(chartDom);
    var option
    //生成模拟数据
    var data = []
    // 定义起始日期和结束日期
    var startDate = new Date('2013-01-01');
    var endDate = new Date('2018-12-31');
    // 创建一个空数组来保存时间序列
    var timeSeries = [];
    // 循环遍历日期范围内的每一天，并将其添加到时间序列数组中
    while (startDate <= endDate) {
        var currentDate = new Date(startDate);
        var date = currentDate.toISOString().split('T')[0]
        var aqi = Math.random()*500
        data.push([date,aqi])
        startDate.setDate(startDate.getDate() + 1);
    }
    if(tmp) data = tmp
    option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
            top:"5%",
            left: '5%',
            right: '15%',
            bottom: '40%'
        },
        xAxis: {
          data: data.map(function (item) {
            return item[0];
          }),
          axisLabel: {
            textStyle: {
              color: '#FFF'
            }
          }
        },
        yAxis: {
            axisLabel: {
                textStyle: {
                  color: '#FFF'
                }
              }
        },
        dataZoom: [
          {
            top:"78%",
            height:"15%",
            startValue: '2013-01-01'
          },
          {
            type: 'inside'
          }
        ],
        visualMap: {
            textStyle: {
                color: '#FFF'
            },
            top: "5%",
            right: 10,
            pieces: [
                    {
                    gt: 0,
                    lte: 50,
                    color: '#93CE07'
                    },
                    {
                    gt: 50,
                    lte: 100,
                    color: '#FBDB0F'
                    },
                    {
                    gt: 100,
                    lte: 150,
                    color: '#FC7D02'
                    },
                    {
                    gt: 150,
                    lte: 200,
                    color: 'red'
                    },
                    {
                    gt: 200,
                    lte: 300,
                    color: '#AA069F'
                    },
                    {
                    gt: 300,
                    color: '#AC3B2A'
                    }
            ],
            outOfRange: {
                color: '#999'
            }
        },
        series: {
          name: 'AQI',
          type: 'line',
          data: data.map(function (item) {
            return item[1];
          }),
          markLine: {
            silent: true,
            lineStyle: {
              color: '#333'
            },
            label: {
                fontSize: 12
              },
            data: [
                {
                    yAxis: 50
                },
                {
                    yAxis: 100
                },
                {
                    yAxis: 150
                },
                {
                    yAxis: 200
                },
                {
                    yAxis: 300
                }
            ]
          }
        }
      }
    option && myChart.setOption(option);
}
function showE(tmp){
    var chartDom = document.querySelector('.E .chart');
    var myChart = echarts.init(chartDom);
    var option
    //生成模拟数据
    var data = []
    for(var i=1;i<=31;i++){
        var date = i
        var aqi = Math.random()*500
        var PM25 = Math.random()*500
        var PM10 = Math.random()*500
        var CO = Math.random()*500
        var O3 = Math.random()*500
        var NO2 = Math.random()*500
        var SO2 = Math.random()*500
        var TEMP = Math.random()*500
        var RH = Math.random()*500
        var PSFC = Math.random()*500
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
    { name: 'AQIindex', index: 1, text: 'AQI' },
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
            padding: 10,
            backgroundColor: '#222',
            borderColor: '#777',
            borderWidth: 1
        },
        parallelAxis: [
            {
                dim: 0,
                name: schema[0].text,
                inverse: true,
                interval:5,
                max: data.length,
                nameLocation: 'start',
            },
            {   dim: 1, 
                name: schema[1].text ,
                max:500
            },
            {   dim: 2,
                name: schema[2].text,
                max:500
            },
            {   dim: 3,
                name: schema[3].text,
                max:500
            },
            {   dim: 4,
                name: schema[4].text,
                max:500
            },
            {   dim: 5,
                name: schema[5].text,
                max:500
            },
            {   dim: 6,
                name: schema[6].text,
                max:500
            },
            {   dim: 7,
                name: schema[7].text,
                max:500
            },
            {   dim: 8,
                name: schema[8].text,
                max:500
            },
            {   dim: 9,
                name: schema[9].text,
                max:500
            },
            {   dim: 10,
                name: schema[10].text,
                max:500
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
            bottom:"5%",
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
                name: '某地',
                type: 'parallel',
                lineStyle: lineStyle,
                data: data
            }
        ]
    };
      
    option && myChart.setOption(option);

}
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
                fontSize: 8
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
                fontSize: 8
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

}
function showC(tmp){
    var chartDom = document.querySelector('.C .chart');
    var myChart = echarts.init(chartDom);
    var option
    const mouths = [
        "1月","2月","3月","4月","5月","6月",
        "7月","8月","9月","10月","11月","12月"
    ];
    const gas = [
        "PM2.5","PM10","SO2","NO2","CO","O3"
    ];
    //生成模拟数据
    var data = []
    for(var i=0;i<gas.length;i++){
        for(var j=0;j<mouths.length;j++){
            var val = Math.random()*10;
            data.push([i,j,val])
        }
    }
    if(tmp) data = tmp
    option = {
        grid:{
            top:"10%",
            bottom:"10%"
        },
        polar: {
            center: ['50%', '50%'], // 调整中心位置
            radius: '78%' // 调整半径范围，使点和标签都能够显示出来
        },
        tooltip: {
            formatter: function (params) {
            return (
                params.value[2] +
                ' commits in ' +
                mouths[params.value[1]] +
                ' of ' +
                gas[params.value[0]]
            );
            }
        },
        angleAxis: {
            type: 'category',
            data: mouths,
            boundaryGap: 100,
            splitLine: {
                show: true
            },
            axisLine: {
                show: true
            },
            axisLabel:{
                textStyle:{
                    color:"#fff",
                    fontSize:10
                }
            }
        },
        radiusAxis: {
            type: 'category',
            data: gas,
            axisLine: {
                show: true
            },
            axisLabel: {
                rotate: 45,
                textStyle:{
                    color:"#fff",
                    fontSize:8
                }
            },
            z: 10 
        },
        series: [
            {
                name: 'Punch Card',
                type: 'scatter',
                coordinateSystem: 'polar',
                symbolSize: function (val) {
                    return Math.log(val[2])*2
                },
                data: data,
                itemStyle: {
                    //normal: {
                    color: function (params) {
                        var colorList = [
                        '#FF5722', '#FF9800', '#FFEB3B', '#4CAF50', '#00BCD4', '#3F51B5'
                        ];
                        return colorList[params.value[0]];
                    }
                    //}
                },
                animationDelay: function (idx) {
                    return idx * 5;
                }
            }
        ]
    };
      
    option && myChart.setOption(option);
}
function showG(tmp){
    var columnControllers = document.querySelectorAll('.column-controller');
    var chartDom = columnControllers[1].querySelector('.chart');
    var myChart = echarts.init(chartDom);
    var option

    var data = [702, 350, 610, 793, 664, 400];
    if(tmp){
        console.log("真实操作")
        console.log(tmp)
        var data = tmp;
    }
    var color = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6", "#4c9bfd"];
    var sum = data.reduce((acc, curr) => acc + curr);
    var percentageArr = data.map(num => Math.round((num / sum) * 100));
  
    // 2. 指定配置和数据
    option = {
      grid: {
        top: "10%",
        left: "30%",
        right:"20%",
        bottom: "10%"
      },
      xAxis: {
        show: false
      },
      yAxis: [
        {
          type: "category",
          inverse: true,
          data: ["PM10", "PM2.5", "SO2", "CO", "NO2", "O3"],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#fff",
            fontSize: 12
          }
        },
        {
          data: data,
          inverse: true,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#fff",
            fontSize: 12,
          }
        }
      ],
      series: [
        {
          name: "条",
          type: "bar",
          data: percentageArr,
          yAxisIndex: 0,
          itemStyle: {
            borderRadius : 15,
            color: function(params) {
              return color[params.dataIndex];
            }
          },
          barCategoryGap:100,
          barWidth: 12,
          label: {
            show: true,
            position: "right",
            formatter: "{c}%",
            fontSize: 10
          }
        },
        {
            name: "框",
            type: "bar",
            position: "right",
            barCategoryGap:100,
            barWidth: 15,
            yAxisIndex: 1,
            data: [100, 100, 100, 100, 100, 100],
            itemStyle: {
                color: "none",
                borderColor: "#00c1de",
                borderWidth: 3,
                borderRadius : 15
            }
        }
      ]
    };
    option && myChart.setOption(option);
}

function calendar_ctrl(){
    // 获取按钮和日历元素
    var dateButton = $("#dateButton");
    var calendarContainer = $("#calendarContainer");
    var calendar = $("#calendar");
    
    // 点击按钮时显示日历
    var initialDate = parseDate(dateButton.text());
    dateButton.on("click", function() {
        calendarContainer.show();
        calendar.calendar('moveTo', initialDate);
    });
    // 初始化日历控件
    calendar.calendar({
            onSelect: function(date) {
            var formattedDate = formatDate(date);
            dateButton.text(formattedDate);
            console.log("选中的日期：",formattedDate)
            var time = formattedDate.replace(/-/g, "");
            var lat = $("#lat").text()
            var lon = $("#lon").text()
            lat = 18.34
            lon = 109.25
            console.log(time,lat,lon)
            //交互更新图表
            getGData(lat,lon,time)
            getBData(lat,lon,time,"pm25")
            getFData(lat,lon,time)//仅测试用
            getHData(lat,lon,time)//仅测试用
            // 隐藏日历
            calendarContainer.hide();
        }
    });
}
// 辅助函数：解析日期文本为日期对象
function parseDate(dateText) {
    var parts = dateText.split("-");
    var year = parseInt(parts[0]);
    var month = parseInt(parts[1]) - 1;
    var day = parseInt(parts[2]);
    return new Date(year, month, day);
}
// 辅助函数：将日期对象格式化为字符串
function formatDate(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var day = date.getDate().toString().padStart(2, "0");
    return year + "-" + month + "-" + day;
}
function interactive_D2E () {
    var myChart = echarts.init($('.D .chart').get(0));
    // 添加点击事件
    myChart.on('click', function (params) {
        if (params.seriesType === 'scatter') {
            var seriesIndex = params.seriesIndex+1;

            var year = $('.D .yearSelect').val();
            var month = seriesIndex.toString().padStart(2, "0");
            var time = year+month
            console.log("目标月份：",time)
            var lat = $("#lat").text()
            var lon = $("#lon").text()
            lat = 18.34
            lon = 109.25
            getEData(lat,lon,time)
            // 更新图表
            myChart.setOption(option);
        }
    });
}
function interactive_F2GB() {
    var myChart = echarts.init($('.F .chart').get(0));
    myChart.on('click', function(params) {
        if (params.componentType === 'series') {
            var xAxisValue = params.name;
            var time = xAxisValue.toString().replace(/-/g, "");
            console.log('点击的横坐标值:', time);
            var lat = $("#lat").text()
            var lon = $("#lon").text()
            lat = 18.34
            lon = 109.25
            getGData(lat,lon,time)
            getBData(lat,lon,time,"pm25")

        }
    });
}
function interactive_D () {
    $(".D .yearSelect").change(function() {
        // 获取选择的选项的值
        var year = $(this).val();
        var lat = $("#lat").text()
        var lon = $("#lon").text()
        lat = 18.34
        lon = 109.25
        getDData(lat,lon,year)
    });
}
function interactive_C () {
    $(".C .yearSelect").change(function() {
        // 获取选择的选项的值
        var year = $(this).val();
        var lat = $("#lat").text()
        var lon = $("#lon").text()
        lat = 18.34
        lon = 109.25
        getCData(lat,lon,year)
    });
}







