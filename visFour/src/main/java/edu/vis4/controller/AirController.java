package edu.vis4.controller;

import edu.vis4.domain.Air;
import edu.vis4.service.AirService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.util.List;

@RestController
@RequestMapping("/home")
public class AirController {
    @Autowired
    private AirService airService;


    @GetMapping("/byLocation/")
    public List<Air> getAllByLatAndLon(@RequestParam("lat") String lat, @RequestParam("lon") String lon) {
        System.out.println("getAllByLatAndLon，获取指定经纬度的数据");
        return airService.getAllByLatAndLon(lat,lon);
    }
    @GetMapping("/byDate/")
    public List<Air> getAllByTime(@RequestParam("Date") String Date) {
        System.out.println("getAllByDate，获取指定时间的全国大气信息");
        return airService.getAllByTime(Date);
    }

    @GetMapping("/byDateAndLatAndLon/")
    public List<Air> getAllByTimeAndLatAndLon(@RequestParam("lat") String lat,@RequestParam("lon") String lon,@RequestParam("Date") String Date) {
        System.out.println("根据坐标，时间获取大气信息");
        return airService.getAllByTimeAndLatAndLon(lat,lon,Date);
    }
    @GetMapping("/getLocName/")
    public List<Air> getLocName(@RequestParam("lat") String lat,@RequestParam("lon") String lon) {
        System.out.println("根据坐标，获取位置名称");
        return airService.getLocName(lat,lon);
    }
    @GetMapping("/getLatAndlon/")
    public List<Air> getLocbyName(@RequestParam("location") String location) {
        System.out.println(location);
//        海南省三亚市天涯区
        location = "'海南省三亚市天涯区'";
        System.out.println("根据位置，获取坐标");
        return airService.getLatAndlon(location);
    }

}
