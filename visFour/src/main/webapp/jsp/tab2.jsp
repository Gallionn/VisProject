<%--
  Created by IntelliJ IDEA.
  User: 君启度航
  Date: 2023/5/28
  Time: 14:58
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>可视化4组</title>
    <link rel="stylesheet" href="../css/tab2.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="stylesheet" href="../css/easyui.css"/>
    <link rel="stylesheet" href="../css/tabme.css">
    <style>
        #pauseJ {
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
        <div class="row1-column">
            <div id="lat" style="display: none"></div>
            <div id="lon" style="display: none"></div>
            <!-- 相关系数矩阵热力图 -->
            <div class="panel H">
                <h2>相关系数矩阵热力图</h2>
                <div class="chart"></div>
                <div class="panel-footer"></div>
            </div>
        </div>
        <div class="row1-column">
            <!-- 平行坐标折线图 -->
            <div class="panel E">
                <h2>平行坐标折线图</h2>
                <div class="chart"></div>
                <div class="panel-footer"></div>
            </div>
        </div>
    </div>
    <div class="row-2">
        <div class="row2-column">
            <!-- 堆叠折线图 -->
            <div class="panel J">
                <h2>堆叠折线图 <button id="pauseJ" class="fa fa-play">暂停</button></h2>
                <div class="chart"></div>
                <div class="panel-footer"></div>
            </div>
        </div>
        <div class="row2-column">
            <!-- 风向图 -->
            <div class="panel B">
                <!--<h2>风向图</h2>-->
                <div class="gas-c">
                    <select class="gas">
                        <option value="pm25">PM2.5</option>
                        <option value="pm10">PM10</option>
                        <option value="so2">SO2</option>
                        <option value="no2">NO2</option>
                        <option value="co">CO</option>
                        <option value="o3">O3</option>
                    </select>
                </div>
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
<script src="../js/tab2.js"></script>
<script src="../js/getdataAPI.js"></script>

<script>
    $('.tab2').addClass('active');
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
    $('#pauseJ').click(function() {
        $(this).toggleClass('fa-play fa-pause');
        var buttonText = $(this).text();
        if (buttonText === '暂停') {
            $(this).text('继续');
        } else {
            $(this).text('暂停');
        }
    });

    var lat = localStorage.getItem('lat');
    var lon = localStorage.getItem('lon');
    console.log("加载tab2读取纬度：",lat)
    console.log("加载tab2读取经度：",lon)

    $("#lat").text(lat)
    $("#lon").text(lon)
    getHData(lat,lon)
    getJData(lat,lon);
    getEData(lat,lon,"201301")
    getBData(lat,lon,"no2")
</script>
</body>
</html>