(function(){
    console.log("启动立即执行函数...")
    contime()
    divide()
    sunny()
    qipao()
    tiaoxing()
})()

// 左下方的时间轴变化
function contime(){
    var myChart = echarts.init(document.querySelector("#zuichart"));

    var startYear = 2013;
    var endYear = 2018;
    var result = [];

    for (var year = startYear; year <= endYear; year++) {
        for (var month = 1; month <= 12; month++) {
            var daysInMonth = new Date(year, month, 0).getDate();
            for (var day = 1; day <= daysInMonth; day++) {
                var date = year + "-" + padNumber(month) + "-" + padNumber(day);
                result.push(date);
            }
        }
    }

    function padNumber(num) {
        return num.toString().padStart(2, "0");
    }

    var option = {
        timeline: {
            data: result,
            axisType: 'category',
            autoPlay: true,
            playInterval: 8000,
            left: '3%',
            right: '3%',
            bottom: '3%',
            width: '90%',
            label: {
                formatter: function (value) {
                    var year = value.split("-")[0];
                    var month = value.split("-")[1];
                    return year + "-" + month;
                },
                textStyle: {
                    color: '#4c9bfd',
                    fontSize: 12
                }
            },
            symbolSize: 0,
            symbolOffset: [0, -10],
            lineStyle: {
                color: '#4c9bfd'
            },
            checkpointStyle: {
                borderColor: '#4c9bfd',
                borderWidth: 2
            },
            controlStyle: {
                showNextBtn: true,
                showPrevBtn: true,
                normal: {
                    color: '#4c9bfd',
                    borderColor: '#666'
                },
                emphasis: {
                    color: '#aaa',
                    borderColor: '#aaa'
                }
            }
        }
        };   

    // 3. 把配置给实例对象
    myChart.setOption(option);

    // 拖动时间轴，更新日期和全国污染等级图
    var previousYear = '2013'; // 用于存储之前的年份值
    var previousy_m = '201301';
    var previousy_m_d = '20130101';
    var l1 = '18.34';
    var l2 = '109.25';

    var mm = echarts.init($('.map .chart').get(0));
    mm.on('click',function(params){
        // 对具体时间与具体地点的六种污染物的图表进行更新
        var yy = $('#zuispan').text();
        var yyy = yy.split("-")[0]+yy.split("-")[1]+yy.split("-")[2];
        get_six(params.value[1].toFixed(2), params.value[0].toFixed(2), yyy);
        l1 = params.value[1].toFixed(2);
        l2 = params.value[0].toFixed(2);
    })

    var timer = null; // 定时器

    myChart.on('timelinechanged', function(params) {
        clearTimeout(timer); // 清除上一次的定时器

        timer = setTimeout(function() {
            var currentDate = result[params.currentIndex];
            var year = currentDate.split("-")[0];
            var month = currentDate.split("-")[1];
            var day = currentDate.split("-")[2];
            var labelText = year + "-" + month + "-" + day;
            var year_month = year + month;
            var y_m_d = year + month + day;

            if (year !== previousYear) {
                getDivide(-1, -1, year);
                previousYear = year; // 更新之前的年份值
            }
            if (year_month !== previousy_m) {
                // 更新晴雨图
                getsunny(-1, -1, year_month);
                previousy_m = year_month;
            }
            if (y_m_d !== previousy_m_d) {
                // 更新AQI排行图
                getwholecountry(-1, -1, y_m_d);
                // 更新六种污染图表
                get_six(l1, l2, y_m_d);
                previousy_m_d = y_m_d;
            }

            $('#zuispan').text(labelText);
            $("#selectedDate").text(labelText);
        }, 400); // 延迟加载数据的时间

    });


    // 初始化日期选择器
    $("#calendar").datepicker({
        defaultDate: new Date(2013, 1, 1),
        dateFormat: "yy-mm-dd",
        onSelect: function(date) {
            // 限制日期范围
            var selectedDate;
            var minDate = '2013-01-01';
            var maxDate = '2018-12-31';

            if (date < minDate) {
                selectedDate = minDate;
            } else if (date > maxDate) {
                selectedDate = maxDate;
            } else{
                selectedDate = date;
            }

            // 更新选中日期到<span>标签
            $("#selectedDate").text(selectedDate);
            $("#zuispan").text(selectedDate);

            // 根据选中日期更新时间轴进度
            var timelineIndex = result.indexOf(selectedDate);
            option.timeline.currentIndex = timelineIndex;

            var currentDate = selectedDate;
            var year = currentDate.split("-")[0];
            var month = currentDate.split("-")[1];
            var day = currentDate.split("-")[2];
            var year_month = year + month;
            var y_m_d = year + month + day;
            if (year !== previousYear) {
                getDivide(-1, -1, year);
                previousYear = year; // 更新之前的年份值
            }
            if(year_month!==previousy_m){
                getsunny(-1,-1,year_month);
                previousy_m = year_month;
            }
            if(y_m_d!==previousy_m_d){
                getwholecountry(-1,-1,y_m_d);
                var mm = echarts.init($('.map .chart').get(0));
                mm.on('click',function(params){
                    // 对具体时间与具体地点的六种污染物的图表进行更新
                    if(y_m_d!==previousy_m_d||l1!==params.value[1]||l2!==params.value[0])
                        get_six(params.value[1],params.value[0],y_m_d);
                    l1 = params.value[1];
                    l2 = params.value[0];
                })
                // 时间轴自动滑动更新六项污染物图
                get_six(l1,l2,y_m_d);
                previousy_m_d = y_m_d;
            }

            myChart.setOption(option);
        }
    });

    // 点击图标时显示/隐藏日期选择器
    $(".icon-rili").click(function() {
        $("#calendar").toggle();
    });

    // 监听图表的大小
    window.addEventListener("resize", function() {
        myChart.resize();
    });
}

// 全国污染等级图
function divide(tmp) {

    var myChart = echarts.init(document.querySelector(".Statistical .chart"));

    //定义数据
    var airdata = [
        {name: '优', value: [10, 20, 30, 40, 50, 60]},
        {name: '良', value: [20, 30, 40, 50, 60, 50]},
        {name: '轻度污染', value: [30, 40, 50, 60, 40, 40]},
        {name: '中度污染', value: [40, 50, 60, 30, 30, 30]},
        {name: '重度污染', value: [50, 60, 20, 20, 20, 20]},
        {name: '严重污染', value: [60, 10, 10, 10, 10, 10]}
    ];
    var zhibiao = ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染'];

    var monthdata = ['1月', '2月', '3月', '4月', '5月', '6月'];

    if(tmp){
        // 将每个日期的数据进行统计
        // monthdata = [];
        var result = tmp.reduce(function(acc, obj) {
            var date = obj.time;

            var AQI = obj.aqi;

            if (!acc[date]) {
                acc[date] = { data: [], level: {} }; // 创建日期的对象，包含data数组和level属性
            }

            acc[date].data.push(AQI); // 将AQI数值添加到对应日期的data数组中

            // 根据AQI数值的大小分为6个等级
            if (AQI >= 0 && AQI <= 50) {
                acc[date].level['优'] = (acc[date].level['优'] || 0) + 1;
            } else if (AQI >= 51 && AQI <= 100) {
                acc[date].level['良'] = (acc[date].level['良'] || 0) + 1;
            } else if (AQI >= 101 && AQI <= 150) {
                acc[date].level['轻度污染'] = (acc[date].level['轻度污染'] || 0) + 1;
            } else if (AQI >= 151 && AQI <= 200) {
                acc[date].level['中度污染'] = (acc[date].level['中度污染'] || 0) + 1;
            } else if (AQI >= 201 && AQI <= 300) {
                acc[date].level['重度污染'] = (acc[date].level['重度污染'] || 0) + 1;
            } else {
                acc[date].level['严重污染'] = (acc[date].level['严重污染'] || 0) + 1;
            }
            return acc;
        }, {});
        // 输出结果
        // console.log(Object.keys(result));
        var levelData = Object.values(result).map(function(item) {
            return item.level;
        });
        // var rangeArray = Array.from({ length: levelData.length }, (_, index) => index + 1);

        var tempairdata = [
            {name: '优', value: []},
            {name: '良', value: []},
            {name: '轻度污染', value: []},
            {name: '中度污染', value: []},
            {name: '重度污染', value: []},
            {name: '严重污染', value: []}
        ];
        for (var i = 0; i < tempairdata.length; i++) {
            var name = tempairdata[i].name;
            var value = tempairdata[i].value;
            if (name) {
                for (var j = 0; j < levelData.length; j++) {
                    value[j] = levelData[j][name];
                }
            }
        }
        airdata = tempairdata;
        monthdata = Object.keys(result);
        // console.log(typeof monthdata[0]);
    }

    //定义颜色
    var colors = ['#00E400', '#FFFF00', '#FF7E00', '#FF0000', '#99004C', '#7E0023'];

    //定义图表配置项
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: zhibiao,
            top: 'top',
            textStyle: {
                color: '#4c9bfd'
            }
        },
        grid: {
            top: '15%',
            left: '3%',
            right: '4%',
            bottom: '0',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: monthdata,
            // axisLabel: {
            //     color: '#4c9bfd',
            //     fontSize: '8'
            // },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#4c9bfd'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#4c9bfd',
                fontSize: '10'
            },
            axisTick: {
                color: '#4c9bfd'
            },
            axisLine: {
                lineStyle: {
                    color: '#4c9bfd'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#4c9bfd'
                }
            }
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100
            }
        ],
        series: airdata.map((item, index) => {
            return {
                name: item.name,
                type: 'bar',
                stack: '总量',
                data: item.value,
                itemStyle: {
                    color: colors[index]
                }
            };
        })
    };

    // 把配置给实例对象
    myChart.setOption(option);

    var previousy_m = '201301';
    var previousy_m_d = '20130101';
    var l1 = '18.34';
    var l2 = '109.25';

    var mm = echarts.init($('.map .chart').get(0));
    mm.on('click',function(params){
        // var yy = $('#zuispan').text();
        // var yyy = yy.split("-")[0]+yy.split("-")[1]+yy.split("-")[2];
        // get_six(params.value[1].toFixed(2), params.value[0].toFixed(2), yyy);
        l1 = params.value[1].toFixed(2);
        l2 = params.value[0].toFixed(2);
    })

    myChart.off('click');
    myChart.on('click', function(params) {
        if (params.componentType !== 'series') {
            return;
        }
        var dataIndex = params.dataIndex;
        // console.log(dataIndex)
        var clickedDate = option.xAxis.data[dataIndex];
        // console.log(clickedDate);
        var year = clickedDate.slice(0,4);
        var month = clickedDate.slice(4,6);
        var day = clickedDate.slice(6,8);
        var labelText = year + "-" + month + "-" + day;
        var year_month = year + month;
        var y_m_d = year + month + day;

        if (year_month !== previousy_m) {
            // 更新晴雨图
            getsunny(-1, -1, year_month);
            previousy_m = year_month;
        }
        if (y_m_d !== previousy_m_d) {
            // 更新AQI排行图
            getwholecountry(-1, -1, y_m_d);
            // 更新六种污染图表
            get_six(l1, l2, y_m_d);
            previousy_m_d = y_m_d;
        }
        $('#zuispan').text(labelText);
        $("#selectedDate").text(labelText);
    });
    // 监听图表的大小
    window.addEventListener('resize', function() {
        myChart.resize();
    });

}

// 得到某一天各省份的均值AQI
function gettx(tmp){
    var t =  tmp.map(function(lo) {
        return {
            name: lo.location,
            value: lo.aqi
        };
    });
    function calculateAverageAQI(arr) {
        var provinceData = {};

        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            var location = obj.name;
            var aqi = obj.value;

            var province = getProvinceFromLocation(location);

            if (!provinceData.hasOwnProperty(province)) {
                provinceData[province] = {
                    sum: 0,
                    count: 0
                };
            }
            provinceData[province].sum += aqi;
            provinceData[province].count++;
        }

        var averages = {};
        for (var province in provinceData) {
            var sum = provinceData[province].sum;
            var count = provinceData[province].count;
            var average = sum / count;
            averages[province] = average.toFixed(3);
        }
        return averages;
    }

    function getProvinceFromLocation(location) {
        if(location.includes("黑龙江")){
            return location.slice(0,3)
        }
        else{
            return location.slice(0,2);
        }
    }
    return calculateAverageAQI(t);
}

// AQI条形图
function tiaoxing(tmp){

    var myChart = echarts.init(document.querySelector(".bar2 .chart"));

    var cityname = ["北京", "山东", "上海", "四川", "江西", "湖南", "广东", "广西", "甘肃", "福建"];
    var AQIdata = [60, 90, 86, 80, 75, 70, 60, 50, 40, 20];

    var maxAQI = Math.max(...AQIdata);
    if(tmp){
        // console.log(tmp)
        var tt = gettx(tmp)

        var provinces = Object.keys(tt);
        var averageValues = Object.values(tt);
        // console.log(provinces)
        // console.log(averageValues)
        cityname = provinces;
        AQIdata = averageValues;
        maxAQI = Math.floor(Math.max(...AQIdata));
    }
    var option = {
        grid: {
            left: "3%",
            right: "7%",
            bottom: "2%",
            top: "5%",
            containLabel: true,
        },
        tooltip: {
            show: true,
            formatter: "{b}<br/>AQI指数:{c}",
            textStyle: {
                fontWeight: "bold",
                fontSize: 16,
                color:"#4c9bfd",
            },
        },
        yAxis: [{
            type: "category",
            inverse: true,
            axisLabel: {
                show: true,
                color: "#4c9bfd",
                fontSize: 14,
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: "#707070",
                },
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#4c9bfd",
                    width: 2,
                },
            },
            axisTick: {
                show: false,
            },
            data: cityname
        },
        ],
        xAxis: [{
            type: "value",
            axisTick: {
                show: false,
            },
            max: maxAQI,
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#4c9bfd",
                    width: 2,
                },
            },
            splitLine: {
                show: false,
            },
            nameTextStyle: {
                color: 'red',
            },
            // nameLocation: "end",
            name: "",
            axisLabel: {
                inside: false,
                textStyle: {
                    color: "#4c9bfd",
                    fontSize: 12,
                },
                interval: 0,
                rotate: 25,
                formatter: '{value}'
            },
        },
        ],
        dataZoom: [
            {
                type: 'inside',
                yAxisIndex: 0,
                start: 0,
                end: 100
            }
        ],
        series: [{
            name: "assist",
            type: "bar",
            stack: "1",
            itemStyle: {
                normal: {
                    barBorderColor: "rgba(0,0,0,0)",
                    color: "rgba(0,0,0,0)",
                },
                emphasis: {
                    barBorderColor: "rgba(0,0,0,0)",
                    color: "rgba(0,0,0,0)",
                },
            },
            tooltip: {
                trigger: "none",
            },
            data: [],
        }, //设置两个柱状图进行重叠，第一层柱子设置透明度,由此来实现柱子与坐标轴之间的距离  stack:''设置重叠效果
            {
                type: "bar",
                stack: "1",
                barWidth: 6,
                barBorderRadius: 30,
                itemStyle: {
                    normal: {
                        barBorderRadius: 20,
                        color: function (params) {
                            // console.log('测试',_that.checkName)
                            // if (_that.platName == params.name) {
                            //    return 'yellow';
                            // } else {
                            return {
                                type: "linear",
                                x: 1,
                                y: 0,
                                x2: 0,
                                y2: 0,
                                colorStops: [{
                                    offset: 0,
                                    color: "#80BDF6", // 0% 处的颜色
                                },
                                    {
                                        offset: 0.9,
                                        color: "#188DF0", // 100% 处的颜色
                                    },
                                ],

                                // }
                            }
                        },
                    },
                },
                // zlevel: 2,
                data: AQIdata
            },
        ],
    }

    // 3. 把配置给实例对象
    myChart.setOption(option);

    $("#desc").click(function() {

        var data = cityname.map(function(name, index) {
            return {
                name: name,
                value: AQIdata[index]
            };
        });

        data.sort(function(a, b) {
            return b.value - a.value;
        });

        option.yAxis = [{
            data: data.map(function(item) {
                return {
                    value: item.name
                };
            })
        }];

        option.series[1].data = data.map(function(item) {
            return item.value;
        });

        myChart.setOption(option);

    });

    $("#asc").click(function() {

        var data = cityname.map(function(name, index) {
            return {
                name: name,
                value: AQIdata[index]
            };
        });

        data.sort(function(a, b) {
            return a.value - b.value;
        });

        option.yAxis = [{
            data: data.map(function(item) {
                return {
                    value: item.name
                };
            })
        }];

        option.series[1].data = data.map(function(item) {
            return item.value;
        });

        myChart.setOption(option);

    });

    $("#reset").click(function() {
        // 恢复排序之前的数据和图表配置
        var data = cityname.map(function(name, index) {
            return {
                name: name,
                value: AQIdata[index]
            };
        });

        option.yAxis = [{
            data: data.map(function(item) {
                return {
                    value: item.name
                };
            })
        }];

        option.series[1].data = data.map(function(item) {
            return item.value;
        });

        myChart.setOption(option);
    });

    // 监听图表的大小
    window.addEventListener("resize", function() {
        myChart.resize();
    });
}

// 转换晴雨图的数据
function getting(tmp){
    // console.log(tmp)
    var result = tmp.reduce(function(acc, obj) {
        var date = obj.time;
        var AQI = obj.aqi;

        if (!acc[date]) {
            acc[date] = { data: [], level: {} }; // 创建日期的对象，包含data数组和level属性
        }

        acc[date].data.push(AQI); // 将AQI数值添加到对应日期的data数组中

        // 根据AQI数值的大小分为6个等级
        if (AQI >= 0 && AQI <= 30) {
            acc[date].level['优'] = (acc[date].level['优'] || 0) + 1;
        } else if (AQI >= 31 && AQI <= 45) {
            acc[date].level['良'] = (acc[date].level['良'] || 0) + 1;
        } else if (AQI >= 46 && AQI <= 60) {
            acc[date].level['轻度污染'] = (acc[date].level['轻度污染'] || 0) + 1;
        } else if (AQI >= 61 && AQI <= 80) {
            acc[date].level['中度污染'] = (acc[date].level['中度污染'] || 0) + 1;
        } else if (AQI >= 81 && AQI <= 100) {
            acc[date].level['重度污染'] = (acc[date].level['重度污染'] || 0) + 1;
        } else {
            acc[date].level['严重污染'] = (acc[date].level['严重污染'] || 0) + 1;
        }
        return acc;
    }, {});
    // 输出结果
    // console.log(result)
    var levelData = Object.values(result).map(function(item) {
        return item.level;
    });
    // console.log(levelData)
    // 转换函数
    function convertData(data) {
        var result = [];
        for (var i = 0; i < data.length; i++) {
            var tpresult = [];
            var item = data[i];
            // var convertedItem = {};
            Object.keys(item).forEach(function (key) {
                tpresult.push({ name: key, value: item[key] });
            });
            result.push(tpresult);
        }
        return result;
    }
    var convertedData = convertData(levelData);
    // console.log(convertedData)
    return convertedData;
}

// 晴雨图
function sunny(tmp) {
    // 实例化对象
    var myChart = echarts.init(document.querySelector(".scatter .chart"));
    const cellSize = [40, 52];
    const pieRadius = 15;

    // 根据时间轴上面的年月来切换数据
    var tt = $('#zuispan').text();
    var ttyear = tt.slice(0,4);
    var ttmonth = tt.slice(5,7);

    var nextMonth = parseInt(ttmonth) + 1;
    var nextYear = parseInt(ttyear);

    if (nextMonth > 12) {
        nextMonth = '01';
        nextYear = (parseInt(ttyear) + 1).toString();
    } else if (nextMonth < 10) {
        nextMonth = '0' + nextMonth.toString();
    }
    var starttime = tt.slice(0,8)+'01';
    var endtime = nextYear + '-' + nextMonth + '-01';

    var rangetime = [ttyear + '-' + ttmonth];

    var option;

    var startDate = new Date(starttime);
    var endDate = new Date(endtime);
    var numDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1; // 计算天数

    var piedata1 = Array.from({ length: numDays }, function () {
        return [
            { name: '优', value: Math.round(Math.random() * 24) },
            { name: '良', value: Math.round(Math.random() * 24) },
            { name: '轻度污染', value: Math.round(Math.random() * 24) },
            { name: '中度污染', value: Math.round(Math.random() * 24) },
            { name: '重度污染', value: Math.round(Math.random() * 24) },
            { name: '严重污染', value: Math.round(Math.random() * 24) }
        ];
    });

    if(tmp){
        piedata1 = getting(tmp);
    }
    // 得到虚拟的散点数据
    function getVirtulData() {
        let date = +echarts.number.parseDate(starttime);
        let end = +echarts.number.parseDate(endtime);
        let dayTime = 3600 * 24 * 1000;
        let data = [];
        for (let time = date; time < end; time += dayTime) {
            data.push([
                echarts.format.formatTime('yyyy-MM-dd', time),
                Math.floor(Math.random() * 500)
            ]);
        }
        return data;
    }

    function getPieSeries1(scatterData, chart) {
        // console.log(chart)
        return scatterData.map(function (item, index) {
            var center = chart.convertToPixel('calendar', item);
            // console.log(item);
            return {
                id: index + 'pie',
                type: 'pie',
                center: center,
                label: {
                    show: false
                },
                radius: pieRadius,
                data: piedata1[index]
            };
        });
    }


    var scatterData = getVirtulData();
    option = {
        tooltip: {},
        legend: {
            data: ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染'],
            bottom: 0,
            textStyle:{
                color : '#4c9bfd'
            }
        },
        color: ['#FFFF00', '#FF7E00', '#00E400',
            '#99004C', '#7E0023','#FF0000'
        ],
        calendar: {
            top: '14',
            left: '30',
            right:'5',
            orient: 'vertical',
            cellSize: cellSize,
            yearLabel: {
                show: false,
                fontSize: 30
            },
            dayLabel: {
                margin: 0,
                firstDay: 1,
                nameMap: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                textStyle:{
                    color : '#4c9bfd'
                }
            },
            monthLabel: {
                show: true,
                nameMap: 'cn',
                textStyle:{
                    color : '#4c9bfd'
                }
            },
            range: rangetime
        },
        series: [
            {
                id: 'label',
                type: 'scatter',
                coordinateSystem: 'calendar',
                symbolSize: 0,
                label: {
                    show: true,
                    formatter: function (params) {
                        return echarts.format.formatTime('dd', params.value[0]);
                    },
                    offset: [-cellSize[0] / 2 + 6, -cellSize[1] / 2 + 6],
                    fontSize: 6
                },
                data: scatterData
            }
        ]
    };
    myChart.setOption(option);

    option.series = getPieSeries1(scatterData, myChart);
    setTimeout(function() {
        myChart.setOption(option);
    }, 425);
    // 监听图表的大小
    window.addEventListener("resize", function() {
        myChart.resize();
    });

}

// 转换气泡图的数据
function gettingone(tmp){
    // console.log(tmp)
    function convertData(data) {
        var result = [];
        for (var i = 0; i < data.length; i++) {
            var tpresult = [];
            var item = data[i];
            Object.keys(item).forEach(function (key) {
                tpresult.push({ name: key, value: item[key] });
            });
            result.push(tpresult);
        }
        return result;
    }
    var qidata = convertData(tmp);
    var array = qidata;
    // console.log(array)
    var pollutants = ['SO2', 'O3', 'NO2', 'CO', 'PM10', 'PM25', 'AQI'];
    var ttt = {}
    for (var i = 0; i < array.length; i++) {
        var tt = []
        var subArray = array[i];
        var temptime = '';
        for (var j = 0; j < subArray.length; j++) {
            var element = subArray[j];
            if(element.name==='pm25'){
                element.name = element.name.slice(0,3)+'.'+element.name.slice(3,4);
                tt.push({name:element.name.toUpperCase(),value:element.value});
            }
            else if(element.name==='time'){
                temptime = element.value
                if(!ttt[temptime]) {
                    ttt[temptime] = []
                }
            }
            else if(pollutants.includes(element.name.toUpperCase())){
                tt.push({name:element.name.toUpperCase(),value:element.value});
            }
        }
        ttt[temptime] = tt
    }
    return ttt
}

//气泡图
function qipao(tmp){
    var myChart = echarts.init(document.querySelector(".scatter2 .chart"));
    var minPieRadius = 15;

    var starttime = '2013-01-01';
    var endtime = '2019-01-01';

    // 模拟数据
    function generatePiedata(startYear, endYear) {
        var piedata = {};

        for (var year = startYear; year < endYear; year++) {
            var data = [];

            data.push({name: 'SO2', value: Math.round(Math.random() * 24)});
            data.push({name: 'PM2.5', value: Math.round(Math.random() * 24)});
            data.push({name: 'PM10', value: Math.round(Math.random() * 24)});
            data.push({name: 'CO', value: Math.round(Math.random() * 24)});
            data.push({name: 'NO2', value: Math.round(Math.random() * 24)});
            data.push({name: 'O3', value: Math.round(Math.random() * 24)});
            data.push({name: 'AQI', value: Math.round(Math.random() * 24)});

            piedata[year.toString()] = data;
        }
        return piedata;
    }
    // 使用函数生成2013年到2019年的数据
    var piedata = generatePiedata(2013, 2019);

    // 更新数据
    if(tmp){
        // console.log("#########",tmp)
        var ttt = gettingone(tmp)
        // console.log(ttt)

        var pollutants = ['SO2', 'PM2.5', 'PM10', 'CO', 'NO2', 'O3', 'AQI'];
        var yearlyAverages = {};
        // 遍历ttt对象的每个时间键
        for (var time in ttt) {
            var dataArray = ttt[time];

            // 提取时间的年份
            var year = time.slice(0, 4);

            // 初始化年份对应的累加对象和计数器
            if (!yearlyAverages[year]) {
                yearlyAverages[year] = {};
                for (var i = 0; i < pollutants.length; i++) {
                    yearlyAverages[year][pollutants[i]] = {
                        sum: 0,
                        count: 0
                    };
                }
            }
            // 遍历每个污染物的数组
            // 此时的dataarray为一个数组，里面的每一个元素为一个对象
            for (var i = 0; i < dataArray.length; i++) {
                // 为一个对象
                var pollutantData = dataArray[i];

                // 更新累加值和计数器
                yearlyAverages[year][pollutantData.name].sum += pollutantData.value;
                yearlyAverages[year][pollutantData.name].count++;
            }
        }
        // 计算各年各种污染物的均值
        var yearlyAveragesResult = {};

        for (var year in yearlyAverages) {
            yearlyAveragesResult[year] = [];
            for (var i = 0; i < pollutants.length; i++) {
                var pollutant = pollutants[i];
                var sum = yearlyAverages[year][pollutant].sum;
                var count = yearlyAverages[year][pollutant].count;

                // 计算均值
                yearlyAveragesResult[year].push({name: pollutant, value: (sum / count).toFixed(2)});
                }
            }
        // console.log(yearlyAveragesResult);
        piedata = yearlyAveragesResult;
    }

    // 根据y轴数值得到饼图半径大小
    function getPieRadius(value) {
        var pieRadius = Math.floor(value) > minPieRadius ? Math.floor(value)/4 : minPieRadius;
        // console.log(pieRadius)
        return pieRadius;
    }
    // 得到虚拟数据
    function getVirtulData() {
        var date = +echarts.number.parseDate(starttime);
        var end = +echarts.number.parseDate(endtime);
        var dayTime = 3600 * 24 * 365 * 1000;
        var data = [];
        for (var time = date; time < end; time += dayTime) {
            var t1 = echarts.format.formatTime('yyyy', time)
            if (echarts.format.formatTime('yyyy', time) === '2016') {
                dayTime = 3600 * 24 * 366 * 1000;
            }
            data.push([
                echarts.format.formatTime('yyyy', time),
                Math.floor(piedata[t1].find(function(item){
                    return item.name === 'AQI';
                }).value)
            ]);
        }
        return data;
    }
    var lineData = getVirtulData();
    // 根据虚拟数据得到饼图数据
    function getPieSeries(lineData, chart) {
        return echarts.util.map(lineData, function (item, index) {
            var li = ['2013','2014','2015','2016','2017','2018'];
            var center = chart.convertToPixel({seriesIndex: 0}, item);
            // console.log(item)
            return {
                id: index + 'pie',
                type: 'pie',
                center: center,
                label: {
                    show: false
                },
                legend: {
                    data: ['SO2', 'PM2.5', 'PM10', 'CO', 'NO2', 'O3','AQI'],
                    top: 'top',
                    textStyle:{
                        color : '#4c9bfd'
                    }
                },
                zlevel: 1,
                radius: getPieRadius(piedata[li[index]].find(function(item){
                    return item.name === 'AQI';
                }).value),
                data: piedata[li[index]]
            };
        });
    }


    var option = {
        tooltip : {},
        legend: {
            data: ['SO2', 'PM2.5', 'PM10', 'CO','NO2','O3','AQI'],
            bottom: 0,
            textStyle:{
                color : '#4c9bfd'
            }
        },
        grid: {
            left: '10%',
            right: '5%',
            top:'8%',
            bottom:'20%'
        },
        xAxis: {
            type: 'category',
            name: '年',
            nameGap: 1,
            axisLabel: {
                color: '#4c9bfd',
                textStyle: {
                    fontSize: '13'
                },
            },
            axisTick: {
                show: true,
            },
            axisLine: {
                lineStyle: {
                    color: '#4c9bfd',
                }
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            name: 'AQI指数',
            nameGap: 10,
            scale: true,
            nameTextStyle: {
                fontSize: 13,
            },
            axisLabel: {
                color: '#4c9bfd',
                textStyle: {
                    fontSize: '13'
                },
            },
            axisTick: {
                show: true,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#4c9bfd',
                }
            },
            splitLine: {
                show: false,
            }
        },
        series: [{
            type: 'line',
            symbolSize: 0,
            lineStyle: {
                color: '#4c9bfd',
                width: 1.5,
            },
            data: lineData
        }]
    };

    myChart.setOption(option);

    option.series = getPieSeries(lineData, myChart)
    setTimeout(function() {
        myChart.setOption(option);
    }, 150);

    // 监听图表的大小
    window.addEventListener("resize", function() {
        myChart.resize();
    });

}




