# 大气污染研究系统代码使用指南

## 一、数据方面

### 1、将数据导入本地数据库

创建一个数据库，名称为vis

<img src="D:\TyporaImg\image-20230601163534452.png" alt="image-20230601163534452" style="zoom:25%;" />

执行SQL文件

​	先执行visdata4.sql，再执行location.sql

<img src="D:\TyporaImg\image-20230620082443737.png" alt="image-20230620082443737" style="zoom:50%;" />

修改jdbc，设置本地数据库的用户名和密码

<img src="D:\TyporaImg\image-20230620082612182.png" alt="image-20230620082612182" style="zoom:50%;" />

### 2、前后端数据交互

#### 2.1 获取数据API

数据获取通过调用函数getData获取。接受三个参数，对应为：

​	lat：纬度

​	lon：经度

​	Date：日期。日期格式类似于“20130101”、“20131131”等，也可以输入“2013”，“201301”，“201310”等

干函数返回值为对应坐标和时间的数据。如果不设置经纬度坐标，则会根据时间获取所有经纬度的数据。

```
function getData(lat=-1,lon=-1,Date){
    return new Promise((resolve, reject) => {
        if (lat == -1 && lon == -1) {
            $.get(
                "/home/byDate/",
                {Date: Date},
                function (data) {
                    resolve(data);
                })
        }else{
            $.get(
                "/home/byDateAndLatAndLon/",
                {lat: lat, lon: lon, Date: Date},
                function (data) {
                    resolve(data);
                })
        }
    })
}
```

该函数位于src\main\webapp\js\getdataAPI.js路径下

<img src="D:\TyporaImg\image-20230601163811142.png" alt="image-20230601163811142" style="zoom:25%;" />

#### 2.2 使用方法

演示代码如下

```
var lat = 1
var lon = 2
var Date = "20130101"
getData(lat,lon,Date).then((data)=>{
//data即为获取的数据，
//data是一个js对象数组，可以通过打印查看具体格式
consoloe.log(data)
})
```

## 二、前端代码

### 1、代码安置

如图所示，将css代码放到css文件夹中、将images素材放入images文件夹中，将js代码放到js文件夹中，html代码转化为jsp文件（转化方法见下）后放到jsp文件夹中，index.jsp是系统默认打开的第一个界面，请将开始界面html代码转化为jsp文件后替换图中的index.jsp

<img src="D:\TyporaImg\image-20230601164857559.png" alt="image-20230601164857559" style="zoom:50%;" />

### 2、html转jsp

jsp文件和html区别在于文件后缀不一样，且jsp文件比html代码多一行内容：

```
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
```

因此将此行内容加到html代码开头，然后修改html后缀为jsp即可完成转化，或者采取以下步骤：

创建一个jsp文件

<img src="D:\TyporaImg\image-20230601165341546.png" alt="image-20230601165341546" style="zoom:25%;" />

然后粘贴所有html代码到图示位置即可

<img src="D:\TyporaImg\image-20230601165504736.png" alt="image-20230601165504736" style="zoom:25%;" />

