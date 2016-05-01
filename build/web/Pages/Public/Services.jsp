<%-- 
    Document   : Services
    Created on : Dec 28, 2015, 10:56:24 AM
    Author     : Maxwell Irungu
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1">
        <c:import url="/Pages/Links/Links.jsp"></c:import>        
        <title>Pata! | Services</title>
        <script>
            /*navigator.geolocation.getCurrentPosition(function(position){
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                $("#userlatitude_hidden").val(latitude.toFixed(7));
                $("#userlongitude_hidden").val(longitude.toFixed(7));
                $("#srvlatitude_span").text(latitude.toFixed(7));
                $("#srvlongitude_span").text(longitude.toFixed(7));
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
            });*/
        </script>
        <script>
            $(document).ready(function(){                
                $.getScript("Js/pataperservice.js",function(){
                    //abc();
                    //alert($("#userlatitude_hidden").val());
                    loadinggif();
                    getLocation();
		});
                /*function loadservicepergeolocation()
                {
                    var serviceid = $("#serviceid_hidden").val();
                    var latitude = $("#userlatitude_hidden").val();
                    var longitude = $("#userlongitude_hidden").val();
                    
                    servicepergeoselection(serviceid,latitude,longitude);                    
                    //abc();
                } */
        $("#geosearch_btn").click(function(){
            var latitude = $("#srvlatitude_span").text();
            var longitude = $("#srvlongitude_span").text();  
            //alert(latitude);
             //initMap(parseFloat(latitude),parseFloat(longitude));

        });
                
                $("#srvtowns_select").on("change",function(){
                    var latitude = $("option:selected",this).data("town-lat");
                    var longitude = $("option:selected",this).data("town-lng");                    
                    //alert(latitude);
                    initMap(latitude,longitude);
                    //addmarkers();
                });
                
            });
            var map;
           
            
            function initMap(latitude,longitude) 
            {
                if(typeof latitude === 'undefined' && typeof longitude === 'undefined' )
                {
                    map = new google.maps.Map(document.getElementById('srvmaprender_div'), {
                        center: {lat:-1.2920659 , lng: 36.821945},
                        zoom: 12
                    });
                    drawRadius(-1.2920659,36.821945);
                    customMarker(-1.2920659,36.821945,map);
                     
                }
                else
                {
                    map = new google.maps.Map(document.getElementById('srvmaprender_div'), {
                        center: {lat: latitude , lng: longitude},
                        zoom: 12
                    });
                    drawRadius(latitude,longitude);
                    customMarker(latitude,longitude);
                    

                }
                function drawRadius(latitude,longitude)
                {
                    var coordinates = {lat:latitude ,lng:longitude};
                    var cityCircle = new google.maps.Circle({
                      strokeColor: '#FF0000',
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: '#FF0000',
                      fillOpacity: 0.35,
                      map: map,
                      center: coordinates ,
                      radius: 5000
                    });
                }
                //var image = {url:'Images/System/marker_map.png',size: new google.maps.Size(20, 32)};
                function customMarker(latitude,longitude)
                {
                    var image = 'Images/System/myposition.png';
                    var myPosition = new google.maps.Marker({
                    position: {lat: latitude, lng: longitude},
                    size: new google.maps.Size(20, 32),                    
                    map: map,
                    icon: image
                });

                    
                }
              
            }
            
        </script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC862Kq-uSPZo8b1IKSGIwOxsEtUemolhA&callback=initMap" async defer></script>


    </head>
    <body>
        <div id="header">
            <div class="container-fluid">
                <div><c:import url="/Pages/Links/NavLinks.jsp"></c:import></div>                
            </div>
        </div>
        <div id="allwrapper">
            <div id="maincontent">
                <div class="row te srvsearchoption_div">
                    <form>
                        <input type="hidden" id="userlatitude_hidden">
                        <input type="hidden" id="userlongitude_hidden">
                        <div class="col-md-6">
                            <select id="srvcountries_select" class="form-control srvlocation_select">
                                <option id="-1">Select Country</option>
                                <c:forEach var="row" items="${requestScope.countries}">
                                    <option id="<c:out value="${row.id}"></c:out>"><c:out value="${row.country}"></c:out></option>
                                </c:forEach>                                                        
                            </select>
                        </div>                    
                        <div class="col-md-6">
                            <select id="srvtowns_select" class="form-control srvlocation_select">
                                                        
                            </select>
                        </div>       
                        </form>
                </div>
                 <div class="row">                                         
                    <h1>Service: <c:out value="${requestScope.servicename}"></c:out><input type="hidden" id="serviceid_hidden" value="<c:out value="${param.typ}"></c:out>"/></h1>
                 <span class="srvcord_styler">Latitude:</span><span id="srvlatitude_span"></span> <span class="srvcord_styler">Longitude:</span> <span id="srvlongitude_span"></span>
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
                 <br>&nbsp;
                <div class="srvviewdetails_div row">                    
                    <div class="col-md-3 srvnearbylist_div">
                        <div class="row">
                            <span id="srvnearbytitle_span">Found <span id="srvresultsize_span"> </span> result(s) <span id="radiusdist_span">within 25 km</span></span>                            
                        </div>
                        <div id="srvnearbylistresults_div" class="row"></div>
                    </div>
                    <div class="col-md-9 srvmap_div">
                        <div id="srvmaprender_div" class="row">
                            <span id="srvnearbymap_span">Map</span>                            
                        </div>
                    </div>
                    
                </div>
            </div>
            <div id="footer">

            </div>
            
        </div>
    </body>
</html>
