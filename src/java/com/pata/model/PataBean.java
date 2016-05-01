/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pata.model;

/**
 *
 * @author admin
 */
public class PataBean 
{
    public String servicetype, name, address, telephone, country, town, imgurl;
    public float latitude,longitude,rating,distance;
    public int id,size;
    
    public String getServicetype(){return servicetype;}
    public void setServicetype(String servicetype){this.servicetype = servicetype;}
    
    public String getName(){return name;}
    public void setName(String name){this.name = name;}
    
    public String getAddress(){return address;}
    public void setAddress(String address){this.address = address;}
    
    public String getTelephone(){return telephone;}
    public void setTelephone(String telephone){this.telephone = telephone;}
    
    public float getLatitude(){return latitude;}
    public void setLatitude(float latitude){this.latitude = latitude;}
    
    public float getLongitude(){return longitude;}
    public void setLongitude(float longitude){this.longitude = longitude;}
    
    public int getId(){return id;}
    public void setId(int id){this.id = id;}
    
    public String getCountry(){return country;}
    public void setCountry(String country){this.country=country;}
    
    public String getTown(){return town;}
    public void setTown(String town){this.town=town;}
    
    public float getRatings(){return rating;}
    public void setRating(float rating){this.rating = rating;}
    
    public float getDistance(){return distance;}
    public void setDistance(float distance){this.distance = distance;}
    
    public int getSize(){return size;}
    public void setSize(int size){this.size = size;}
    
    public String getImgurl(){return imgurl;}
    public void setImgurl(String imgurl){this.imgurl=imgurl;}
    
}
