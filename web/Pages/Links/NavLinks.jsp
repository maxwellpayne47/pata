<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>
<%@ taglib uri='http://java.sun.com/jsp/jstl/sql' prefix='sql'%>
<nav class="navbar navbar-inverse navbar-fixed-top">
    <a class="navbar-brand" href="${pageContext.request.contextPath}/">Pata!</a>
    <ul class="nav navbar-nav mainlinks-hover">         
        <li><a href="${pageContext.request.contextPath}/">Home <span class="glyphicon glyphicon-home"></span> </a></li>
        <li><a href="${pageContext.request.contextPath}/Profile.do?prm=prf">Profile <span class="glyphicon glyphicon-user"></span></a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true">Services  <span class="caret"></span></a>
          <ul class="dropdown-menu">
              <sql:setDataSource var="localhostconn" url="jdbc:mysql://localhost/pata" driver="com.mysql.jdbc.Driver" user="pata" password="pata@12345"></sql:setDataSource>
              <%--<sql:setDataSource var="localhostconn" url="jdbc:mysql://patamariadb.c7oqa1uanuig.us-west-2.rds.amazonaws.com:3306/pata" driver="com.mysql.jdbc.Driver" user="pata" password="pata@12345"></sql:setDataSource>--%>
              <sql:query var="servicetypes" sql="SELECT * FROM service_types_tbl" dataSource="${localhostconn}"></sql:query>
              <c:forEach var="services" items="${servicetypes.rows}">
                  <li><a href="${pageContext.request.contextPath}/ServiceProvider.do?prm=gsrv&typ=<c:out value="${services.ID}"></c:out>"><c:out value="${services.Service_Name}"></c:out></a></li>
            </c:forEach>
          </ul>
        </li>        
        <li><a href="#">N10 <span class="glyphicon glyphicon-globe"></span></a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true">Admin <span class="glyphicon glyphicon-cog"></span></a>
          <ul class="dropdown-menu">
            <li><a href="${pageContext.request.contextPath}/ServiceProvider.do?prm=nsp">New Service Provider</a></li>
            <li><a href="#">Manage Service providers</a></li>            
          </ul>
        </li>
        <li><a href="${pageContext.request.contextPath}/Pages/Public/About.jsp">About Pata! </a></li>
    </ul>
    <form class="navbar-form navbar-left" role="search">
        <div class="input-group">
            <div class="input-group-btn">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-th-list"></span> <span class="caret"></span></button>
                <ul class="dropdown-menu">
                    <li><a href="#"><span class="servicenameli_span" id="-1">all</span></a></li>
                    <c:forEach var="services" items="${servicetypes.rows}">
                        <li><a href="#"><span class="servicenameli_span" id="<c:out value="${services.ID}"></c:out>"><c:out value="${services.Service_Name}"></c:out></span></a></li>
                    </c:forEach> 
                    <li role="separator" class="divider"></li>
                    <li><a href="${pageContext.request.contextPath}/Search.do?prm=adv">Advanced Search</a></li>
                </ul>
            </div>
            <input type="text" size="40" id="placeholder_id" class="form-control" placeholder="Search for all services...">
             <span class="input-group-btn">
                <button class="btn btn-default" type="button">Go!</button>
            </span>
        </div>
    </form>
</nav>
                <div id="searchresults_div">
                    <div id="innersearchresults_div">
                        
                    </div>
                   
                </div>
<html/>
                