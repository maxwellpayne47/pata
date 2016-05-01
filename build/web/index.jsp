<%-- 
    Document   : index
    Created on : 28-Nov-2015, 09:11:21
    Author     : admin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="Css/one-page-wonder.css" rel="stylesheet">
        <c:import url="/Pages/Links/Links.jsp"></c:import>        
        <title>Pata! | Home</title>
    </head>
    <body>
        <div id="header">
            <div class="container-fluid">
                <div><c:import url="/Pages/Links/NavLinks.jsp"></c:import></div>                
            </div>
        </div>
        <div id="allwrapper">
            <!--<div id="maincontent"></div>-->
                <header class="header-image">
        <div class="headline">
            <div class="container">
                <!--<h1>oKoa!</h1>
                <h2>Committed to save the world! </h2>-->
            </div>
        </div>
    </header>

    <!-- Page Content -->
    <div class="container">

        <hr class="featurette-divider">

        <!-- First Featurette -->
        <div class="featurette" id="about">
            <img class="featurette-image img-circle img-responsive pull-right" src="http://placehold.it/500x500">
            <h2 class="featurette-heading">Pata! to your rescue
                <span class="text-muted orangify">Opening up the world of emergency services</span>
            </h2>
            <p class="lead">The Pata! application will give data on all emergency services located near you. Never will you have to suffer explosive diarrohea when there is a nearby clinic for you to visit. A dragon burning up the village? Get the details of the nearest fire station using the app.</p>
        </div>

        <hr class="featurette-divider">

        <!-- Second Featurette -->
        <div class="featurette" id="services">
            <img class="featurette-image img-circle img-responsive pull-left" src="http://placehold.it/500x500">
            <h2 class="featurette-heading">N10
                <span class="text-muted orangify">Know thy neighbour..</span>
            </h2>
            <p class="lead">An exclusive feature on the mobile app, Pata! can quickly alert your friends and loved ones about your whereabouts in case of an emergency with a click of a button.</p>
        </div>

        <hr class="featurette-divider">

        <!-- Third Featurette -->
        <div class="featurette" id="contact">
            <img class="featurette-image img-circle img-responsive pull-right" src="http://placehold.it/500x500">
            <h2 class="featurette-heading">Unity is Strength
                <span class="text-muted orangify">Pata! and essential services</span>
            </h2>
            <p class="lead">Pata! partners with other service providers to provide you with essential services. Honey badger attacked your vehicle? How about looking up for the nearest breakdown service near you? And perhaps call the army too... animal control won't cut it.</p>
        </div>

        <hr class="featurette-divider">

        <!-- Footer -->
        <footer>
            <div class="row">
                <div class="col-lg-12">
                    <p>Copyright &copy; Pata! <script>document.write(new Date().getFullYear());</script></p>
                </div>
            </div>
        </footer>

    </div>

            
            <div id="footer">

            </div>
            
        </div>
    </body>
</html>
