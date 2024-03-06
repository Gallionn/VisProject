package edu.vis4.service;

import edu.vis4.domain.Air;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface AirService {
    public List<Air> getAllByLatAndLon(String lat, String lon);
    public List<Air> getAllByTime(String Time);

    public  List<Air> getAllByTimeAndLatAndLon(String lat,String lon,String Time);

    List<Air> getLocName(String lat, String lon);

    List<Air> getLatAndlon(String location);
}
