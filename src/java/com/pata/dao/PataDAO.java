/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pata.dao;
import com.pata.connection.PataConnectionManager;
import com.pata.model.PataBean;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author admin
 */
public class PataDAO {
    PataConnectionManager pataconnectionmanager = new PataConnectionManager();
    
    public List getServiceTypes() throws Exception
    {
        List servicetypes = new ArrayList();
        PreparedStatement pstmt = null;
        Connection conn = null;
        ResultSet rs = null;
        
        try
        {
            conn = pataconnectionmanager.getPataconnection();
            String query = "SELECT * FROM service_types_tbl";
            pstmt = conn.prepareStatement(query);
            rs=pstmt.executeQuery(query);
            while(rs.next())
            {
                PataBean okoabean = new PataBean();
                okoabean .setServicetype(rs.getString("service_name"));
                okoabean .setId(rs.getInt("id"));
                
                servicetypes.add(okoabean );
                
            }
            
            
        
        }
        catch(Exception ex)
        {
            throw new Exception(ex);
        
        }
        finally
        {
            if (rs != null)	{
	            try {
	               rs.close();
	            } catch (Exception e) {}
	               rs = null;
	            }
		
	         if (pstmt != null) {
	            try {
	               pstmt.close();
	            } catch (Exception e) {}
	               
	            }
		
	         if (conn != null) {
	            try {
	               conn.close();
	            } catch (Exception e) {
	            }

	            conn = null;
	         }
        
        }
        
        
        return servicetypes;
        
    
    }
    public List getCountries() throws Exception
    {
        List countries = new ArrayList();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        
        try
        {
            conn = pataconnectionmanager.getPataconnection();
            String query = "SELECT * FROM countries_tbl";
            pstmt = conn.prepareStatement(query);
            rs=pstmt.executeQuery();
            while(rs.next())
            {
                PataBean okoabean = new PataBean();
                okoabean.setCountry(rs.getString("Country"));
                okoabean.setId(rs.getInt("ID"));
                countries.add(okoabean);
            }
            
        }
        catch(Exception ex)
        {
            throw new Exception(ex);
        }
        finally
        {
             if (rs != null)	{
	            try {
	               rs.close();
	            } catch (Exception e) {}
	               rs = null;
	            }
		
	         if (pstmt != null) {
	            try {
	               pstmt.close();
	            } catch (Exception e) {}
	               
	            }
		
	         if (conn != null) {
	            try {
	               conn.close();
	            } catch (Exception e) {
	            }

	            conn = null;
	         }
            
        }
        
        return countries;
    
    }
    
    public String createServiceProvider(String name,String number,String address,int country,int town,int servicetype,float latitude,float longitude) throws Exception
    {
        String success=null;
        Connection conn=null;
        PreparedStatement pstmt=null;
        ResultSet rs=null;
        int providerid;
        
        try
        {
            conn=pataconnectionmanager.getPataconnection();
            conn.setAutoCommit(false);
            String query = "INSERT INTO service_providers_tbl(Name,Telephone_No,Address,Country,Town,Longitude,Latitude,Ratings)VALUES(?,?,?,?,?,?,?,?)";
            pstmt = conn.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            pstmt.setString(1, name);
            pstmt.setString(2, number);
            pstmt.setString(3, address);
            pstmt.setInt(4, country);
            pstmt.setInt(5, town);            
            pstmt.setFloat(6, latitude);
            pstmt.setFloat(7, longitude); 
            pstmt.setDouble(8, 1.1);
            
            int count = pstmt.executeUpdate();
            if(count == 1)
            {
                ResultSet generatedKeys = pstmt.getGeneratedKeys();
                
                    if (generatedKeys.next())
                    {
                        providerid = generatedKeys.getInt(1);
                        String query1 = "INSERT INTO service_allocations_tbl(Service_Provider_ID,Service_ID) VALUES(?,?)";
                        pstmt=conn.prepareStatement(query1);
                        pstmt.setInt(1, providerid);
                        pstmt.setInt(2, servicetype);                        
                        int count1 = pstmt.executeUpdate();
                        if(count1==1)
                        {
                            conn.commit();
                            success = "Service Provider Created";
                        }
                        
                    }
                    else 
                    {
                        throw new Exception();
                    }
                
                
            }
            
        
        }
        catch(Exception ex)
        {
            throw new Exception(ex);
        
        }
        finally
        {
            if (rs != null)	{
	            try {
	               rs.close();
	            } catch (Exception e) {}
	               rs = null;
	            }
		
	         if (pstmt != null) {
	            try {
	               pstmt.close();
	            } catch (Exception e) {}
	               
	            }
		
	         if (conn != null) {
	            try {
	               conn.close();
	            } catch (Exception e) {
	            }

	            conn = null;
	         }
        }
        
        return success;
    }
    
    public List getTowns(int country) throws Exception
    {
        List towns = new ArrayList();
        Connection conn = null;
        ResultSet rs = null;
        PreparedStatement pstmt = null;
        
        try
        {
            conn=pataconnectionmanager.getPataconnection();
            String query = "SELECT * FROM towns_tbl WHERE Country_ID = ?";
            pstmt = conn.prepareStatement(query);
            pstmt.setInt(1, country);
            rs=pstmt.executeQuery();
            while(rs.next())
            {
                PataBean okoabean = new PataBean();
                okoabean.setTown(rs.getString("Town"));
                okoabean.setId(rs.getInt("ID"));
                okoabean.setLatitude(rs.getFloat("Latitude"));
                okoabean.setLongitude(rs.getFloat("Longitude"));
                towns.add(okoabean);
            }
        }
        catch(Exception ex)
        {
            throw new Exception(ex); 
        }
        finally
        {
            if (rs != null)	{
	            try {
	               rs.close();
	            } catch (Exception e) {}
	               rs = null;
	            }
		
	         if (pstmt != null) {
	            try {
	               pstmt.close();
	            } catch (Exception e) {}
	               
	            }
		
	         if (conn != null) {
	            try {
	               conn.close();
	            } catch (Exception e) {
	            }

	            conn = null;
	         }
        }
        
        return towns;
    
    }
    
    public List servicesPerSelection(int serviceid, int townid) throws Exception
    {
        List services = new ArrayList();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        
        try
        {
            conn = pataconnectionmanager.getPataconnection();
            String query = "SELECT a.ID AS serviceproviderid, Name, Latitude, Longitude, Rating FROM service_providers_tbl a INNER JOIN service_allocations_tbl b ON a.ID = b.Service_Provider_ID WHERE Service_ID = ? AND a.town = ?";
            pstmt = conn.prepareStatement(query);
            pstmt.setInt(1, serviceid);
            pstmt.setInt(2,townid);
            rs=pstmt.executeQuery();
            while(rs.next())
            {
                PataBean okoabean = new PataBean();
                okoabean.setId(rs.getInt("serviceproviderid"));
                okoabean.setName(rs.getString("Name"));
                okoabean.setLatitude(rs.getFloat("Latitude"));
                okoabean.setLongitude(rs.getFloat("Longitude"));
                okoabean.setRating(rs.getFloat("Rating"));
                services.add(okoabean);
            }  
        
        }
        catch(Exception ex)
        {
            throw new Exception(ex);
        
        }
        finally
        {
            if (rs != null)	{
	            try {
	               rs.close();
	            } catch (Exception e) {}
	               rs = null;
	            }
		
	         if (pstmt != null) {
	            try {
	               pstmt.close();
	            } catch (Exception e) {}
	               
	            }
		
	         if (conn != null) {
	            try {
	               conn.close();
	            } catch (Exception e) {
	            }

	            conn = null;
	         }
        }
        
        
        return services;
    }
    
    public String getServicename(int serviceid) throws Exception
    {
        String servicename = null;
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        
        try
        {
            conn=pataconnectionmanager.getPataconnection();
            String query = "SELECT Service_Name FROM service_types_tbl WHERE ID = ?";
            pstmt=conn.prepareStatement(query);
            pstmt.setInt(1, serviceid);
            rs=pstmt.executeQuery();
            while(rs.next())
            {                
                servicename = rs.getString("Service_Name");
            }
            
        }
        catch(Exception ex)
        {
            throw new Exception(ex);            
        }
        
        finally
        {
            if (rs != null)	{
	            try {
	               rs.close();
	            } catch (Exception e) {}
	               rs = null;
	            }
		
	         if (pstmt != null) {
	            try {
	               pstmt.close();
	            } catch (Exception e) {}
	               
	            }
		
	         if (conn != null) {
	            try {
	               conn.close();
	            } catch (Exception e) {
	            }

	            conn = null;
	         }
        }
        
        return servicename;
    }
    
    public List servicesPerGeoLocation(int serviceid, float latitude,float longitude) throws Exception
    {
        List services = new ArrayList();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        
        try
        {
            conn = pataconnectionmanager.getPataconnection();
            //String query = "SELECT a.ID AS serviceproviderid, Name, Latitude, Longitude, Rating FROM service_providers_tbl a INNER JOIN service_allocations_tbl b ON a.ID = b.Service_Provider_ID WHERE Service_ID = ? AND a.town = ?";
            String query = "SELECT a.ID AS serviceproviderid, Name, Telephone_No, Address, Latitude, Longitude, Rating, ( 6371 * acos( cos( radians(?) ) * cos( radians( Latitude ) ) * cos( radians( Longitude ) - radians(?) ) + sin( radians(?) ) * sin( radians( Latitude ) ) ) ) AS distance FROM service_providers_tbl a INNER JOIN service_allocations_tbl b ON a.ID = b.Service_Provider_ID WHERE Service_ID = ? HAVING distance < 25 ORDER BY distance";
            pstmt = conn.prepareStatement(query);
            pstmt.setFloat(1, latitude);
            pstmt.setFloat(2, longitude);
            pstmt.setFloat(3, latitude);
            pstmt.setInt(4, serviceid);
            
            rs=pstmt.executeQuery();
            while(rs.next())
            {
                PataBean patabean = new PataBean();
                patabean.setId(rs.getInt("serviceproviderid"));
                patabean.setName(rs.getString("Name"));
                patabean.setTelephone(rs.getString("Telephone_No"));
                patabean.setAddress(rs.getString("Address"));
                patabean.setDistance(rs.getFloat("distance"));
                patabean.setLatitude(rs.getFloat("Latitude"));
                patabean.setLongitude(rs.getFloat("Longitude"));
                patabean.setRating(rs.getFloat("Rating"));
                services.add(patabean);
            }  
        
        }
        catch(Exception ex)
        {
            throw new Exception(ex);
        
        }
        finally
        {
            if (rs != null)	{
	            try {
	               rs.close();
	            } catch (Exception e) {}
	               rs = null;
	            }
		
	         if (pstmt != null) {
	            try {
	               pstmt.close();
	            } catch (Exception e) {}
	               
	            }
		
	         if (conn != null) {
	            try {
	               conn.close();
	            } catch (Exception e) {
	            }

	            conn = null;
	         }
        }
        
        
        return services;
    }
    
    public List serviceProviderdetails(int serviceproviderid, float latitude, float longitude) throws Exception
    {
        List details = new ArrayList();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        
        try
        {
            conn = pataconnectionmanager.getPataconnection();
            String query = "SELECT *, ( 6371 * acos( cos( radians(?) ) * cos( radians( Latitude ) ) * cos( radians( Longitude ) - radians(?) ) + sin( radians(?) ) * sin( radians( Latitude ) ) ) ) AS Distance FROM service_providers_tbl WHERE ID = ?";
            pstmt = conn.prepareStatement(query);
            pstmt.setFloat(1, latitude);
            pstmt.setFloat(2, longitude);
            pstmt.setFloat(3, latitude);
            pstmt.setInt(4, serviceproviderid);
            rs = pstmt.executeQuery();
            while(rs.next())
            {
                PataBean patabean = new PataBean();                
                patabean.setName(rs.getString("Name"));
                patabean.setTelephone(rs.getString("Telephone_No"));
                patabean.setAddress(rs.getString("Address"));                
                patabean.setRating(rs.getFloat("Rating"));
                patabean.setDistance(rs.getFloat("Distance"));
                patabean.setImgurl(rs.getString("Image_URL"));
                details.add(patabean);
                
            }
            
        
        }
        catch(Exception ex)
        {
            throw new Exception(ex);
            
        }
        finally
        {
            if (rs != null)	{
	            try {
	               rs.close();
	            } catch (Exception e) {}
	               rs = null;
	            }
		
	         if (pstmt != null) {
	            try {
	               pstmt.close();
	            } catch (Exception e) {}
	               
	            }
		
	         if (conn != null) {
	            try {
	               conn.close();
	            } catch (Exception e) {
	            }

	            conn = null;
	         }
            
        
        }
        
        
        return details;
    
    }
    
    public List InstaSearch(String serviceid, String querystring) throws Exception
    {
        List results = new ArrayList();
        Connection conn = null;
        ResultSet rs = null;
        PreparedStatement pstmt = null;
        
        try
        {
            conn = pataconnectionmanager.getPataconnection();
            String query = "SELECT Service_Name, sp.ID as serviceproviderid,Name,Image_URL,Rating FROM service_providers_tbl sp INNER JOIN service_allocations_tbl sa ON sp.ID = sa.Service_provider_ID INNER JOIN service_types_tbl st ON sa.Service_ID = st.ID WHERE Service_ID LIKE ? AND Name LIKE ?";
            pstmt = conn.prepareStatement(query);
            pstmt.setString(1, serviceid);
            pstmt.setString(2, querystring+"%");
            rs=pstmt.executeQuery();
            while(rs.next())
            {
                PataBean patabean = new PataBean();
                patabean.setServicetype(rs.getString("Service_Name"));
                patabean.setId(rs.getInt("serviceproviderid"));
                patabean.setName(rs.getString("Name"));
                patabean.setImgurl(rs.getString("Image_URL"));
                patabean.setRating(rs.getFloat("Rating"));  
                results.add(patabean);
            }         
            
        
        }
        catch(Exception ex)
        {
            throw new Exception(ex);
        }
        finally
        {
            if (rs != null)	{
	            try {
	               rs.close();
	            } catch (Exception e) {}
	               rs = null;
	            }
		
	         if (pstmt != null) {
	            try {
	               pstmt.close();
	            } catch (Exception e) {}
	               
	            }
		
	         if (conn != null) {
	            try {
	               conn.close();
	            } catch (Exception e) {
	            }

	            conn = null;
	         }
        
        }
        
        
        return results;
        
    }
    
    
    
    
}
