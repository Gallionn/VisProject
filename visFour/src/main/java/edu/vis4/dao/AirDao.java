package edu.vis4.dao;

import edu.vis4.domain.Air;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;
public interface AirDao {

    @Select("select * from visdata where lat=#{lat} and lon=#{lon};")
    public List<Air> getAllByLatAndLon(@Param("lat")String lat, @Param("lon")String lon);

    @Select("select * from visdata where Time like concat('%',#{Time},'%');")
    public List<Air> getAllByTime(String Time);

    @Select("select * from visdata where lat=#{lat} and lon=#{lon} and Time like concat('%',#{Time},'%');")
    public List<Air> getAllByTimeAndLatAndLon(@Param("lat")String lat,@Param("lon")String lon,@Param("Time") String Time);

    @Select("select * from loca where lat=#{lat} and lon=#{lon}")
    List<Air> getLocName(@Param("lat")String lat, @Param("lon")String lon);

    @Select("select * from loca where location=#{location}")
    List<Air> getLatAndlon(String location);
}
