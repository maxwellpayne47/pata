<%-- 
    Document   : Profile
    Created on : Dec 28, 2015, 4:45:24 PM
    Author     : Maxwell Irungu
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <c:import url="/Pages/Links/Links.jsp"></c:import>        
        <title>Pata! | Profile</title>
        <script>
            $.getScript("Js/pataprofile.js",function(){
                     
            });
                    
            function getLocation() 
            {
                if (navigator.geolocation) 
                {
                    navigator.geolocation.getCurrentPosition(showPosition, showError);
                } 
                else 
                { 
                    alert("Geolocation is not supported by this browser.");
                }
            }
            function showPosition(position)
            {
                var latitude, longitude=0;
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                $("#prf-latitude_span").text(latitude.toFixed(7));
                $("#prf-longitude_span").text(longitude.toFixed(7));
                 if(latitude==0&&longitude==0)
                         {
                             var retry = confirm("No location data yet. Try again?");
                             if(retry==true)
                             {
                                 //alert("trying");
                                 getLocation();
                             }
                             else
                            {
                                alert("Failed to get location data");
                            }
                             //getLocation();
                             
                         }
                         else
                         {
                             enablegeosearchbtn();                             
                             //loadservicespergeolocation_pageload(latitude,longitude);
                             
                         }
                
                
                
                
            }
            function showError(error) 
            {
                switch(error.code) 
                {
                    case error.PERMISSION_DENIED:
                        alert("User denied the request for Geolocation.");
                        $("#geosearch_btn").text("Can't GeoSearch");   
                        warngeosearchbtn(); 
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("Location information is unavailable.");
                        $("#geosearch_btn").text("Can't GeoSearch");   
                        warngeosearchbtn(); 
                        break;
                    case error.TIMEOUT:
                        alert( "The request to get user location timed out.");
                        $("#geosearch_btn").text("Can't GeoSearch");   
                        warngeosearchbtn(); 
                        break;
                    case error.UNKNOWN_ERROR:
                        alert("An unknown error occurred.");
                        $("#geosearch_btn").text("Can't GeoSearch");   
                        warngeosearchbtn(); 
                        break;
                }
            }
            getLocation();
            //navigator.geolocation.getCurrentPosition(function(position,error){
                /*var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                $("#prf-latitude_span").text(latitude.toFixed(7));
                $("#prf-longitude_span").text(longitude.toFixed(7));*/
            //});
            
        </script>
        <script>
            $(document).ready(function(){
                 /*$.getScript("Js/pataprofile.js",function(){
                     
                 });
                     setTimeout(function()
                     {
                         var latitude, longitude = 0;
                         //latitude = $("#prf-latitude_span").text();
                         //longitude = $("#prf-longitude_span").text();
                         if(latitude==0&&longitude==0)
                         {
                             var retry = confirm("No location data yet. Try again?");
                             if(retry==true)
                             {
                                 //alert("trying");
                                 getLocation();
                             }
                             else
                            {
                                alert("Failed to get location data");
                            }
                             //getLocation();
                             
                         }
                         else
                         {
                             
                             //loadservicespergeolocation_pageload(latitude,longitude);
                             
                         }
                         
                         //loadservicespergeolocation_pageload(latitude,longitude);
                     },3000);*/
                     //getcoordinates();
                
            });
           
        </script>
    </head>
    <body>
         <body>
             <div id="darkscreen"></div>
             <div id="prvdetails-popup_div"> 
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <a href="#" id="prvdetails-popupclose_link">Close <span class="glyphicon glyphicon-remove-circle"></span></a>
                        <h3 class="panel-title"><span id="prvdetailsname_span"></span> </h3>
                        
                    </div>
                    <div class="panel-body">
                        <div class="row text-center">
                            <img src="${pageContext.request.contextPath}/Images/User/userx/Profile/shaka-zulu.jpg" width="100" class="img-circle">                                    
                        </div>                        
                        <div class="row">
                            <div class="col-xs-6 titleprf">Phone Number</div>
                            <div class="col-xs-6"><span class="prvdetails_span" id="prvdetailsnumber_span"></span></div>
                        </div>
                        <div class="row">
                            <div class="col-xs-6 titleprf">Address</div>
                            <div class="col-xs-6"><span class="prvdetails_span" id="prvdetailsaddress_span"></span></div>
                        </div>
                        <div class="row">
                            <div class="col-xs-6 titleprf">Rating</div>
                            <div class="col-xs-6" id="prvdetailsrating_div"><!--<span class="prvdetails_span" id="prvdetailsrating_span">5 from n reviews</span>--> </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-6 titleprf">Distance</div>
                            <div class="col-xs-6"><span class="prvdetails_span" id="prvdetailsdistance_span"></span></div>
                        </div>
                    </div>
                </div>
             </div>
        <div id="header">
            <div class="container-fluid">
                <div><c:import url="/Pages/Links/NavLinks.jsp"></c:import></div>                
            </div>
        </div>
        <div id="allwrapper">
            <div id="maincontent">
                <div class="row tea prfsearchoption_div">
                    <form>                        
                       <div class="col-md-6">
                            <select id="prfcountries_select" class="form-control prflocation_select">
                                <option id="-1">Select Country</option>
                                <c:forEach var="row" items="${requestScope.countries}">
                                    <option id="<c:out value="${row.id}"></c:out>"><c:out value="${row.country}"></c:out></option>
                                </c:forEach>                                                        
                            </select>
                        </div>                    
                        <div class="col-md-6">
                            <select id="prftowns_select" class="form-control prflocation_select">
                                                        
                            </select>
                        </div> 
                    </form>
                </div>
                <h1>My Profile</h1>
                <div class="row">
                    <div class="col-md-3">
                        <div class="panel panel-success">
                            <div class="panel-heading">                                
                                Profile <span class="glyphicon glyphicon-user"></span>
                            </div>
                            <div class="panel-body">
                                <div class="row text-center">
                                    <img src="${pageContext.request.contextPath}/Images/User/userx/Profile/shaka-zulu.jpg" width="100" class="img-circle">                                    
                                </div>
                                <div class="row text-center">
                                    <h1>Anon Ymous</h1>                                    
                                </div> 
                                <div class="row">
                                    <div class="col-xs-6 titleprf">Phone Number</div>
                                    <div class="col-xs-6">+2547XX123456</div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-6 titleprf">IMEI Number</div>
                                    <div class="col-xs-6">357246059085XXX</div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-6 titleprf">Latitude</div>
                                    <div class="col-xs-6"><span id="prf-latitude_span"></span></div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-6 titleprf">Longitude</div>
                                    <div class="col-xs-6"><span id="prf-longitude_span"></span></div>
                                </div>
                                <div class="row text-center">
                                    <div class="btn-group">
                                        <button id="geosearch_btn" type="button" disabled="disabled" class="btn btn-default">Search - GeoLocation</button>
                                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span class="caret"></span>
                                            <span class="sr-only">Toggle Dropdown</span>
                                        </button>
                                        <ul id="togglesearchmode_ul" class="dropdown-menu">
                                            <li id="geolocsearch_li"><a href="#">Search by GeoLocation</a></li>
                                            <li id="townsearch_li"><a href="#">Search by Town/City</a></li>                                            
                                        </ul>
                                        <input type="hidden" id="searchmode_hidden" value=""/>
                                    </div>
                                                                       
                                </div> 
                                
                            </div>
                        </div>
                    
                    </div>
                    <div class="col-md-3">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                Police Stations <span></span>
                            </div>
                            <div id="policebodyprofile_div" class="panel-body"></div>
                        </div>
                       
                    </div>
                    <div class="col-md-3">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                Ambulance Services <span></span>
                            </div>
                            <div id="ambulancebodyprofile_div" class="panel-body"></div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                Break Down Services <span></span>
                            </div>
                            <div id="breakdownbodyprofile_div" class="panel-body"></div>
                        </div>
                    </div>
                </div>

            </div>
            <div id="footer">

            </div>
            
        </div>
    </body>
</html>
