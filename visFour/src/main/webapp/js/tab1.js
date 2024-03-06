(function(){
    console.log("tab1启动立即执行函数...")
    showD()
    showF()
    showC()
    showG()
    showA()
    showI()
})()
function showD(tmp){
    //初始化echarts实例
    var myChart = echarts.init(document.querySelector(".D .chart"));

    var kind = $('.gas').val();
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
    if(tmp){
        data = tmp;
    }
    else {
        for (var i = 0; i < 12; i++) {
            var right;
            if (i == 3 || i == 5 || i == 8 || i == 10) {
                right = 30;
            } else if (i == 1) {
                right = 28
            } else {
                right = 31;
            }
            for (var j = 0; j < right; j++) {
                var t = []
                t.push(i)
                var val = Math.floor(Math.random() * 10) + 1
                t.push(j)
                t.push(val)
                data.push(t)
            }
        }
    }
    // 按照第一维进行排序
    data.sort(function(a, b) {
        return a[0] - b[0];
    });
    //归一化
    var maxValue = Math.max(...data.map(item => item[2]))
    var minValue = Math.min(...data.map(item => item[2]))

    var minRange = 0;
    var maxRange = 20;
    data = data.map(function(item) {
        // 使用线性映射将值从原始范围映射到新的范围
        var tmp = ((item[2] - minValue) / (maxValue - minValue)) * (maxRange - minRange) + minRange;
        return [item[0],item[1],tmp];
    });
    var title = [];
    var singleAxis = [];
    var series = [];
    months.forEach(function (month, idx) {
        title.push({
            textBaseline: 'middle',
            top: ((idx + 0.5) * 90) / 12 + 1.25 + '%',
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
            top: (idx * 90) / 12 + 5 + '%',
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
            //修改点半径大小
            symbolSize: function (dataItem) {
                return dataItem[1];
            }
        });
    });
    data.forEach(function (dataItem) {
        series[dataItem[0]].data.push([dataItem[1],dataItem[2]]);
    });
    option = {
        grid:{
            bottom:"10%"
        },
        tooltip: {
            trigger: 'item',
            position: 'top',
            formatter: function (params) {
                var seriesIndex = params.seriesIndex;
                var dataIndex = params.dataIndex;
                var value = series[seriesIndex].data[dataIndex];
                return (value[0]+1) + '日 ' + kind +": "+ value[1].toFixed(2);
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
        autoplay: true, // 添加autoplay属性
        pause: false, // 添加pause属性
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
          },
            dataIndex: 0,
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
            top:"75%",
            height:"10%",
            start:0,
            end:20,
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
            animationDelay: function (idx) {
                // 根据索引延迟每个数据点的动画
                return idx * 100;
            },
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
function showC(tmp){
    var chartDom = document.querySelector('.C .chart');
    var myChart = echarts.init(chartDom);
    //极坐标散点图
    // var option
    // const mouths = [
    //     "1月","2月","3月","4月","5月","6月",
    //     "7月","8月","9月","10月","11月","12月"
    // ];
    // const gas = [
    //     "PM2.5","PM10","SO2","NO2","CO","O3"
    // ];
    // //生成模拟数据
    // var data = []
    // for(var i=0;i<gas.length;i++){
    //     for(var j=0;j<mouths.length;j++){
    //         var val = Math.random()*10;
    //         data.push([i,j,val])
    //     }
    // }
    // if(tmp) data = tmp
    // option = {
    //     grid:{
    //         top:"5%",
    //         bottom:"40%"
    //     },
    //     polar: {
    //         center: ['50%', '45%'], // 调整中心位置
    //         radius: '75%' // 调整半径范围，使点和标签都能够显示出来
    //     },
    //     tooltip: {
    //         formatter: function (params) {
    //         return (
    //             params.value[2] +
    //             ' commits in ' +
    //             mouths[params.value[1]] +
    //             ' of ' +
    //             gas[params.value[0]]
    //         );
    //         }
    //     },
    //     angleAxis: {
    //         type: 'category',
    //         data: mouths,
    //         boundaryGap: 100,
    //         splitLine: {
    //             show: true
    //         },
    //         axisLine: {
    //             show: true
    //         },
    //         axisLabel:{
    //             textStyle:{
    //                 color:"#fff",
    //                 fontSize:10
    //             }
    //         }
    //     },
    //     radiusAxis: {
    //         type: 'category',
    //         data: gas,
    //         axisLine: {
    //             show: true
    //         },
    //         axisLabel: {
    //             rotate: 45,
    //             textStyle:{
    //                 color:"#fff",
    //                 fontSize:8
    //             }
    //         },
    //         z: 10
    //     },
    //     series: [
    //         {
    //             name: 'Punch Card',
    //             type: 'scatter',
    //             coordinateSystem: 'polar',
    //             symbolSize: function (val) {
    //                 return Math.log(val[2])*5
    //             },
    //             data: data,
    //             itemStyle: {
    //                 //normal: {
    //                 color: function (params) {
    //                     var colorList = [
    //                     '#FF5722', '#FF9800', '#FFEB3B', '#4CAF50', '#00BCD4', '#3F51B5'
    //                     ];
    //                     return colorList[params.value[0]];
    //                 }
    //                 //}
    //             },
    //             animationDelay: function (idx) {
    //                 return idx * 5;
    //             }
    //         }
    //     ]
    // };

    var pollutants = ['PM2.5', 'PM10', 'SO2','NO2', 'CO','O3'];
    var data = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10],
        [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10],
        [3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 10],
        [4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 10, 10],
        [5, 6, 7, 8, 9, 10, 10, 10, 10, 10, 10, 10],
        [6, 7, 8, 9, 10, 10, 10, 10, 10, 10, 10, 10]
    ];
    if(tmp) data = tmp;
    var option = {

        polar: {
            center: ['50%', '50%'], // 调整中心位置
            radius: '70%' // 调整半径范围，使点和标签都能够显示出来
        },
        grid:{
          top:"10%"
        },
        tooltip: {},
        legend: {
            data: pollutants,
            textStyle: {
                color: '#fff',
                fontSize:8
            },
        },
        textStyle: {
            color: '#fff',
            fontSize:8
        },
        angleAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            boundaryGap: false,
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#999',
                    type: 'dashed'
                }
            },
            axisLine: {
                show: false
            }
        },
        radiusAxis: {
            min: 0,
            axisLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        series: []
    };
    var colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF'];
    for (var i = 0; i < pollutants.length; i++) {
        for(var j=0;j<data[i].length;j++){
            if(i>=2 && i<= 4){
                data[i][j] = Math.log(data[i][j] *10).toFixed(2)
            }
            else{
                data[i][j] = Math.log(data[i][j]).toFixed(2)
            }
        }
        option.series.push({
            name: pollutants[i],
            type: 'bar',
            data: data[i],
            coordinateSystem: 'polar',
            stack: 'a',
            itemStyle: {
                normal: {
                    color: colors[i],
                    borderColor: '#000',
                    borderWidth: 1
                }
            }
        });
    }

    option && myChart.setOption(option);
}
function showG(tmp){
    var chartDom = document.querySelector('.G .chart');
    var myChart = echarts.init(chartDom);
    var data = [
        { value: 1048, name: 'PM2.5' },
        { value: 735, name: 'PM10' },
        { value: 580, name: 'SO2' },
        { value: 484, name: 'NO2' },
        { value: 300, name: 'CO' },
        { value: 300, name: 'O3' }
    ]
    if(tmp){
        for(var i=0;i<data.length;i++){
            data[i].value = Math.log(1+tmp[i]).toFixed(2)
        }
    }
    // 2. 指定配置和数据
    // option = {
    //   grid: {
    //     top: "10%",
    //     left: "30%",
    //     right:"20%",
    //     bottom: "10%"
    //   },
    //   xAxis: {
    //     show: false
    //   },
    //   yAxis: [
    //     {
    //       type: "category",
    //       inverse: true,
    //       data: ["PM10", "PM2.5", "SO2", "CO", "NO2", "O3"],
    //       axisLine: {
    //         show: false
    //       },
    //       axisTick: {
    //         show: false
    //       },
    //       axisLabel: {
    //         color: "#fff",
    //         fontSize: 12
    //       }
    //     },
    //     {
    //       data: data,
    //       inverse: true,
    //       axisLine: {
    //         show: false
    //       },
    //       axisTick: {
    //         show: false
    //       },
    //       axisLabel: {
    //         color: "#fff",
    //         fontSize: 12,
    //       }
    //     }
    //   ],
    //   series: [
    //     {
    //       name: "条",
    //       type: "bar",
    //       data: percentageArr,
    //       yAxisIndex: 0,
    //       itemStyle: {
    //         borderRadius : 15,
    //         color: function(params) {
    //           return color[params.dataIndex];
    //         }
    //       },
    //       barCategoryGap:100,
    //       barWidth: 12,
    //       label: {
    //         show: true,
    //         position: "right",
    //         formatter: "{c}%",
    //         fontSize: 10
    //       }
    //     },
    //     {
    //         name: "框",
    //         type: "bar",
    //         position: "right",
    //         barCategoryGap:100,
    //         barWidth: 15,
    //         yAxisIndex: 1,
    //         data: [100, 100, 100, 100, 100, 100],
    //         itemStyle: {
    //             color: "none",
    //             borderColor: "#00c1de",
    //             borderWidth: 3,
    //             borderRadius : 15
    //         }
    //     }
    //   ]
    // };
    var option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'right',
            textStyle:{
                color:"#fff"
            }

        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    option && myChart.setOption(option);
}
function showA(tmp){
    //初始化echarts实例
    var myChart = echarts.init(document.querySelector(".chart-a"));

    var geoCoordMap = {
        "海门":[121.15,31.89],
    };
    var data = [
        {name: "海门", value: 50},
    ]
    if(tmp){
        const location = tmp.name
        geoCoordMap[location] = [+tmp.lon,+tmp.lat]
        data = [{name:location,value: tmp.aqi}]
    }

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
            itemWidth: 10,
            itemHeight: 6,
            // 对于连续型数据，自动平均切分成几段。默认为5段。
            // 连续数据的范围需要 max 和 min 来指定。

            color: ['#d94e5d','#eac736','#50a3ba'],
            textStyle: {
                color: '#fff',
                fontSize:8
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
                    data.sort(function (a, b) {
                            return b.value - a.value;
                    }).slice(0, 6)
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
function showI(tmp){
    var chartDom = document.querySelector('.I .chart');
    var myChart = echarts.init(chartDom);
    var option

    var data = [
        {
            name: 'PM2.5',
            type: 'bar',
            barGap: 0,
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 110]
        },
        {
            name: 'PM10',
            type: 'bar',
            barGap: 0,
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 110]
        },
        {
            name: 'SO2',
            type: 'bar',
            barGap: 0,
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 110]
        },
        {
            name: 'NO2',
            type: 'bar',
            barGap: 0,
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 110]
        },
        {
            name: 'CO',
            type: 'bar',
            barGap: 0,
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 110]
        },
        {
            name: 'O3',
            type: 'bar',
            barGap: 0,
            emphasis: {
              focus: 'series'
            },
            data: [320, 432, 301, 334, 390, 110]
        }
    ]
    if(tmp) data = tmp
    for(var i=0;i<data.length;i++){
        var row = data[i].data;
        for(var j=0;j<row.length;j++){
            row[j] = row[j].toFixed(2)
        }
        data[i].data = row;
    }
    var legend = ["PM2.5","PM10","SO2","NO2","CO","O3"]
    option = {
        // tooltip:{
        //     trigger: 'axis'
        // },
        grid:{
            bottom:"10%"
        },
        legend: {
            textStyle: {
                color: '#fff'
            },
            data: legend
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
                textStyle: {
                  color: '#FFF'
                }
            },
            axisTick: { show: false },
            data: ['2013', '2014', '2015', '2016', '2017', "2018"]
          }
        ],
        yAxis: {
            type: 'value',
            axisLabel: {
                textStyle: {
                color: '#FFF'
                }
            }
        },
        series: data
      };
    //使用制定的配置项和数据显示图表
    myChart.setOption(option);

}

function calendar_ctrl(){
     // 获取按钮和日历元素
     var dateButton = $("#dateButton");
     var calendarContainer = $("#calendarContainer");
     var calendar = $("#calendar");
     // 点击按钮时显示日历
    
    $("#dateButton").on("click", function() {
       
        var initialDate = parseDate(dateButton.text());
        calendarContainer.show();
        calendar.calendar('moveTo', initialDate);
    });
    // 初始化日历控件
    calendar.calendar({
            onSelect: function(date) {
            var formattedDate = formatDate(date);
            dateButton.text(formattedDate);
            var time = formattedDate.replace(/-/g, "");
            var lat = $("#lat").text()
            var lon = $("#lon").text()
            // lat = 18.34
            // lon = 109.25
            //交互更新图表
            getGData(lat,lon,time)
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

//交互事件处理函数
function make_slider(){
    $('#slider').slider({
        min: 0,
        max: 1826,
        step: 1,
        value: 0,
        onSlideEnd: function(value) {
            var date = new Date(2013, 0, 1);
            date.setDate(date.getDate() + value);
            var dateString = date.getFullYear().toString() + (date.getMonth() 
                + 1).toString().padStart(2, '0') 
                + date.getDate().toString().padStart(2, '0');
            var dateFormat = date.getFullYear().toString()
                 + "-" +(date.getMonth() + 1).toString()
                 +  "-" +date.getDate().toString();
            $('#dateButton').text(dateFormat);
            //图表更新
            //G更新
            var lat = $("#lat").text()
            var lon = $("#lon").text()
            // lat = 18.34
            // lon = 109.25
            getGData(lat,lon,dateString)
            //D更新
            var gas = $(".D .gas").val();
            $(".yearSelect-gas").val(dateString.slice(0,4));
            getDData(lat,lon,dateString.slice(0,4),gas)
            //C更新
            getCData(lat,lon,dateString.slice(0,4))
        },
});
}
function interactive_D(){
    $(".D .gas").change(function() {
        // 获取选择的选项的值
        var gas = $(this).val();
        var time = $("#dateButton").text().slice(0,4);
        var lat = $("#lat").text()
        var lon = $("#lon").text()
        // lat = 18.34
        // lon = 109.25
        getDData(lat,lon,time,gas)
    });
    $(".D .yearSelect-gas").change(function() {
        // 获取选择的选项的值
        var year = $(this).val();
        var lat = $("#lat").text();
        var lon = $("#lon").text();
        var gasName = $(".gas").val();
        // lat = 18.34
        // lon = 109.25
        getDData(lat, lon, year,gasName)
    })
}
interactive_D()
function  interactive_C(){
    $(".C .yearSelect").change(function() {
        // 获取选择的选项的值
        var year = $(this).val();
        var lat = $("#lat").text()
        var lon = $("#lon").text()
        // lat = 18.34
        // lon = 109.25
        getCData(lat, lon, year)
    })
}
interactive_C()
function interactive_F2GD() {
    var myChart = echarts.init($('.F .chart').get(0));
    myChart.on('click', function(params) {
        if (params.componentType === 'series') {
            var xAxisValue = params.name;
            var time = xAxisValue.toString().replace(/-/g, "");
            var lat = $("#lat").text()
            var lon = $("#lon").text()
            // lat = 18.34
            // lon = 109.25
            //更新G控制台
            getGData(lat,lon,time)
            //更新D单轴散点图
            var gas = $(".D .gas").val();
            $('.yearSelect-gas').val(time.slice(0,4));
            getDData(lat,lon,time.slice(0,4),gas)

        }
    });
}
interactive_F2GD()

function interactive_I2GDC(){
    var chartDom = document.querySelector('.I .chart');
    var myChart = echarts.init(chartDom);
    myChart.on('click', function (params) {
        if (params.componentType === 'series') {
            // 获取横坐标的值和标签
            var xAxisValue = params.name;
            var seriesName = params.seriesName.toLowerCase();
            if(seriesName == "pm2.5") seriesName="pm25"
            var time = xAxisValue+"0101"
            //更新图表
            var lat = $("#lat").text()
            var lon = $("#lon").text()
            // lat = 18.34
            // lon = 109.25
            $('#dateButton').text(xAxisValue+"-1-1");
            getGData(lat,lon,time)

            $('.gas').val(seriesName);
            $('.yearSelect-gas').val(xAxisValue);
            getDData(lat,lon,xAxisValue,seriesName)
            $('.C .yearSelect').val(xAxisValue);
            getCData(lat,lon,xAxisValue)


        }
    });
}
interactive_I2GDC()
function interactive_G2D() {
    var chartDom = document.querySelector('.G .chart');
    var myChart = echarts.init(chartDom);

    myChart.on('click', function (params) {
        var gasName = params.name.toLowerCase();
        if(gasName == "pm2.5") gasName="pm25"
        var lat = $("#lat").text()
        var lon = $("#lon").text()
        var Date = $("#dateButton").text().slice(0,4);
        $('.gas').val(gasName);
        $(".yearSelect-gas").val(Date);
        getDData(lat,lon,Date,gasName)
    })
}
interactive_G2D()
function interactive_D2G() {
    var chartDom = document.querySelector('.D .chart');
    var myChart = echarts.init(chartDom);

    myChart.on('click', function (params) {
        var lat = $("#lat").text()
        var lon = $("#lon").text()
        var month = params.seriesIndex+1;
        var day = params.dataIndex+1;
    })
}
interactive_D2G()

var timer
function startAutoplay_F() {
        //自动播放设置
        timer = setInterval(function () {
        var chartDom = document.querySelector('.F .chart');
        var myChart = echarts.init(chartDom);
        var option = myChart.getOption()
        option.dataZoom[0].end += 0.1
        // 检查数据索引是否达到末尾
        if (option.dataZoom[0].end > 100) {
            //重置数据索引以重新开始
            option.dataZoom[0].start = 0;
            option.dataZoom[0].end = 1;
        }
        // 使用新的数据索引更新图表
        myChart.setOption(option);
    }, 2000);


}
startAutoplay_F()
function stopAutoplay_F(){
    // 暂停自动播放
    $("#pauseF").on('click', function () {
        var chartDom = document.querySelector('.F .chart');
        var myChart = echarts.init(chartDom);
        var option = myChart.getOption()
        if (option.pause == false) {
            console.log("想要通过点击暂定")
            clearInterval(timer);
            option.pause = true;
        } else {
            console.log("想要通过点击继续")
            startAutoplay_F();
            option.pause = false;
        }
        myChart.setOption(option)
    });
}
stopAutoplay_F()

