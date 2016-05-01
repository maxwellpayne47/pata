/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pata.web;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.pata.dao.PataDAO;
import java.util.List;

/**
 *
 * @author Maxwell Irungu
 */
@WebServlet(name = "ProfileServlet", urlPatterns = {"/Profile.do"})
public class ProfileServlet extends HttpServlet {
    PataDAO patadao = new PataDAO();

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
            out.println("<title>Servlet ProfileServlet</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ProfileServlet at " + request.getContextPath() + "</h1>");
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
            if(param.equals("prf"))
            {
                List countries = patadao.getCountries();                
                request.setAttribute("countries", countries);                    
                RequestDispatcher dispatch = request.getRequestDispatcher("/Pages/Public/Profile.jsp");
                dispatch.forward(request, response);
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
        
        try
        {
            String parameter = request.getParameter("param");
            if(parameter.equals("gettowns"))
            {
                int countryid = Integer.parseInt(request.getParameter("countryid"));
                List towns = patadao.getTowns(countryid);
                String jsonmsg = gson.toJson(towns);
                write.println(jsonmsg);
            }
            if(parameter.equals("servicesperselection"))
            {
                int townid = Integer.parseInt(request.getParameter("townid"));
                int serviceid = Integer.parseInt(request.getParameter("serviceid"));
                List serviceproviders = patadao.servicesPerSelection(serviceid, townid);
                String jsonmsg = gson.toJson(serviceproviders);
                write.println(jsonmsg); 
            }
            
            
        
        }
        catch(Exception ex)
        {
            //throw new ServletException(ex);
            String jsnmsg = gson.toJson(ex.toString());
            write.println(jsnmsg);
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
