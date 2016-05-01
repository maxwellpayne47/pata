/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function(){   
    
    /*Start of global settings*/
    //$(".prflocation_select").prop("disabled",true); 
    //$(".srvlocation_select").prop("disabled",true);
    var img = '<img src="Images/System/ajax-loader.gif" width="25" height="25">';
    
    /*End of global settings*/
    
    /*Start of Functions*/
    
   
                 
    
    function loadtowns(countryid,elementid) 
    {
        $(elementid).html("");
        $.post("Profile.do",{param:"gettowns",countryid:countryid},function(data){
            
           if(!$.isEmptyObject(data))
           {
               var html="";
               var len = data.length;
               for(var i=0;i<len;i++)
               {
                    var town = [data[i].town];
                    var townid = [data[i].id];
                    var latitude = [data[i].latitude];
                    var longitude = [data[i].longitude];
                    html+="<option data-town-lat="+latitude+" data-town-lng="+longitude+" id="+townid+">"+town+"</option>";
               }
               $(elementid).append("<option id=\"-1\">Select a Town/City</option>").show();
               $(elementid).append(html).show();
           }
           if($.isEmptyObject(data))
           {
               alert("No Towns/Cities found for this country");
           }
            
        },'json').fail(function(xhr, status, error){
          alert("An AJAX error occured: " + status + "\nError: " + error); 
        });
    }
    
    function serviceproviderdetails(serviceproviderid,latitude,longitude)
    {
        $(".prvdetails_span").html("");
        var loaderhtml = "<div class=\"row\"><div class=\"col-md-12 text-center\">"+img+"</div></div>";
        $(".prvdetails_span").append(loaderhtml);
        $.post("ServiceProvider.do",{param:"prvdetails",serviceproviderid:serviceproviderid,latitude:latitude,longitude:longitude},function(data){
            if(!$.isEmptyObject(data))
            {
                var len = data.length;
                for(var i = 0; i<len; i++)
                {
                    var name = [data[i].name];
                    var telephone = [data[i].telephone];
                    var rating = [data[i].rating];
                    var imgurl = [data[i].imgurl];
                    //var latitude = [data[i].latitude];
                    //var longitude = [data[i].longitude];
                    var address = [data[i].address];
                    var distance = [data[i].distance];
                    
                    
                    var starwidth = rating*16;
                    var rateitemul = "<button id=\"rateit-reset-2\" class=\"rateit-reset\" aria-controls=\"rateit-range-2\" aria-label=\"reset rating\" data-role=\"none\" type=\"button\" style=\"display: none;\"></button><span id=\"rateit-range-2\" class=\"rateit-range\" aria-valuenow="+rating+" aria-valuemax=\"5\" aria-valuemin=\"0\" aria-owns=\"rateit-reset-2\" aria-label=\"rating\" role=\"slider\" tabindex=\"0\" style=\"width: 80px; height: 16px;\" aria-readonly=\"true\"><span class=\"rateit-selected rateit-preset\" style=\"height: 16px; width: "+starwidth+"px;\"></span><span class=\"rateit-hover\" style=\"height:16px\"></span></span>";
                    var rate = "<span class=\"rateit\" data-rateit-readonly=\"true\" data-rateit-ispreset=\"true\" data-rateit-value="+rating+">"+rateitemul+"</span>";
                    $("#prvdetailsname_span").text(name);
                    $("#prvdetailsnumber_span").text(telephone);
                    $("#prvdetailsaddress_span").text(address);
                    $("#prvdetailsrating_div").html(rate);
                    $("#prvdetailsimgurl_span").html(imgurl);
                    $("#prvdetailsdistance_span").text(distance);
                    //html += "<div class=\"row prv_details\"><div class=\"col-md-6\"><a data-prv-lat="+latitude+" data-prv-lng="+longitude+" href=\"#\">"+name+"</a></div><div class=\"col-md-6\"><span class=\"rateit\" data-rateit-readonly=\"true\" data-rateit-ispreset=\"true\" data-rateit-value="+rating+">"+rateitemul+"</span></div></div>";
                    
                }
            }
            if($.isEmptyObject(data))
           {
               
               alert("failed to get data for id "+serviceproviderid);
           }
        },"json").fail(function(xhr, status, error){
          alert("An AJAX error occured: " + status + "\nError: " + error); 
        });
        
        
    }
    
    
    
    
    
    /*End of Functions*/
    
    
    $("#serviceprovider_savedetails").click(function(){
        //alert('save')
        var name = $("#serviceprovider_name").val();
        var number = $("#serviceprovider_telephone").val();
        var address = $("#serviceprovider_address").val();
        var country = $("#serviceprovider_country option:selected").val();
        var town = $("#serviceprovider_town option:selected").text();
        var servicetype = $("#serviceprovider_type option:selected").val();
        var latitude = $("#serviceprovider_latitude").val();
        var longitude = $("#serviceprovider_longitude").val();
        //save to db
        
        $.post("ServiceProvider.do",{param:"nsp",name:name,number:number,address:address,country:country,town:town,servicetype:servicetype,latitude:latitude,longitude:longitude},function(data){
            if(data)
            {
                alert(data);
                //location.reload()
            }
            
        },"json");
        
    });
    
    $("[name=viewoption]").click(function(){
        //alert("asdc");
        //var values = 
        if($(this).val()=="geolocation")
        {
            $(".prflocation_select").prop("disabled",true);
            $(".srvlocation_select").prop("disabled",true);
            
        }
        else
        {
            $(".prflocation_select").prop("disabled",false);
            $(".srvlocation_select").prop("disabled",false);
            
            
        }
    });
    
    $("#prfcountries_select").on("change",function(){
        var countryid = $("option:selected",this).attr("id");
        loadtowns(countryid,"#prftowns_select");
        //alert(countryid);
    });
    $("#srvcountries_select").on("change",function(){
        var countryid = $("option:selected",this).attr("id");
        loadtowns(countryid,"#srvtowns_select");
        //alert(countryid);
    });
    
    function displayprvpopup(serviceproviderid)
    {
         
        $("#darkscreen").toggle();
        $("#prvdetails-popup_div").toggle();
        var display = $("#prvdetails-popup_div").is(":visible");        
        if(display===true)
        {
            var selectedoption = $("#searchmode_hidden").val();
            
            if(selectedoption==="geolocsearch_li")
            {
                var latitude = $("#prf-latitude_span").text();
                var longitude = $("#prf-longitude_span").text();                 
                serviceproviderdetails(serviceproviderid,latitude,longitude);
            }
            if(selectedoption==="townsearch_li")
            {
                var latitude = $("#prftowns_select option:selected").data("town-lat");
                var longitude = $("#prftowns_select option:selected").data("town-lng");                
                serviceproviderdetails(serviceproviderid,latitude,longitude);             
                
            }
            
            
        }
        if(display===false)
        {
            $(".prvdetails_span").html("");
            $("#prvdetailsrating_div").html("");
        }
        
        
    }
    
    $(document).on("click",".prvname_span",function(){        
        var serviceproviderid = $(this).attr("id");
        /*$("#darkscreen").css({display:"block"});
        $("#prvdetails-popup_div").css({display:"block"});*/
        displayprvpopup(serviceproviderid);
        //alert(serviceproviderid);
    });
    $(document).on("click","#prvdetails-popupclose_link",function(){
        displayprvpopup();
    });
    
    $(document).on("click",".servicenameli_span",function(){
        var id = $(this).text();
        //alert(id);
        $("#placeholder_id").attr("placeholder","").val("Search for "+id+" services...");
    });
    
    $("#placeholder_id").on("focus",function(){
        //alert("tchamasi");
        $("#placeholder_id").attr("placeholder","").val("");
    });
    $("#placeholder_id").on("focusout",function(){
        //alert("tchamasi");
        $("#searchresults_div").css({"display":"none"});
    });
    
    var serviceid = -1;
    $(document).on("click",".servicenameli_span",function(){
        serviceid = $(this).attr("id");        
        return serviceid;
    });
 
    $("#placeholder_id").keyup(function () {
        $("#searchresults_div").show();
        $("#innersearchresults_div").html("");
        var loaderhtml = "<div class=\"row\"><div class=\"col-md-12 text-center\">"+img+"</div></div>";
        
        $("#innersearchresults_div").append(loaderhtml).show();        
        typewatch(function () {           
          var querystring = $("#placeholder_id").val();           
          if(serviceid == -1)
          {
              serviceid = "%";
          }
          
          $.post("Search.do",{param:"instasearch",serviceid:serviceid,querystring:querystring},function(data)
            {
                if(!$.isEmptyObject(data))
                {
                    var len = data.length;
                    var html = "";
                    
                    for(i=0;i<len;i++)
                    {
                        var name = [data[i].name];
                        var id = [data[i].id];
                        var servicetype = [data[i].servicetype];
                        var imageurl = [data[i].imgurl];
                        var rating = [data[i].rating];
                        var starwidth = rating*16;
                        var rateitemul = "<button id=\"rateit-reset-2\" class=\"rateit-reset\" aria-controls=\"rateit-range-2\" aria-label=\"reset rating\" data-role=\"none\" type=\"button\" style=\"display: none;\"></button><span id=\"rateit-range-2\" class=\"rateit-range\" aria-valuenow="+rating+" aria-valuemax=\"5\" aria-valuemin=\"0\" aria-owns=\"rateit-reset-2\" aria-label=\"rating\" role=\"slider\" tabindex=\"0\" style=\"width: 80px; height: 16px;\" aria-readonly=\"true\"><span class=\"rateit-selected rateit-preset\" style=\"height: 16px; width: "+starwidth+"px;\"></span><span class=\"rateit-hover\" style=\"height:16px\"></span></span>";
                        
                        html += "<div class=\"row\">"+
                                "<div class=\"col-lg-3\"><span class=\"vcenter\" id=\"searchresults_servicetype_span\">"+servicetype+"</span></div>"+
                                "<div class=\"col-lg-3\"><img src="+imageurl+" width=\"60\" height=\"60\" class=\"img-circle\"/></div>"+
                                "<div class=\"col-lg-6\"><a href=\"ServiceProvider.do?prm=vsrv&id="+id+"\"><span id=\"searchresults_providername_span\">"+name+"</span></a><br><span class=\"rateit\" data-rateit-readonly=\"true\" data-rateit-ispreset=\"true\" data-rateit-value="+rating+">"+rateitemul+"</span></div>"+
                                "</div>";
                    }
                    $("#innersearchresults_div").html("");
                    $("#innersearchresults_div").append(html);
                    
                }                
                else
                {
                    $("#innersearchresults_div").html("");
                    $("#innersearchresults_div").append("Sorry no results available");
                }
                
                
            },"json").fail(function(xhr, status, error){
          alert("An AJAX error occured: " + status + "\nError: " + error);
          }); 
        }, 1000);      
    });
    /*search timer heart*/
    var typewatch = (function(){
    var timer = 0;
    return function(callback, ms){        
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();
  /*end of search timer heart*/
    
    
});


