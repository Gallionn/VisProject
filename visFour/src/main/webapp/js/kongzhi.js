// 控制六项污染物的数据
demo7()
function demo7(tmp){
    if(tmp){
        var d1 = tmp[0];
        // console.log(d1)
        $('#shuzhi').text(d1.aqi)
        $('#f').text(d1.wind_speed.toFixed(2).toString()+'m/s')
        $('#w').text((d1.temp-273.15).toFixed(2).toString()+'℃')
        $('#s').text(d1.rh.toFixed(2).toString()+'%')
        $('#d').text((d1.psfc/1000).toFixed(2).toString()+'kpa')
    }
}

demo1()
function demo1(tmp){
    //实例化对象
    var myChart = echarts.init(document.querySelector(".s .s1"));
    
    var dataArr = Math.floor(Math.random() * 201);
    var colorSet = '#45CAED';
    var name = 'SO2';
    var max=200;
    if(tmp){
        var d1 = tmp[0]
        dataArr = d1.so2
        max = 360;
    }

    var color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
            offset: 0,
            color: '#FF0000',
        },
        {
            offset: 0.4,
            color: '#FFB800',
        },
        {
            offset: 1,
            color: '#00FF75',
        },
    ]);
    var option = {
        xAxis: {
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            axisLine: {
                show: false,
            },
        },
        yAxis: {
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            axisLine: {
                show: false,
            },
        },
        series: [
            // 刻度
            {
                type: 'gauge',
                radius: '130%',
                startAngle: 220,
                endAngle: -40,
                center: ['50%', '55%'],
                axisTick: {
                    show: false,
                    lineStyle: {
                        color: '#000',
                        width: 1,
                    },
                    length: 1,
                }, 
                //刻度样式
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#57DCFF',
                        width: 1,
                    },
                    length: -6,
                },
                //分隔线样式
                axisLabel: {
                    color: 'rgba(255,255,255,0)',
                    fontSize: 2,
                }, 
                //刻度节点文字颜色
                pointer: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                label: {
                    show: false,
                },
                //仪表盘内容
                detail: {
                    show: true,
                    offsetCenter: [0, '50%'],
                    color: '#ACCFFF',
                    formatter: function (params) {
                        return name;
                    },
                    textStyle: {
                        fontSize: 14,
                    },
                },
            },
            {
                name: '进度条',
                type: 'gauge',
                center: ['50%', '55%'],
                radius: '90%',
                splitNumber: 10,
                axisLine: {
                    lineStyle: {
                        color: [
                            [dataArr/max , color],
                            [1, 'rgba(107,157,215,.25)'],
                        ],
                        width: 6,
                    },
                },
                z: 4,
                axisLabel: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                itemStyle: {
                    color: colorSet,
                },
                detail: {
                    show: false,
                },
                label: {
                    show: false,
                },

                title: {
                    //标题
                    show: true,
                    offsetCenter: [0, 0], // x, y，单位px
                    textStyle: {
                        color: '#FFF',
                        fontSize:10, //表盘上的标题文字大小
                        fontWeight: 400,
                        fontFamily: 'Helvetica-BoldOblique-Regular, Helvetica-BoldOblique',
                    },
                },
                data: [
                    {
                        name: name,
                        value: dataArr,
                    },
                ],
                pointer: {
                    show: false,
                    length: '40%',
                    radius: '20%',
                    width: 4, //指针粗细
                },
            },
            // 内圆
            {
                type: 'pie',
                radius: ['0', '50%'],
                center: ['50%', '55%'],
                hoverAnimation: false,
                z: 3,
                data: [
                    {
                        value: dataArr,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#4B72E5',
                                    },
                                    {
                                        offset: 1,
                                        color: '#1C2755 ',
                                    },
                                ]),
                                opacity: 0.6,
                            },
                        },
                        label: {
                            show: false,
                        },
                    },
                ],
                labelLine: {
                    show: false,
                },
            },
        ],
    };

    // 把配置给实例对象
    myChart.setOption(option);

    // 监听图表的大小
    window.addEventListener("resize", function() {
        myChart.resize();
    });
}

demo2()
function demo2(tmp){
    //实例化对象
    var myChart = echarts.init(document.querySelector(".s .s2"));
    
    var dataArr = Math.floor(Math.random() * 201);
    var colorSet = '#45CAED';
    var name = 'PM10';
    var max=200;
    if(tmp){
        var d1 = tmp[0]
        dataArr = d1.pm10
        max = 1300;
    }

    var color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
            offset: 0,
            color: '#FF0000',
        },
        {
            offset: 0.4,
            color: '#FFB800',
        },
        {
            offset: 1,
            color: '#00FF75',
        },
    ]);
    var option = {
        xAxis: {
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            axisLine: {
                show: false,
            },
        },
        yAxis: {
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            axisLine: {
                show: false,
            },
        },
        series: [
            // 刻度
            {
                type: 'gauge',
                radius: '130%',
                startAngle: 220,
                endAngle: -40,
                center: ['50%', '55%'],
                axisTick: {
                    show: false,
                    lineStyle: {
                        color: '#000',
                        width: 1,
                    },
                    length: 1,
                }, 
                //刻度样式
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#57DCFF',
                        width: 1,
                    },
                    length: -6,
                },
                //分隔线样式
                axisLabel: {
                    color: 'rgba(255,255,255,0)',
                    fontSize: 2,
                }, 
                //刻度节点文字颜色
                pointer: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                label: {
                    show: false,
                },
                //仪表盘内容
                detail: {
                    show: true,
                    offsetCenter: [0, '50%'],
                    color: '#ACCFFF',
                    formatter: function (params) {
                        return name;
                    },
                    textStyle: {
                        fontSize: 14,
                    },
                },
            },
            {
                name: '进度条',
                type: 'gauge',
                center: ['50%', '55%'],
                radius: '90%',
                splitNumber: 10,
                axisLine: {
                    lineStyle: {
                        color: [
                            [dataArr/max , color],
                            [1, 'rgba(107,157,215,.25)'],
                        ],
                        width: 6,
                    },
                },
                z: 4,
                axisLabel: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                itemStyle: {
                    color: colorSet,
                },
                detail: {
                    show: false,
                },
                label: {
                    show: false,
                },

                title: {
                    //标题
                    show: true,
                    offsetCenter: [0, 0], // x, y，单位px
                    textStyle: {
                        color: '#FFF',
                        fontSize:10, //表盘上的标题文字大小
                        fontWeight: 400,
                        fontFamily: 'Helvetica-BoldOblique-Regular, Helvetica-BoldOblique',
                    },
                },
                data: [
                    {
                        name: name,
                        value: dataArr,
                    },
                ],
                pointer: {
                    show: false,
                    length: '40%',
                    radius: '20%',
                    width: 4, //指针粗细
                },
            },
            // 内圆
            {
                type: 'pie',
                radius: ['0', '50%'],
                center: ['50%', '55%'],
                hoverAnimation: false,
                z: 3,
                data: [
                    {
                        value: dataArr,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#4B72E5',
                                    },
                                    {
                                        offset: 1,
                                        color: '#1C2755 ',
                                    },
                                ]),
                                opacity: 0.6,
                            },
                        },
                        label: {
                            show: false,
                        },
                    },
                ],
                labelLine: {
                    show: false,
                },
            },
        ],
    };

    // 把配置给实例对象
    myChart.setOption(option);

    // 监听图表的大小
    window.addEventListener("resize", function() {
        myChart.resize();
    });
}

demo3()
function demo3(tmp){
    //实例化对象
    var myChart = echarts.init(document.querySelector(".s .s3"));
    
    var dataArr = Math.floor(Math.random() * 201);
    var colorSet = '#45CAED';
    var name = 'PM2.5';
    var max=200;

    if(tmp){
        var d1 = tmp[0]
        dataArr = d1.pm25
        max = 1300;
    }

    var color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
            offset: 0,
            color: '#FF0000',
        },
        {
            offset: 0.4,
            color: '#FFB800',
        },
        {
            offset: 1,
            color: '#00FF75',
        },
    ]);
    var option = {
        xAxis: {
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            axisLine: {
                show: false,
            },
        },
        yAxis: {
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            axisLine: {
                show: false,
            },
        },
        series: [
            // 刻度
            {
                type: 'gauge',
                radius: '130%',
                startAngle: 220,
                endAngle: -40,
                center: ['50%', '55%'],
                axisTick: {
                    show: false,
                    lineStyle: {
                        color: '#000',
                        width: 1,
                    },
                    length: 1,
                }, 
                //刻度样式
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#57DCFF',
                        width: 1,
                    },
                    length: -6,
                },
                //分隔线样式
                axisLabel: {
                    color: 'rgba(255,255,255,0)',
                    fontSize: 2,
                }, 
                //刻度节点文字颜色
                pointer: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                label: {
                    show: false,
                },
                //仪表盘内容
                detail: {
                    show: true,
                    offsetCenter: [0, '50%'],
                    color: '#ACCFFF',
                    formatter: function (params) {
                        return name;
                    },
                    textStyle: {
                        fontSize: 14,
                    },
                },
            },
            {
                name: '进度条',
                type: 'gauge',
                center: ['50%', '55%'],
                radius: '90%',
                splitNumber: 10,
                axisLine: {
                    lineStyle: {
                        color: [
                            [dataArr/max , color],
                            [1, 'rgba(107,157,215,.25)'],
                        ],
                        width: 6,
                    },
                },
                z: 4,
                axisLabel: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                itemStyle: {
                    color: colorSet,
                },
                detail: {
                    show: false,
                },
                label: {
                    show: false,
                },

                title: {
                    //标题
                    show: true,
                    offsetCenter: [0, 0], // x, y，单位px
                    textStyle: {
                        color: '#FFF',
                        fontSize:10, //表盘上的标题文字大小
                        fontWeight: 400,
                        fontFamily: 'Helvetica-BoldOblique-Regular, Helvetica-BoldOblique',
                    },
                },
                data: [
                    {
                        name: name,
                        value: dataArr,
                    },
                ],
                pointer: {
                    show: false,
                    length: '40%',
                    radius: '20%',
                    width: 4, //指针粗细
                },
            },
            // 内圆
            {
                type: 'pie',
                radius: ['0', '50%'],
                center: ['50%', '55%'],
                hoverAnimation: false,
                z: 3,
                data: [
                    {
                        value: dataArr,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#4B72E5',
                                    },
                                    {
                                        offset: 1,
                                        color: '#1C2755 ',
                                    },
                                ]),
                                opacity: 0.6,
                            },
                        },
                        label: {
                            show: false,
                        },
                    },
                ],
                labelLine: {
                    show: false,
                },
            },
        ],
    };

    // 把配置给实例对象
    myChart.setOption(option);

    // 监听图表的大小
    window.addEventListener("resize", function() {
        myChart.resize();
    });
}

demo4()
function demo4(tmp){
    //实例化对象
    var myChart = echarts.init(document.querySelector(".s .s4"));
    
    var dataArr = Math.floor(Math.random() * 201);
    var colorSet = '#45CAED';
    var name = 'CO';
    var max=200;

    if(tmp){
        var d1 = tmp[0]
        dataArr = d1.co
        max = 12;
    }
    var color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
            offset: 0,
            color: '#FF0000',
        },
        {
            offset: 0.4,
            color: '#FFB800',
        },
        {
            offset: 1,
            color: '#00FF75',
        },
    ]);
    var option = {
        xAxis: {
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            axisLine: {
                show: false,
            },
        },
        yAxis: {
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            axisLine: {
                show: false,
            },
        },
        series: [
            // 刻度
            {
                type: 'gauge',
                radius: '130%',
                startAngle: 220,
                endAngle: -40,
                center: ['50%', '55%'],
                axisTick: {
                    show: false,
                    lineStyle: {
                        color: '#000',
                        width: 1,
                    },
                    length: 1,
                }, 
                //刻度样式
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#57DCFF',
                        width: 1,
                    },
                    length: -6,
                },
                //分隔线样式
                axisLabel: {
                    color: 'rgba(255,255,255,0)',
                    fontSize: 2,
                }, 
                //刻度节点文字颜色
                pointer: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                label: {
                    show: false,
                },
                //仪表盘内容
                detail: {
                    show: true,
                    offsetCenter: [0, '50%'],
                    color: '#ACCFFF',
                    formatter: function (params) {
                        return name;
                    },
                    textStyle: {
                        fontSize: 14,
                    },
                },
            },
            {
                name: '进度条',
                type: 'gauge',
                center: ['50%', '55%'],
                radius: '90%',
                splitNumber: 10,
                axisLine: {
                    lineStyle: {
                        color: [
                            [dataArr/max , color],
                            [1, 'rgba(107,157,215,.25)'],
                        ],
                        width: 6,
                    },
                },
                z: 4,
                axisLabel: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                itemStyle: {
                    color: colorSet,
                },
                detail: {
                    show: false,
                },
                label: {
                    show: false,
                },

                title: {
                    //标题
                    show: true,
                    offsetCenter: [0, 0], // x, y，单位px
                    textStyle: {
                        color: '#FFF',
                        fontSize:10, //表盘上的标题文字大小
                        fontWeight: 400,
                        fontFamily: 'Helvetica-BoldOblique-Regular, Helvetica-BoldOblique',
                    },
                },
                data: [
                    {
                        name: name,
                        value: dataArr,
                    },
                ],
                pointer: {
                    show: false,
                    length: '40%',
                    radius: '20%',
                    width: 4, //指针粗细
                },
            },
            // 内圆
            {
                type: 'pie',
                radius: ['0', '50%'],
                center: ['50%', '55%'],
                hoverAnimation: false,
                z: 3,
                data: [
                    {
                        value: dataArr,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#4B72E5',
                                    },
                                    {
                                        offset: 1,
                                        color: '#1C2755 ',
                                    },
                                ]),
                                opacity: 0.6,
                            },
                        },
                        label: {
                            show: false,
                        },
                    },
                ],
                labelLine: {
                    show: false,
                },
            },
        ],
    };

    // 把配置给实例对象
    myChart.setOption(option);

    // 监听图表的大小
    window.addEventListener("resize", function() {
        myChart.resize();
    });
}

demo5()
function demo5(tmp){
    //实例化对象
    var myChart = echarts.init(document.querySelector(".s .s5"));
    
    var dataArr = Math.floor(Math.random() * 201);
    var colorSet = '#45CAED';
    var name = 'NO2';
    var max=200;

    if(tmp){
        var d1 = tmp[0]
        dataArr = d1.no2
        max = 180;
    }
    var color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
            offset: 0,
            color: '#FF0000',
        },
        {
            offset: 0.4,
            color: '#FFB800',
        },
        {
            offset: 1,
            color: '#00FF75',
        },
    ]);
    var option = {
        xAxis: {
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            axisLine: {
                show: false,
            },
        },
        yAxis: {
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            axisLine: {
                show: false,
            },
        },
        series: [
            // 刻度
            {
                type: 'gauge',
                radius: '130%',
                startAngle: 220,
                endAngle: -40,
                center: ['50%', '55%'],
                axisTick: {
                    show: false,
                    lineStyle: {
                        color: '#000',
                        width: 1,
                    },
                    length: 1,
                }, 
                //刻度样式
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#57DCFF',
                        width: 1,
                    },
                    length: -6,
                },
                //分隔线样式
                axisLabel: {
                    color: 'rgba(255,255,255,0)',
                    fontSize: 2,
                }, 
                //刻度节点文字颜色
                pointer: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                label: {
                    show: false,
                },
                //仪表盘内容
                detail: {
                    show: true,
                    offsetCenter: [0, '50%'],
                    color: '#ACCFFF',
                    formatter: function (params) {
                        return name;
                    },
                    textStyle: {
                        fontSize: 14,
                    },
                },
            },
            {
                name: '进度条',
                type: 'gauge',
                center: ['50%', '55%'],
                radius: '90%',
                splitNumber: 10,
                axisLine: {
                    lineStyle: {
                        color: [
                            [dataArr/max , color],
                            [1, 'rgba(107,157,215,.25)'],
                        ],
                        width: 6,
                    },
                },
                z: 4,
                axisLabel: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                itemStyle: {
                    color: colorSet,
                },
                detail: {
                    show: false,
                },
                label: {
                    show: false,
                },

                title: {
                    //标题
                    show: true,
                    offsetCenter: [0, 0], // x, y，单位px
                    textStyle: {
                        color: '#FFF',
                        fontSize:10, //表盘上的标题文字大小
                        fontWeight: 400,
                        fontFamily: 'Helvetica-BoldOblique-Regular, Helvetica-BoldOblique',
                    },
                },
                data: [
                    {
                        name: name,
                        value: dataArr,
                    },
                ],
                pointer: {
                    show: false,
                    length: '40%',
                    radius: '20%',
                    width: 4, //指针粗细
                },
            },
            // 内圆
            {
                type: 'pie',
                radius: ['0', '50%'],
                center: ['50%', '55%'],
                hoverAnimation: false,
                z: 3,
                data: [
                    {
                        value: dataArr,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#4B72E5',
                                    },
                                    {
                                        offset: 1,
                                        color: '#1C2755 ',
                                    },
                                ]),
                                opacity: 0.6,
                            },
                        },
                        label: {
                            show: false,
                        },
                    },
                ],
                labelLine: {
                    show: false,
                },
            },
        ],
    };

    // 把配置给实例对象
    myChart.setOption(option);

    // 监听图表的大小
    window.addEventListener("resize", function() {
        myChart.resize();
    });
}

demo6()
function demo6(tmp){
    //实例化对象
    var myChart = echarts.init(document.querySelector(".s .s6"));
    
    var dataArr = Math.floor(Math.random() * 201);
    var colorSet = '#45CAED';
    var name = 'O3';
    var max=200;

    if(tmp){
        var d1 = tmp[0]
        dataArr = d1.o3
        max = 260;
    }
    var color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
            offset: 0,
            color: '#FF0000',
        },
        {
            offset: 0.4,
            color: '#FFB800',
        },
        {
            offset: 1,
            color: '#00FF75',
        },
    ]);
    var option = {
        xAxis: {
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            axisLine: {
                show: false,
            },
        },
        yAxis: {
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            axisLine: {
                show: false,
            },
        },
        series: [
            // 刻度
            {
                type: 'gauge',
                radius: '130%',
                startAngle: 220,
                endAngle: -40,
                center: ['50%', '55%'],
                axisTick: {
                    show: false,
                    lineStyle: {
                        color: '#000',
                        width: 1,
                    },
                    length: 1,
                }, 
                //刻度样式
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#57DCFF',
                        width: 1,
                    },
                    length: -6,
                },
                //分隔线样式
                axisLabel: {
                    color: 'rgba(255,255,255,0)',
                    fontSize: 2,
                }, 
                //刻度节点文字颜色
                pointer: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                label: {
                    show: false,
                },
                //仪表盘内容
                detail: {
                    show: true,
                    offsetCenter: [0, '50%'],
                    color: '#ACCFFF',
                    formatter: function (params) {
                        return name;
                    },
                    textStyle: {
                        fontSize: 14,
                    },
                },
            },
            {
                name: '进度条',
                type: 'gauge',
                center: ['50%', '55%'],
                radius: '90%',
                splitNumber: 10,
                axisLine: {
                    lineStyle: {
                        color: [
                            [dataArr/max , color],
                            [1, 'rgba(107,157,215,.25)'],
                        ],
                        width: 6,
                    },
                },
                z: 4,
                axisLabel: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                itemStyle: {
                    color: colorSet,
                },
                detail: {
                    show: false,
                },
                label: {
                    show: false,
                },

                title: {
                    //标题
                    show: true,
                    offsetCenter: [0, 0], // x, y，单位px
                    textStyle: {
                        color: '#FFF',
                        fontSize:10, //表盘上的标题文字大小
                        fontWeight: 400,
                        fontFamily: 'Helvetica-BoldOblique-Regular, Helvetica-BoldOblique',
                    },
                },
                data: [
                    {
                        name: name,
                        value: dataArr,
                    },
                ],
                pointer: {
                    show: false,
                    length: '40%',
                    radius: '20%',
                    width: 4, //指针粗细
                },
            },
            // 内圆
            {
                type: 'pie',
                radius: ['0', '50%'],
                center: ['50%', '55%'],
                hoverAnimation: false,
                z: 3,
                data: [
                    {
                        value: dataArr,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#4B72E5',
                                    },
                                    {
                                        offset: 1,
                                        color: '#1C2755 ',
                                    },
                                ]),
                                opacity: 0.6,
                            },
                        },
                        label: {
                            show: false,
                        },
                    },
                ],
                labelLine: {
                    show: false,
                },
            },
        ],
    };

    // 把配置给实例对象
    myChart.setOption(option);

    // 监听图表的大小
    window.addEventListener("resize", function() {
        myChart.resize();
    });
}


