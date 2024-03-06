//辅助函数
function getData(lat=-1,lon=-1,Date){
    return new Promise((resolve, reject) => {
        if (lat == -1 && lon == -1) {
            $.get(
                "/home/byDate/",
                {Date: Date},
                function (data) {
                    // console.log("#######################",data);
                    resolve(data);
                })
        }else {
            $.get(
                "/home/byDateAndLatAndLon/",
                {lat: lat, lon: lon, Date: Date},
                function (data) {
                    resolve(data);
                })
        }
    })
}

// // 获取地名
// function getLocByName(location){
//     return new Promise((resolve, reject) => {
//         $.get(
//             "/home/getLatAndlon/",
//             {location: location},
//             function (data) {
//                 // console.log("#################333",data)
//                 resolve(data);
//             })
//     })
// }
//
// function get_lname(location){
//     getLocByName(location).then((data)=>{
//         // $('#location').text(data)
//         xianshi_ll(data)
//     })
// }

// 获取具体时间和具体地点的数据
function get_six(lat,lon,Date){
    getData(lat,lon,Date).then((data)=>{
        data.sort(function(a,b){
            return +a.time-+b.time;
        });
        demo1(data);
        demo2(data);
        demo3(data);
        demo4(data);
        demo5(data);
        demo6(data);
        demo7(data);
    })
}

// 渲染全国污染等级图
function getDivide(lat,lon,Date) {
    getData(lat,lon,Date).then((data)=>{
        data.sort(function(a,b){
            return +a.time-+b.time;
        });
        divide(data);
    })
}

// 渲染晴雨图，获取某年某月全国的数据
function getsunny(lat,lon,Date) {
    getData(lat,lon,Date).then((data)=>{
        data.sort(function(a,b){
            return +a.time-+b.time;
        });
        sunny(data);
    })
}

// 渲染气泡图，获取某地五年的数据
function getqipao(lat,lon,Date) {
    getData(lat,lon,Date).then((data)=>{
        data.sort(function(a,b){
            return +a.time-+b.time;
        });
        qipao(data);
    })
}

// 渲染全国热力图，根据经纬度获取该地的名称
function getloaction_Data(lat=-1,lon=-1){
    return new Promise((resolve, reject) => {
        if(lat!==lon) {
            $.get(
                "/home/getLocName/",
                {lat: lat, lon: lon},
                function (dataWithLoc) {
                    resolve(dataWithLoc);
                })
        }
    })
}

// 获取某一天全国的数据
function getwholecountry(lat, lon, Date) {
    getData(lat, lon, Date).then((data) => {
        data.sort(function(a, b) {
            return +a.time - +b.time;
        });

        // 使用map函数对data中的每个元素调用getloaction_Data函数
        var promises = data.map((element) => {
            return getloaction_Data(element.lat, element.lon);
        });

        // 使用Promise.all等待所有getloaction_Data函数调用完成
        Promise.all(promises).then((results) => {
            // 处理每个getloaction_Data函数的返回结果
            results.forEach((result, index) => {
                // 将返回结果存储到data对应的元素中
                data[index].location = result[0].location;
            });
            // 把数据应用于全国热力图
            sixfunc(data);
            // 把数据应用于AQI排行条形图
            tiaoxing(data);
        });
    });
}

//获取图表数据函数
function getGData(lat,lon,Date){
    getData(lat,lon,Date).then((data)=>{
        var data = data[0]
        $("#aqi .value").text("AQI  "+data.aqi.toString());
        $("#temp .value").text(data.temp.toString() + " K");
        $("#rh .value").text(data.rh.toString() + " %");
        $("#psfc .value").text(data.psfc.toString() + " Pa");
        $.get(
            "/home/getLocName/",
            {lat: lat,lon:lon},
            function (dataWithLoc) {
                console.log(dataWithLoc)
                $(".name").text(dataWithLoc[0].location);
            })
        var time =  data.time.slice(0, 4) + "-" + data.time.slice(4, 6) + "-" + data.time.slice(6, 8);
        $("#dateButton").text(time);
        var gas = [+data.pm25,+data.pm10,+data.so2,+data.no2,+data.co,+data.o3]
        showG(gas)
        var tmp = {lat:lat,lon:lon,name:$(".name").text(),aqi:data.aqi}
        showA(tmp)
        console.log("G控制台更新完毕")
    })
}
function getDData(lat,lon,Date,gas){
    getData(lat,lon,Date).then((data)=>{
        data.sort(function(a,b){
            return +a.time-+b.time
        })
        var tmp = []
        for(var i=0;i<data.length;i++){
            var mouth = data[i].time.substring(4,6)
            var day = data[i].time.substring(6,9)
            tmp.push([+mouth-1,+day-1,+data[i][gas]])
        }
        console.log("D更新：",gas)
        console.log("D更新：",tmp)
        showD(tmp)
        console.log("D单轴散点图更新完毕")
    })
}
function getCData(lat,lon,Date){
    getData(lat,lon,Date).then((data)=>{

        data.sort(function(a,b){
            return +a.time-+b.time
        })
        var tmp = []
        var gas = ["pm25","pm10","so2","no2","co","o3"];
        for(var i=0;i<data.length;i++){
            var mouth = data[i].time.substring(4,6)
            tmp.push([+mouth-1,+data[i].pm25,+data[i].pm10,
                +data[i].so2,+data[i].no2,
                +data[i].co,+data[i].o3])
        }
        var result = calculateGroupedAverages(tmp)
        tmp = []
        //极坐标散点图所需数据格式
        // for(var i=0;i<gas.length;i++){
        //     for(var j=0;j<12;j++){
        //         tmp.push([i,j,result[j][i]])
        //     }
        // }
        //极坐标堆叠柱状图所需数据格式
        for(var i=0;i<gas.length;i++){
            var tmp1 = []
            for(var j=0;j<12;j++){
                tmp1.push(result[j][i])
            }
            tmp.push(tmp1)
        }
        showC(tmp)
        console.log("C数据环更新完毕")
    })
}
function calculateGroupedAverages(array) {
    const groups = {};
    // 按照第一列的值进行分组
    array.forEach((item) => {
        const key = item[0];
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(item.slice(1)); // 排除第一列的值，保留剩余列
    });

    // 计算每个分组的剩余列的均值
    const averages = {};
    for (let key in groups) {
        const group = groups[key];
        const numColumns = group[0].length;
        const sums = new Array(numColumns).fill(0);

        group.forEach((row) => {
            row.forEach((value, index) => {
                sums[index] += value;
            });
        });

        const columnAverages = sums.map((sum) => sum / group.length);
        averages[key] = columnAverages;
    }

    return averages;
}
function getEData(lat,lon,Date){

    getData(lat,lon,Date).then((data)=>{
        data.sort(function(a,b){
            return +a.time-+b.time
        })
        var tmp = []
        for(var i=0;i<data.length;i++){
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
        console.log("E单月平行坐标更新完成")
    })
}
function getFData (lat,lon) {
    getData(lat,lon,2).then((data)=>{
        data.sort(function(a,b){
            return +a.time-+b.time
        })
        var tmp = []
        for(var i=0;i<data.length;i++){
            tmp.push([data[i].time,data[i].aqi])
        }
        showF(tmp)
        console.log("F渲染完毕")
    })
}
function getBData (lat,lon,gasName) {
    getData(lat,lon,2).then((data)=>{
        data.sort(function(a,b){
            return +a.time-+b.time
        })
        var tmp = []
        for(var j=0;j<data.length;j++){
            tmp.push({time:data[j].time,gas:+data[j][gasName],windSpeed: data[j].wind_speed, windDirection: data[j].wind_degree})
        }
        showB(tmp)
        console.log("B风向图更新完毕")
    })
}
function getAData (lat,lon,Date) {
    //相关功能可以直接用showA()实现
    // getData(lat,lon,Date).then((data)=>{
    //     var tmp = {lat:lat,lon:lon,name:name,aqi:data.aqi}
    //     showA(tmp)
    //
    // })
}
function getJData(lat,lon){
    getData(lat,lon,2).then((data)=>{
        data.sort(function(a,b){
            return +a.time-+b.time
        })
        var times = []
        var dataset = []
        var pm25 = {name:"PM2.5",type:"line",
            stack:"Total",data:[]}
        var pm10 = {name:"PM10",type:"line",
            stack:"Total",data:[]}
        var so2 = {name:"SO2",type:"line",
            stack:"Total",data:[]}
        var no2 = {name:"NO2",type:"line",
            stack:"Total",data:[]}
        var co = {name:"CO",type:"line",
            stack:"Total",data:[]}
        var o3 = {name:"O3",type:"line",
            stack:"Total",data:[]}
        var aqi = {name:"AQI",type:"line",
            stack:"Total",data:[]}
        dataset.push(pm25,pm10,so2,no2,co,o3,aqi)
        for(var i=0;i<data.length;i++){
            times.push(data[i].time)
            dataset[0].data.push(+data[i].pm25);
            dataset[1].data.push(+data[i].pm10);
            dataset[2].data.push(+data[i].so2);
            dataset[3].data.push(+data[i].no2);
            dataset[4].data.push(+data[i].co);
            dataset[5].data.push(+data[i].o3);
            dataset[6].data.push(+data[i].aqi);
        }
        var tmp = {time:times,data:dataset}
        showJ(tmp)
        console.log("J图渲染结束")
    })
}
function getHData(lat,lon) {
    const factor = [
        "PM2.5","PM10","SO2","NO2","CO","O3"
    ];
    const gas = [
        "PM2.5","PM10","SO2","NO2","CO","O3",
        "TEMP","RH","PSFC"
    ];
    var pm25_list = []
    var pm10_list = []
    var so2_list = []
    var no2_list = []
    var co_list = []
    var o3_list = []
    var temp_list = []
    var rh_list = []
    var psfc_list = []
    getData(lat,lon,2).then((data)=>{
        for(var i=0;i<data.length;i++){
            pm25_list.push(+data[i].pm25)
            pm10_list.push(+data[i].pm10)
            so2_list.push(+data[i].so2)
            no2_list.push(+data[i].no2)
            co_list.push(+data[i].co)
            o3_list.push(+data[i].o3)
            rh_list.push(+data[i].rh)
            temp_list.push(+data[i].temp)
            psfc_list.push(+data[i].psfc)
        }
        var tmp = {"PM2.5":pm25_list,
            "PM10":pm10_list,
            "SO2":so2_list,
            "NO2":no2_list,
            "CO":co_list,
            "O3":o3_list,
            "RH":rh_list,
            "TEMP":temp_list,
            "PSFC":psfc_list}
        //计算相关系数
        var result = []
        for(var i=0;i<gas.length;i++){
            for(var j=0;j<factor.length;j++){
                result.push([factor[j],gas[i],
                    calculatePearsonCorrelation(tmp,gas[i],factor[j])])
            }
        }
        showH(result)
        console.log("H渲染结束")
    })
}
function getIData(lat,lon){
    getData(lat,lon,2).then((data)=>{
        data.sort(function(a,b){
            return +a.time-+b.time
        })
        var tmp = []
        var gas = ["pm25","pm10","so2","no2","co","o3"];
        for(var i=0;i<data.length;i++){
            var mouth = data[i].time.substring(0,4)
            tmp.push([+mouth, +data[i].pm25,+data[i].pm10,
                +data[i].so2,+data[i].no2,
                +data[i].co,+data[i].o3])
        }
        var result = calculateGroupedAverages(tmp)
        var pm25 = {
            name:"PM2.5",
            type:"bar",
            barGap:0,
            emphasis:{
                focus:"series"
            },
            data: []
        }
        var pm10 = {
            name:"PM10",
            type:"bar",
            barGap:0,
            emphasis:{
                focus:"series"
            },
            data: []
        }
        var so2 = {
            name:"SO2",
            type:"bar",
            barGap:0,
            emphasis:{
                focus:"series"
            },
            data: []
        }
        var no2 = {
            name:"NO2",
            type:"bar",
            barGap:0,
            emphasis:{
                focus:"series"
            },
            data: []
        }
        var co = {
            name:"CO",
            type:"bar",
            barGap:0,
            emphasis:{
                focus:"series"
            },
            data: []
        }
        var o3 = {
            name:"O3",
            type:"bar",
            barGap:0,
            emphasis:{
                focus:"series"
            },
            data: []
        }

        for(var i=2013;i<2019;i++){
            var item = result[i]
            pm25.data.push(item[0])
            pm10.data.push(item[1])
            so2.data.push(item[2])
            no2.data.push(item[3])
            co.data.push(item[4])
            o3.data.push(item[5])
        }
        var dataset = []
        dataset.push(pm25,pm10,so2,no2,co,o3)
        showI(dataset)
        console.log("I年均变化更新完毕")
    })
}
// 计算皮尔逊相关系数
function calculatePearsonCorrelation(data, variable1, variable2) {
    const values1 = data[variable1];
    const values2 = data[variable2];

    // 使用simple-statistics库的pearson函数计算皮尔逊相关系数
    const correlation = ss.sampleCorrelation(values1, values2);
    return correlation.toFixed(1);
}




