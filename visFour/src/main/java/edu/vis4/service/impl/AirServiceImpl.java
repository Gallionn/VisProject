package edu.vis4.service.impl;

import edu.vis4.dao.AirDao;
import edu.vis4.domain.Air;
import edu.vis4.service.AirService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AirServiceImpl implements AirService {
    @Autowired
    private AirDao airDao;

    public List<Air> getAllByLatAndLon(String lat, String lon) {
        return airDao.getAllByLatAndLon(lat,lon);
    }

    public List<Air> getAllByTime(String Time) {
        return airDao.getAllByTime(Time);
    }

    public List<Air> getAllByTimeAndLatAndLon(String lat, String lon, String Time) {
        return airDao.getAllByTimeAndLatAndLon(lat,lon,Time);
    }

    public List<Air> getLocName(String lat, String lon) {
        return airDao.getLocName(lat,lon);
    }

    @Override
    public List<Air> getLatAndlon(String location) {
//        System.out.println("###############"+name);
        return airDao.getLatAndlon(location);
    }


}
