package edu.vis4.domain;

public class Air {
    private int num;
    private float aqi;
    private float PM25;
    private float PM10;
    private float SO2;
    private float NO2;
    private float CO;
    private float O3;
    private float U;
    private float V;
    private float TEMP;
    private float RH;
    private float PSFC;
    private float wind_degree;
    private float wind_speed;
    private String lat;
    private String lon;
    private String time;
    private String level;
    private String location;

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public float getAqi() {
        return aqi;
    }

    public void setAqi(float aqi) {
        this.aqi = aqi;
    }

    public float getPM25() {
        return PM25;
    }

    public void setPM25(float PM25) {
        this.PM25 = PM25;
    }

    public float getPM10() {
        return PM10;
    }

    public void setPM10(float PM10) {
        this.PM10 = PM10;
    }

    public float getSO2() {
        return SO2;
    }

    public void setSO2(float SO2) {
        this.SO2 = SO2;
    }

    public float getNO2() {
        return NO2;
    }

    public void setNO2(float NO2) {
        this.NO2 = NO2;
    }

    public float getCO() {
        return CO;
    }

    public void setCO(float CO) {
        this.CO = CO;
    }

    public float getO3() {
        return O3;
    }

    public void setO3(float o3) {
        O3 = o3;
    }

    public float getU() {
        return U;
    }

    public void setU(float u) {
        U = u;
    }

    public float getV() {
        return V;
    }

    public void setV(float v) {
        V = v;
    }

    public float getTEMP() {
        return TEMP;
    }

    public void setTEMP(float TEMP) {
        this.TEMP = TEMP;
    }

    public float getRH() {
        return RH;
    }

    public void setRH(float RH) {
        this.RH = RH;
    }

    public float getPSFC() {
        return PSFC;
    }

    public void setPSFC(float PSFC) {
        this.PSFC = PSFC;
    }

    public float getWind_degree() {
        return wind_degree;
    }

    public void setWind_degree(float wind_degree) {
        this.wind_degree = wind_degree;
    }

    public float getWind_speed() {
        return wind_speed;
    }

    public void setWind_speed(float wind_speed) {
        this.wind_speed = wind_speed;
    }

    public String getLat() {
        return lat;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public String getLon() {
        return lon;
    }

    public void setLon(String lon) {
        this.lon = lon;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}