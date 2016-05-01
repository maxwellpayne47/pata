/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$("#prf-latitude_span").text("0");
$("#prf-longitude_span").text("0");  
$("#searchmode_hidden").val("geolocsearch_li");

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

$("#prftowns_select").on("change",function(){
    
    var townid = $("option:selected",this).attr("id");
    
    servicesperselection("#policebodyprofile_div",townid,2); //police
    servicesperselection("#ambulancebodyprofile_div",townid,3); //ambulance
    servicesperselection("#breakdownbodyprofile_div",townid,1); //breakdown
        
});


var img = '<img src="Images/System/ajax-loader.gif" width="25" height="25">';

function servicesperselection(divid,townid,serviceid)
    {  
        //var rateitemul = "<button id=\"rateit-reset-2\" class=\"rateit-reset\" aria-controls=\"rateit-range-2\" aria-label=\"reset rating\" data-role=\"none\" type=\"button\" style=\"display: none;\"></button><span id=\"rateit-range-2\" class=\"rateit-range\" aria-valuenow=\"1.1\" aria-valuemax=\"5\" aria-valuemin=\"0\" aria-owns=\"rateit-reset-2\" aria-label=\"rating\" role=\"slider\" tabindex=\"0\" style=\"width: 80px; height: 16px;\" aria-readonly=\"true\"><span class=\"rateit-selected rateit-preset\" style=\"height: 16px; width: 17.6px;\"></span><span class=\"rateit-hover\" style=\"height:16px\"></span></span>";
        
        //var townid = $("#prftowns_select option:selected").attr("id");
        //var serviceid=1;
        //alert(townid);
        
        //load police station details
        $(divid).html("");
        var loaderhtml = "<div class=\"row\"><div class=\"col-md-12 text-center\">"+img+"</div></div>";
        $(divid).append(loaderhtml);
        $.post("Profile.do",{param:"servicesperselection",townid:townid,serviceid:serviceid},function(data){
            if(!$.isEmptyObject(data))
            {
                var html = "";
                var len = data.length;
                for(var i = 0; i<len; i++)
                {
                    var id = [data[i].id];
                    var name = [data[i].name];
                    var rating = [data[i].rating];
                    var starwidth = rating*16;
                    var rateitemul = "<button id=\"rateit-reset-2\" class=\"rateit-reset\" aria-controls=\"rateit-range-2\" aria-label=\"reset rating\" data-role=\"none\" type=\"button\" style=\"display: none;\"></button><span id=\"rateit-range-2\" class=\"rateit-range\" aria-valuenow="+rating+" aria-valuemax=\"5\" aria-valuemin=\"0\" aria-owns=\"rateit-reset-2\" aria-label=\"rating\" role=\"slider\" tabindex=\"0\" style=\"width: 80px; height: 16px;\" aria-readonly=\"true\"><span class=\"rateit-selected rateit-preset\" style=\"height: 16px; width: "+starwidth+"px;\"></span><span class=\"rateit-hover\" style=\"height:16px\"></span></span>";
        
                    html += "<div class=\"row\"><div class=\"col-md-6\"><a href=\"#\"><span class=\"prvname_span\" id="+id+">"+name+"</span></a></div><div class=\"col-md-6\"><span class=\"rateit\" data-rateit-readonly=\"true\" data-rateit-ispreset=\"true\" data-rateit-value="+rating+">"+rateitemul+"</span></div></div>";
                }
                $(divid).html("");
                $(divid).append(html);
            }
            if($.isEmptyObject(data))
           {
               
               var html="";
               html += "<div class=\"row\"><div class=\"col-md-12 text-center\">No services found</div></div>";
               $(divid).html("");
               $(divid).append(html);
           }
        },"json").fail(function(xhr, status, error){
          alert("An AJAX error occured: " + status + "\nError: " + error); 
        });;
       
        
    }
    
function loadservicespergeolocation_pageload(latitude,longitude)
    {
        servicespergeoselection("#policebodyprofile_div",2,latitude,longitude); //police
        servicespergeoselection("#ambulancebodyprofile_div",3,latitude,longitude); //ambulance
        servicespergeoselection("#breakdownbodyprofile_div",1,latitude,longitude); //breakdown

    }
function servicespergeoselection(divid,serviceid,latitude,longitude)
{      

    $(divid).html("");
    var loaderhtml = "<div class=\"row\"><div class=\"col-md-12 text-center\">"+img+"</div></div>";
    $(divid).append(loaderhtml);
    $.post("Search.do",{param:"servicespergeolocation",serviceid:serviceid,latitude:latitude,longitude:longitude},function(data){
        if(!$.isEmptyObject(data))
        {
            var html = "";
            var len = data.length;
            for(var i = 0; i<len; i++)
            {
                var id = [data[i].id];
                var name = [data[i].name];
                var rating = [data[i].rating];
                var starwidth = rating*16;
                var rateitemul = "<button id=\"rateit-reset-2\" class=\"rateit-reset\" aria-controls=\"rateit-range-2\" aria-label=\"reset rating\" data-role=\"none\" type=\"button\" style=\"display: none;\"></button><span id=\"rateit-range-2\" class=\"rateit-range\" aria-valuenow="+rating+" aria-valuemax=\"5\" aria-valuemin=\"0\" aria-owns=\"rateit-reset-2\" aria-label=\"rating\" role=\"slider\" tabindex=\"0\" style=\"width: 80px; height: 16px;\" aria-readonly=\"true\"><span class=\"rateit-selected rateit-preset\" style=\"height: 16px; width: "+starwidth+"px;\"></span><span class=\"rateit-hover\" style=\"height:16px\"></span></span>";

                html += "<div class=\"row\"><div class=\"col-md-6\"><a href=\"#\"><span class=\"prvname_span\" id="+id+">"+name+"</span></a></div><div class=\"col-md-6\"><span class=\"rateit\" data-rateit-readonly=\"true\" data-rateit-ispreset=\"true\" data-rateit-value="+rating+">"+rateitemul+"</span></div></div>";
            }
            $(divid).html("");
            $(divid).append(html);
        }
        if($.isEmptyObject(data))
       {

           var html="";
           html += "<div class=\"row\"><div class=\"col-md-12 text-center\">No services found</div></div>";
           $(divid).html("");
           $(divid).append(html);
       }
    },"json").fail(function(xhr, status, error){
      alert("An AJAX error occured: " + status + "\nError: " + error); 
    });;


}
$("[name=viewoption]").click(function(){
        
    if($(this).val()=="geolocation")
    {        
        var latitude = $("#prf-latitude_span").text();
        var longitude = $("#prf-longitude_span").text();
        loadservicespergeolocation_pageload(latitude,longitude);

    }                    
});
$("#geosearch_btn").click(function(){
    var latitude = $("#prf-latitude_span").text();
    var longitude = $("#prf-longitude_span").text();
    loadservicespergeolocation_pageload(latitude,longitude);
    
});
$("#geolocsearch_li").click(function(){
    var latitude = $("#prf-latitude_span").text();
    var longitude = $("#prf-longitude_span").text();
    $("#searchmode_hidden").val("geolocsearch_li");
    if(latitude==0&&longitude==0)
    {
        warngeosearchbtn();
        var text = "Can't GeoSearch";
        $("#geosearch_btn").text(text); 
        $(".prfsearchoption_div").hide();
    }
    else
    {
        var text = "Search - GeoLocation";
        $("#geosearch_btn").text(text); 
        enablegeosearchbtn();
        $(".prfsearchoption_div").hide();
    }  
});
$("#townsearch_li").click(function(){
    var text = "Search - Town/City";
    $("#searchmode_hidden").val("townsearch_li");
    $("#geosearch_btn").text(text); 
    enablegeosearchbtn();
    $("#geosearch_btn").prop("disabled",true);
    $(".prfsearchoption_div").show();
});


