<%-- 
    Document   : NewServiceProvider
    Created on : Dec 5, 2015, 9:13:46 AM
    Author     : admin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <c:import url="/Pages/Links/Links.jsp"></c:import>
        <title>Pata! | New Service Provider</title>
        
        <script t0ype="text/javascript">
                var latitude=0;
                var longitude=0;        
            $(document).ready(function(){
                
                function geo_error() {
                    alert("Sorry, no position available.");
                  }
                var geo_options = {
                    enableHighaAccuracy: true, 
                    maximumAge        : 30000, 
                    timeout           : 27000
                  };
                navigator.geolocation.getCurrentPosition(function(position) {
                  
                    latitude = position.coords.latitude;
                    longitude = position.coords.longitude;
                    $("#serviceprovider_longitude").val(longitude);
                    $("#serviceprovider_latitude").val(latitude);
                  },geo_error,geo_options); 
                  
                $("#serviceprovider_loadmap").on("click",function(){
                        loadmap(); 
                     });
              });
             
            function loadmap()
            {
               //alert('loading map'); 
                var map;                
                    function initMap() {
                    map = new google.maps.Map(document.getElementById('googlemaps_providerlocation'), {
                      
                    center: {lat: parseFloat($("#serviceprovider_latitude").val()), lng: parseFloat($("#serviceprovider_longitude").val())},
                    zoom: 15
                        });
                        }
            }
                   
            var map;                
                    function initMap() {
                    map = new google.maps.Map(document.getElementById('googlemaps_providerlocation'), {
                      
                    center: {lat: 3.453889, lng: -76.533227},
                    zoom: 15
                        });
                        }
                </script>
                
                <script async defer
                  asrc="https://maps.googleapis.com/maps/api/js?key=AIzaSyC862Kq-uSPZo8b1IKSGIwOxsEtUemolhA&callback=initMap">
            </script> 

    </head>
    <body>
        <div id="header">
                <div class="container-fluid">
                    <div><c:import url="/Pages/Links/NavLinks.jsp"></c:import></div>                
                </div>
         </div>
        <div id="allwrapper">
            
            <div id="maincontent">
                <h2>New Service Provider</h2>
                <form class="form-horizontal col-sm-7">
                    <div class="form-group">
                        <label for="serviceprovider_name" class="col-sm-5 control-label">Company Name</label>
                        <div class="col-sm-5">
                          <input type="text" class="form-control" id="serviceprovider_name" placeholder="Name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="serviceprovider_telephone" class="col-sm-5 control-label">Telephone Number</label>
                        <div class="col-sm-5">
                          <input type="text" class="form-control" id="serviceprovider_telephone" placeholder="Phone Number">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="serviceprovider_address" class="col-sm-5 control-label">Address</label>
                        <div class="col-sm-5">
                            <textarea class="form-control" rows="3" id="serviceprovider_address" placeholder="Address"></textarea>
                        </div>
                    </div>                    
                    <div class="form-group">
                        <label for="serviceprovider_country" class="col-sm-5 control-label">Country</label>
                        <div class="col-sm-5">
                            <select id="serviceprovider_country" class="form-control">
                            <c:forEach var="row" items="${requestScope.countries}">
                                <option value="<c:out value="${row.id}"></c:out>"><c:out value="${row.country}"></c:out></option>
                                
                            </c:forEach>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="serviceprovider_town" class="col-sm-5 control-label">Town\City</label>
                        <div class="col-sm-5">
                            <select id="serviceprovider_town" class="form-control">
                                <option>Nairobi</option>
                                <option>Thika</option>
                                <option>Kisumu</option>
                                <option>Mombasa</option>
                            </select>
                        </div>
                    </div>
                     <div class="form-group">
                        <label for="serviceprovider_type" class="col-sm-5 control-label">Service Type</label>
                        <div class="col-sm-5">
                            <select id="serviceprovider_type" class="form-control">
                            <c:forEach var="row" items="${requestScope.servicetypes}">                                
                                <option value="<c:out value="${row.id}"></c:out>"><c:out value="${row.servicetype}"></c:out></option>
                            </c:forEach>
                                
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="serviceprovider_latitude" class="col-sm-5 control-label">Latitude</label>
                        <div class="col-sm-5">
                          <input type="text" class="form-control" id="serviceprovider_latitude" placeholder="Latitude">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="serviceprovider_longitude" class="col-sm-5 control-label">Longitude</label>
                        <div class="col-sm-5">
                          <input type="text" class="form-control" id="serviceprovider_longitude" placeholder="Longitude">
                        </div>
                    </div> 
                    <div class="form-group">
                        <div class="col-sm-offset-5 col-sm-10">
                            <button type="button" id="serviceprovider_loadmap" class="btn btn-info">Load Map</button>
                            <button type="button" id="serviceprovider_savedetails" class="btn btn-primary">Save</button>
                        </div></div>
                        
                        
                </form>               
                <div id="googlemaps_providerlocation">
                    
                </div>


            </div>
            <div id="footer">

            </div>
        
    </div>
    </body>
</html>