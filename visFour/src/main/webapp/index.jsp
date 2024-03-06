<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!-- html代码放到这 -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>全国天气污染物可视化</title>
    <link rel="stylesheet" href="./css/index1.css"/>
    <link rel="stylesheet" href="./css/tabme.css"/>
    <link rel="stylesheet" href="./css/font_4018361_0y1w06oevm6/iconfont.css"/>
    <link rel="stylesheet" href="http://at.alicdn.com/t/c/font_4018361_flf2saovz6k.css"/>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <style>
        .iconfont {
            font-family: "iconfont", serif !important;
            font-size: 20px;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
    </style>
    <script src="./js/echarts-5.2.2.js"></script>
<%--    <script src="./js/echarts.js"></script>--%>
    <script src="./js/flexible.js"></script>
    <script src="./js/jquery.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="http://api.map.baidu.com/api?v=3.0&ak=qN488D2lS3d6wKZCbHGrcxaFLF4KHGpg"></script>
</head>
<body>
<header>
    <h1>天气污染物可视化</h1>
    <div class="showtime">121314</div>
    <script>
        var t = null;
        t = setTimeout(time, 1000);//开始运行
        function time() {
            clearTimeout(t);//清除定时器
            dt = new Date();
            var y = dt.getFullYear();
            var mt = dt.getMonth() + 1;
            var day = dt.getDate();
            var h = dt.getHours();//获取时
            var m = dt.getMinutes();//获取分
            var s = dt.getSeconds();//获取秒
            document.querySelector(".showtime").innerHTML = '当前时间：' + y + "年" + mt + "月" + day + "号" + h + "时" + m + "分" + s + "秒";
            t = setTimeout(time, 1000); //设定定时器，循环运行
        }
    </script>
</header>
<div class="row-tab">
    <div class="tab3"><a href=" ">主界面</a></div>
    <div class="tab1"><a href="./jsp/tab1.jsp">异常分析</a></div>
    <div class="tab2"><a href="./jsp/tab2.jsp">溯源分析</a></div>
</div>
<section class="mainbox">
    <div class="column">
        <!-- 主界面 -->
        <div class="map">
            <div class="map1"></div>
            <div class="map2"></div>
            <div class="chart"></div>
        </div>
        <div class="panel Statistical">
            <div class="chart"></div>
            <div class="panel-footer"></div>
        </div>
        <div class="contime">
            <div class="zui">
                <span id="zuispan">2013-01-01</span>
                <div id="zuichart"></div>
            </div>
            <div class="zui-footer"></div>
        </div>
    </div>

    <!-- 第二部分 -->
    <div class="column">
        <!-- 控制台 -->
        <div class="panel">
            <div class="chart">
                <div class="twotiao">
                    <ul id="choosetime">
                        <li>
                            <div class="diji">
                                <i class="iconfont icon-rili"></i>
                                <div id="calendar">
                                </div>
                            </div>
                            <span id="selectedDate">2013-01-01</span>
                        </li>
                    </ul>
                    <ul id="xianshi">
                        <li>
                            <span id="AQI">AQI</span>
                            <span id="shuzhi">31.72</span>
                        </li>
                        <li id="location">海南省三亚市天涯区</li>
                    </ul>
                </div>

                <div class="pollute">
                    <div class="co">
                        <div class="four">
                            <ul>
                                <li><i class="iconfont icon-fengsu"></i><span id="f">3.39m/s</span></li>
                                <li><i class="iconfont icon-wendu"></i><span id="w">18.39℃</span></li>
                                <li><i class="iconfont icon-shidu"></i><span id="s">68.14%</span></li>
                                <li><i class="iconfont icon-daqiyaqiang"></i><span id="d">100.35kpa</span></li>
                            </ul>
                        </div>
                    </div>

                    <div class="co">
                        <div class="six sixchart">
                            <div class="s">
                                <div class="s1"></div>
                                <div class="s2"></div>
                                <div class="s3"></div>
                            </div>
                            <div class="s">
                                <div class="s4"></div>
                                <div class="s5"></div>
                                <div class="s6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel-footer"></div>
        </div>
        <!-- 晴雨图 -->
        <div class="panel scatter">
            <div class="chart"></div>
            <div class="panel-footer"></div>
        </div>
    </div>

    <!-- 第三部分 -->
    <div class="column">
        <!-- AQI条形图 -->
        <div class="panel bar2">
            <ul>
                <li>lat:</li>
                <li id="lat">18.34</li>
                <li>lon:</li>
                <li id="lon">109.25</li>
            </ul>
            <div class="chart"></div>
            <div class="button-container">
                <button id="desc">desc</button>
                <button id="asc">asc</button>
                <button id="reset">reset</button>
            </div>
            <div class="panel-footer"></div>
        </div>

        <!-- 气泡图 -->
        <div class="panel scatter2">
            <div class="chart"></div>
            <div class="panel-footer"></div>
        </div>
    </div>

</section>
<script src="./js/kongzhi.js"></script>
<script src="./js/china.js"></script>
<script src="./js/bmap.js"></script>
<script src="./js/wind.js"></script>
<script src="./js/contime.js"></script>
<script src="./js/getdataAPI.js"></script>
<script src="./js/main.js"></script>
<script>
    $('.tab3').addClass('active');

</script>
</body>
</html>