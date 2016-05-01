/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var img = '<img src="Images/System/ajax-loader.gif" width="25" height="25">';
var img2 = '<img src="Images/System/299.gif" nwidth="25" nheight="25">';
$("#userlatitude_hidden").text("0");
$("#userlongitude_hidden").text("0");
function enablegeosearchbtn()
{
    $("#geosearch_btn").removeClass("btn-default btn-danger").addClass("btn btn-success");
    $("#geosearch_btn").prop("disabled",false);
    
}
function warngeosearchbtn()
{
    $("#geosearch_btn").removeClass("btn-default btn-success").addClass("btn btn-danger");
    $("#geosearch_btn").prop("disabled",true);
    
}

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
            break;
        case error.TIMEOUT:
            alert( "The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}









function loadinggif()
{
    var loaderhtml = "<div class=\"row\"><div class=\"col-md-12 text-center\">"+img2+"</div></div>";
    $("#srvnearbylistresults_div").append(loaderhtml);
}

function serviceperselection(townid,serviceid)
    {  
        //var rateitemul = "<button id=\"rateit-reset-2\" class=\"rateit-reset\" aria-controls=\"rateit-range-2\" aria-label=\"reset rating\" data-role=\"none\" type=\"button\" style=\"display: none;\"></button><span id=\"rateit-range-2\" class=\"rateit-range\" aria-valuenow=\"1.1\" aria-valuemax=\"5\" aria-valuemin=\"0\" aria-owns=\"rateit-reset-2\" aria-label=\"rating\" role=\"slider\" tabindex=\"0\" style=\"width: 80px; height: 16px;\" aria-readonly=\"true\"><span class=\"rateit-selected rateit-preset\" style=\"height: 16px; width: 17.6px;\"></span><span class=\"rateit-hover\" style=\"height:16px\"></span></span>";
        
        //var townid = $("#prftowns_select option:selected").attr("id");
        //var serviceid=1;
        //alert(townid);
        
        $("#srvnearbylistresults_div").html("");
        $("#srvresultsize_span").text("0");
        var loaderhtml = "<div class=\"row\"><div class=\"col-md-12 text-center\">"+img+"</div></div>";
        $("#srvnearbylistresults_div").append(loaderhtml);
        $.post("Profile.do",{param:"servicesperselection",townid:townid,serviceid:serviceid},function(data){
            if(!$.isEmptyObject(data))
            {
                var html = "";                
                var len = data.length;
                for(var i = 0; i<len; i++)
                {
                    var name = [data[i].name];
                    var rating = [data[i].rating];
                    var latitude = [data[i].latitude];
                    var longitude = [data[i].longitude];
                    
                    var starwidth = rating*16;
                    var rateitemul = "<button id=\"rateit-reset-2\" class=\"rateit-reset\" aria-controls=\"rateit-range-2\" aria-label=\"reset rating\" data-role=\"none\" type=\"button\" style=\"display: none;\"></button><span id=\"rateit-range-2\" class=\"rateit-range\" aria-valuenow="+rating+" aria-valuemax=\"5\" aria-valuemin=\"0\" aria-owns=\"rateit-reset-2\" aria-label=\"rating\" role=\"slider\" tabindex=\"0\" style=\"width: 80px; height: 16px;\" aria-readonly=\"true\"><span class=\"rateit-selected rateit-preset\" style=\"height: 16px; width: "+starwidth+"px;\"></span><span class=\"rateit-hover\" style=\"height:16px\"></span></span>";
        
                    html += "<div class=\"row prv_details\"><div class=\"col-md-6\"><a data-prv-lat="+latitude+" data-prv-lng="+longitude+" href=\"#\">"+name+"</a></div><div class=\"col-md-6\"><span class=\"rateit\" data-rateit-readonly=\"true\" data-rateit-ispreset=\"true\" data-rateit-value="+rating+">"+rateitemul+"</span></div></div>";
                    addmarkers(name.toString(),latitude,longitude);
                }
                $("#srvresultsize_span").text(len);
                $("#srvnearbylistresults_div").html("");
                $("#srvnearbylistresults_div").append(html);
                
                //all_prvdetails(data);
            }
            if($.isEmptyObject(data))
           {
               
               var html="";
               html += "<div class=\"row\"><div class=\"col-md-12\">No services found</div></div>";
               $("#srvnearbylistresults_div").html("");
               $("#srvnearbylistresults_div").append(html);
           }
        },"json").fail(function(xhr, status, error){
          alert("An AJAX error occured: " + status + "\nError: " + error); 
        });      
        
    }

function servicepergeoselection(serviceid,latitude,longitude)
    {  
        //var rateitemul = "<button id=\"rateit-reset-2\" class=\"rateit-reset\" aria-controls=\"rateit-range-2\" aria-label=\"reset rating\" data-role=\"none\" type=\"button\" style=\"display: none;\"></button><span id=\"rateit-range-2\" class=\"rateit-range\" aria-valuenow=\"1.1\" aria-valuemax=\"5\" aria-valuemin=\"0\" aria-owns=\"rateit-reset-2\" aria-label=\"rating\" role=\"slider\" tabindex=\"0\" style=\"width: 80px; height: 16px;\" aria-readonly=\"true\"><span class=\"rateit-selected rateit-preset\" style=\"height: 16px; width: 17.6px;\"></span><span class=\"rateit-hover\" style=\"height:16px\"></span></span>";
        
        //var townid = $("#prftowns_select option:selected").attr("id");
        //var serviceid=1;
        //alert(townid);
        
        $("#srvnearbylistresults_div").html("");
        $("#srvresultsize_span").text("0");
        var loaderhtml = "<div class=\"row\"><div class=\"col-md-12 text-center\">"+img+"</div></div>";
        $("#srvnearbylistresults_div").append(loaderhtml);
        $.post("Search.do",{param:"servicespergeolocation",serviceid:serviceid,latitude:latitude,longitude:longitude},function(data){
            if(!$.isEmptyObject(data))
            {
                var html = ""; 
                
                var len = data.length;
                for(var i = 0; i<len; i++)
                {
                    var name = [data[i].name];
                    var rating = [data[i].rating];
                    var latitude = [data[i].latitude];
                    var longitude = [data[i].longitude];
                    var telephone = [data[i].telephone];                   
                    var address = [data[i].address];
                    var distance = [data[i].distance];
                    
                    var starwidth = rating*16;
                    var rateitemul = "<button id=\"rateit-reset-2\" class=\"rateit-reset\" aria-controls=\"rateit-range-2\" aria-label=\"reset rating\" data-role=\"none\" type=\"button\" style=\"display: none;\"></button><span id=\"rateit-range-2\" class=\"rateit-range\" aria-valuenow="+rating+" aria-valuemax=\"5\" aria-valuemin=\"0\" aria-owns=\"rateit-reset-2\" aria-label=\"rating\" role=\"slider\" tabindex=\"0\" style=\"width: 80px; height: 16px;\" aria-readonly=\"true\"><span class=\"rateit-selected rateit-preset\" style=\"height: 16px; width: "+starwidth+"px;\"></span><span class=\"rateit-hover\" style=\"height:16px\"></span></span>";
        
                    html += "<div class=\"row prv_details\"><div class=\"col-md-6\"><a data-prv-lat="+latitude+" data-prv-lng="+longitude+" href=\"#\">"+name+"</a></div><div class=\"col-md-6\"><span class=\"rateit\" data-rateit-readonly=\"true\" data-rateit-ispreset=\"true\" data-rateit-value="+rating+">"+rateitemul+"</span></div></div>";
                    addmarkers(name.toString(),latitude,longitude,telephone,address,distance);
                }
                $("#srvresultsize_span").text(len);
                $("#srvnearbylistresults_div").html("");
                $("#srvnearbylistresults_div").append(html);
                
                //all_prvdetails(data);
            }
            if($.isEmptyObject(data))
           {
               
               var html="";
               html += "<div class=\"row\"><div class=\"col-md-12\">No services found</div></div>";
               $("#srvnearbylistresults_div").html("");
               $("#srvnearbylistresults_div").append(html);
           }
        },"json").fail(function(xhr, status, error){
          alert("An AJAX error occured: " + status + "\nError: " + error); 
        });;       
        
    }

$("#srvtowns_select").on("change",function(){
    
    var townid = $("option:selected",this).attr("id");
    var serviceid = $("#serviceid_hidden").val();
    //alert(serviceid+"-"+townid);
    
    serviceperselection(townid,serviceid);
    
});

function all_prvdetails(data)
{    
    //var all_prvdata=[];
        
    alert(data);
    
}
function addmarkers(name,latitude,longitude,telephone,address,distance)
{
    var myLatlng = new google.maps.LatLng(latitude,longitude);
    var mapOptions = {
      zoom: 15,
      center: myLatlng
    }
    
    //map = new google.maps.Map(document.getElementById("srvmaprender_div"), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        title:name
    });
    var infowindow = new google.maps.InfoWindow({
                    content: popupinfwin(name,telephone,address,distance),
                    maxWidth: 300
                    });
    
    marker.addListener('click', function() {
    infowindow.open(map, marker);
    });
    

    // To add the marker to the map, call setMap();
    marker.setMap(map);

}

$("[name=viewoption]").click(function(){
        
    if($(this).val()=="geolocation")
    {
        var serviceid = $("#serviceid_hidden").val();
        var latitude = $("#userlatitude_hidden").val();
        var longitude = $("#userlongitude_hidden").val();
        var myLatlng = new google.maps.LatLng(latitude,longitude);
        var mapOptions = {
          zoom: 15,
          center: myLatlng
        }
        map = new google.maps.Map(document.getElementById("srvmaprender_div"), mapOptions);        
        servicepergeoselection(serviceid,latitude,longitude); 
        customMarker(latitude,longitude);

    }                    
});
function popupinfwin(name,telephone,address,distance)
{
    var popupinfwin="<div class=\"panel zpanel-default\">"+
                    "<div class=\"panel-heading\">"+                        
                        "<h3 class=\"panel-title\"><span id=\"prvdetailsname_span\">"+name+"</span> </h3>"+                        
                    "</div>"+
                    "<div class=\"panel-body\">"+
                        "<div class=\"row text-center\">"+
                            "<img src=\"/pata/Images/User/userx/Profile/shaka-zulu.jpg\" width=\"100\" class=\"img-rounded\">"+                                    
                        "</div>"+                       
                        "<div class=\"row\">"+
                            "<div class=\"col-xs-6 titleprf\">Phone Number</div>"+
                            "<div class=\"col-xs-6\"><span class=\"prvdetails_span\" id=\"prvdetailsnumber_span\">"+telephone+"</span></div>"+
                        "</div>"+
                        "<div class=\"row\">"+
                            "<div class=\"col-xs-6 titleprf\">Address</div>"+
                            "<div class=\"col-xs-6\"><span class=\"prvdetails_span\" id=\"prvdetailsaddress_span\">"+address+"</span></div>"+
                        "</div>"+
                        "<div class=\"row\">"+
                            "<div class=\"col-xs-6 titleprf\">Rating</div>"+
                            "<div class=\"col-xs-6\" id=\"prvdetailsrating_div\"><!--<span class=\"prvdetails_span\" id=\"prvdetailsrating_span\">5 from n reviews</span>--> </div>"+
                        "</div>"+
                        "<div class=\"row\">"+
                            "<div class=\"col-xs-6 titleprf\">Distance</div>"+
                            "<div class=\"col-xs-6\"><span class=\"prvdetails_span\" id=\"prvdetailsdistance_span\">"+distance+"</span></div>"+
                        "</div>"+
                    "</div>"+
                "</div>"+
             "</div>";
     return popupinfwin;
}
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

$("#geosearch_btn").click(function(){
    var latitude = $("#srvlatitude_span").text();
    var longitude = $("#srvlongitude_span").text();
    var serviceid = $("#serviceid_hidden").val();
   // initMap(parseFloat(latitude),parseFloat(longitude));
    servicepergeoselection(serviceid,latitude,longitude);
    
});
$("#geolocsearch_li").click(function(){
    var latitude = $("#srvlatitude_span").text();
    var longitude = $("#srvlongitude_span").text();
    $("#searchmode_hidden").val("geolocsearch_li");
    
    if(latitude==0&&longitude==0)
    {
        warngeosearchbtn();
        var text = "Can't GeoSearch";
        $("#geosearch_btn").text(text); 
        $(".srvsearchoption_div").hide();
    }
    else
    {
        var text = "Search - GeoLocation";
        $("#geosearch_btn").text(text); 
        enablegeosearchbtn();
        $(".srvsearchoption_div").hide();
    }  
});
$("#townsearch_li").click(function(){
    var text = "Search - Town/City";
    $("#searchmode_hidden").val("townsearch_li");
    $("#geosearch_btn").text(text); 
    enablegeosearchbtn();
    $("#geosearch_btn").prop("disabled",true);
    $(".srvsearchoption_div").show();
});
