// // 字符串辅助函数
// function padNumber(num) {
//     return num.toString().padStart(2, "0");
// }
// // 得到全国五年的数据
// function getwholeDivide(){
//     var startYear = 2013;
//     var endYear = 2018;
//     var result = [];
//     var partresult = [];
//
//     for (var year = startYear; year <= endYear; year++) {
//         var yearData = {};
//         var tp = [];
//         for (var month = 1; month <= 12; month++) {
//             var daysInMonth = new Date(year, month, 0).getDate();
//             var monthData = [];
//             for (var day = 1; day <= daysInMonth; day++) {
//                 var date = year.toString()  + padNumber(month)  + padNumber(day);
//             }
//             yearData[month] = monthData;
//         }
//         result.push({[year.toString()]:yearData});
//         partresult.push({[year.toString()]:tp});
//     }
//     return [result,partresult];
// }
// 全国污染等级图的动态处理
// 全国污染等级图初始化
main1();
function main1(){
    getDivide(-1,-1,'2013');
    getsunny(-1,-1,'201301');
    getqipao('18.34','109.25','2');
    getwholecountry(-1,-1,'20130101');
    get_six('18.34','109.25','20130101');
}