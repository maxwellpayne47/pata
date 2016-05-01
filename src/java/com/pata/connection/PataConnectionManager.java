/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pata.connection;
import java.sql.*;
import javax.naming.Context;
import javax.naming.InitialContext;

/**
 *
 * @author admin
 */
public class PataConnectionManager
{
    
    Connection conn;
    String url;
    
    
    public Connection getPataconnection() throws Exception
    {
        //url = "jdbc:mysql://localhost:3306/okoa";
        //url = "jdbc:mysql://mariadbinstance.c7oqa1uanuig.us-west-2.rds.amazonaws.com:3306/okoa";
        try
        {
            Context env = (Context)new InitialContext().lookup("java:comp/env");
            boolean awsdeploy = (boolean)env.lookup("awsdeploy");
            if(awsdeploy)
            {
                url = "jdbc:mysql://patamariadb.c7oqa1uanuig.us-west-2.rds.amazonaws.com:3306/pata";
                
            }
            else
            {
                url = "jdbc:mysql://localhost:3306/pata";               
            
            }
            Class.forName("com.mysql.jdbc.Driver");
            conn=DriverManager.getConnection(url, "pata", "pata@12345");            
        
        }
        catch(Exception ex)
        {
            throw new Exception(ex);
        
        }
        
        return conn;
    
    }
    
    
}
