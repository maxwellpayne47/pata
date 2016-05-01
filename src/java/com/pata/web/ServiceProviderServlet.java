/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pata.web;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.pata.dao.PataDAO;
import java.util.List;
import javax.servlet.RequestDispatcher;


/**
 *
 * @author admin
 */
@WebServlet(name = "ServiceProviderServlet", urlPatterns = {"/ServiceProvider.do"})
public class ServiceProviderServlet extends HttpServlet {
    PataDAO okoadao = new PataDAO();
    
    

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet ServiceProviderServlet</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ServiceProviderServlet at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
       try
            { 
                String param = request.getParameter("prm");
        
                if(param.equals("nsp"))
                {

                    List serviceproviders = okoadao.getServiceTypes();
                    List countries = okoadao.getCountries();
                    request.setAttribute("servicetypes", serviceproviders);
                    request.setAttribute("countries", countries);
                    RequestDispatcher dispatch = request.getRequestDispatcher("Pages/Admin/NewServiceProvider.jsp");
                    dispatch.forward(request, response);
                }
                if(param.equals("gsrv"))
                {
                    int servicetype = Integer.parseInt(request.getParameter("typ"));                                       
                    String servicename = okoadao.getServicename(servicetype);
                    List countries = okoadao.getCountries();                
                    request.setAttribute("countries", countries);
                    request.setAttribute("servicename", servicename);
                    RequestDispatcher dispatch = request.getRequestDispatcher("Pages/Public/Services.jsp");
                    dispatch.forward(request, response);
                    
                }
                
                else
                {
                    
                }


            }
       catch(Exception ex)
            {
               throw new ServletException(ex); 
            }
        
       
        
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        Gson gson = new Gson();
        PrintWriter write = response.getWriter();
        String param = request.getParameter("param");
        
        if(param.equals("nsp"))
        {
            try
            {
                String name = request.getParameter("name");
                String number = request.getParameter("number");
                String address = request.getParameter("address");
                int country = Integer.parseInt(request.getParameter("country"));
                int town = Integer.parseInt(request.getParameter("town"));
                int servicetype = Integer.parseInt(request.getParameter("servicetype"));
                float latitude = Float.parseFloat(request.getParameter("latitude"));
                float longitude = Float.parseFloat(request.getParameter("longitude"));
                
                String jsondata = okoadao.createServiceProvider(name, number, address, country, town, servicetype, latitude, longitude);
                
                String jsonmsg = gson.toJson(jsondata);
                write.println(jsonmsg);
            
            }
            catch(Exception ex)
            {
                //throw new ServletException(ex);
                String jsnmsg = gson.toJson(ex.toString());
                write.println(jsnmsg);
                
            }
                
        
        }
        if(param.equals("prvdetails"))
            {
                try
                {
                    int serviceproviderid = Integer.parseInt(request.getParameter("serviceproviderid"));
                    float latitude = Float.parseFloat(request.getParameter("latitude"));
                    float longitude = Float.parseFloat(request.getParameter("longitude"));
                    List details = okoadao.serviceProviderdetails(serviceproviderid, latitude, longitude);
                    String jsonmsg = gson.toJson(details);
                    write.println(jsonmsg);
                    
                }
                catch(Exception ex)
                {
                    String jsnmsg = gson.toJson(ex.toString());
                    write.println(jsnmsg);
                    
                }
                
            }
        
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
