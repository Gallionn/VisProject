
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>可视化4组</title>
    <link rel="stylesheet" href="../css/tab1.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <!-- <link rel="stylesheet" href="../css/easyui.css"/> -->
    <link rel="stylesheet" href="https://www.jeasyui.com/easyui/themes/default/easyui.css">
    <link rel="stylesheet" href="../css/tabme.css">
    <style>
        #pauseF {
            position:relative;
            cursor: pointer;
            border:3px solid #4c9bfd;
            border-radius: 3px;
            background-color:#fff;
            color:#4c9bfd;
            height: 0.4rem;
            width: 0.8rem;
        }
    </style>
</head>
<body>
<!-- 头部盒子 -->
<header>
    <h1>地方大气污染物研究</h1>
    <div class="showTime"></div>
</header>
<!-- TAB -->
<jsp:include page="../jsp/tab.jsp"></jsp:include>
<!-- 主体部分 -->
<section class="mainbox">
    <div class="row-1">
        <div class="column">
            <!-- 控制台 -->
            <div class="panel G">
                <!-- 日期 -->
                <div class="center-button">
                    <button id="dateButton">2013-1-1</button>
                </div>
                <!-- 日历组件 -->
                <div id="calendarContainer" style="display: none;">
                    <div id="calendar"></div>
                </div>
                <div class="controller">
                    <div class="column-controller">
                        <ul>
                            <li id="aqi"><span class="value">AQI 99</span></li>
                            <li id="wind"><i class="fas fa-wind"></i> <span class="value">西南风 10m/s</span></li>
                            <li id="psfc"><i class="fas fa-chart-line"></i> <span class="value">99hPa</span></li>
                            <li id="temp"><i class="fas fa-thermometer-half"></i> <span class="value">99°C</span></li>
                            <li id="rh"><i class="fas fa-tint"></i> <span class="value">99%</span></li>
                        </ul>
                        <div class="chart-a"></div>
                    </div>
                    <div class="column-controller">
                        <div class="name">青岛</div>
                        <div id="lat" style="display: none"></div>
                        <div id="lon" style="display: none"></div>
                        <div class="chart"></div>
                    </div>
                </div>
                <div class="slider-container">
                    <div id="slider"></div>
                </div>
                <div class="panel-footer"></div>
            </div>
        </div>
        <div class="column">
            <!-- 单轴散点图 -->
            <div class="panel D">
                <!-- <h2>图表-待施工</h2> -->
                <div class="gas-c">
                    <select class="gas">
                        <option value="pm25">PM2.5</option>
                        <option value="pm10">PM10</option>
                        <option value="so2">SO2</option>
                        <option value="no2">NO2</option>
                        <option value="co">CO</option>
                        <option value="o3">O3</option>
                        <option value="aqi">AQI</option>
                    </select>
                    <select class="yearSelect-gas">
                        <option value="2013">2013</option>
                        <option value="2014">2014</option>
                        <option value="2015">2015</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                    </select>
                </div>
                <div class="chart"></div>
                <div class="panel-footer"></div>
            </div>
        </div>
        <div class="column">
            <!-- 数据环 -->
            <div class="panel C">
                <!-- <h2>图表-待施工</h2> -->
                <div class="yearSelect-c">
                    <select class="yearSelect">
                        <option value="2013">2013</option>
                        <option value="2014">2014</option>
                        <option value="2015">2015</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                    </select>
                </div>
                <div class="chart"></div>
                <div class="panel-footer"></div>
            </div>
        </div>
    </div>
    <div class="row-2">
        <div class="column-row-2">
            <!-- AQI折线图 -->
            <div class="panel F">
                <h2>AQI折线图 <button id="pauseF" class="fa fa-play">暂停</button></h2>
                <div class="chart"></div>
                <div class="panel-footer"></div>
            </div>
        </div>
        <div class="column-row-2">
            <!-- 堆叠柱状图 -->
            <div class="panel I">
                <h2>各类污染物年均浓度变化</h2>
                <div class="chart"></div>
                <div class="panel-footer"></div>
            </div>
        </div>
    </div>
</section>
<script src="../js/jquery.min.js"></script>
<script src="../js/jquery-easyui/jquery.easyui.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
<script src="../js/flexible.js"></script>
<%--<script src="https://cdn.jsdelivr.net/npm/simple-statistics@2.3.0/dist/simple-statistics.min.js"></script>--%>
<script src="../js/simple-statistics.min.js"></script>
<script src="../js/echarts.js"></script>
<script src="../js/bmap.js"></script>
<script src="../js/china.js"></script>
<script src="../js/tab1.js"></script>
<script src="../js/getdataAPI.js"></script>

<script>
    $('.tab1').addClass('active');
    var t = null;
    t = setTimeout(time, 1000); //開始运行
    function time() {
        clearTimeout(t); //清除定时器
        dt = new Date();
        var y = dt.getFullYear();
        var mt = dt.getMonth() + 1;
        var day = dt.getDate();
        var h = dt.getHours(); //获取时
        var m = dt.getMinutes(); //获取分
        var s = dt.getSeconds(); //获取秒
        document.querySelector(".showTime").innerHTML =
            "当前时间：" +
            y +
            "年" +
            mt +
            "月" +
            day +
            "-" +
            h +
            "时" +
            m +
            "分" +
            s +
            "秒";
        t = setTimeout(time, 1000); //设定定时器，循环运行
    }

    $('#pauseF').click(function() {
        $(this).toggleClass('fa-play fa-pause');
        var buttonText = $(this).text();
        if (buttonText === '暂停') {
            $(this).text('继续');
        } else {
            $(this).text('暂停');
        }
    });

    //通过某种方法获取这两个值
    var lat = localStorage.getItem('lat');
    var lon = localStorage.getItem('lon');
    var time = localStorage.getItem('time');
    console.log("加载tab1读取纬度——前：",lat)
    console.log("加载tab1读取经度——前：",lon)
    console.log("加载tab1读取时间——前：",time)
    if(lat == null || lon == null || time == null){
        lat = 18.34
        lon = 109.25
        time = "20130101"
    }
    console.log("加载tab1读取纬度——后：",lat)
    console.log("加载tab1读取经度——后：",lon)
    console.log("加载tab1读取时间——后：",time)
    $("#lat").text(lat)
    $("#lon").text(lon)
    //渲染图表
    calendar_ctrl();
    make_slider();
    var gasNameOfD = $('.gas').val();
    console.log("气体名称测试:",gasNameOfD)
    getDData(lat,lon,time.slice(0,4),gasNameOfD)
    getFData(lat,lon)
    getCData(lat,lon,time.slice(0,4))
    getGData(lat,lon,time)
    //getAData(lat,lon,time),G中已经更新
    getIData(lat,lon)

    //跳转tab时保存坐标
    var lat = $("#lat").text()
    var lon = $("#lon").text()
    console.log("tab1保存纬度：",lat)
    console.log("tab1保存经度：",lon)
    localStorage.setItem('lat', lat);
    localStorage.setItem('lon', lon);

</script>
</body>
</html>
