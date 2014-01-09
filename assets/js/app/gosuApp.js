define([
    "jquery",
    "backbone",
    "marionette",
    "namespace",
    "modernizr",
    "foundation",
    "controllers/HeaderController",
    "layouts/MainPageLayout",
    "controllers/MainController",
    "views/common/SidebarView",
    "views/common/LoadingIcon"
], function($, Backbone, Marionette, namespace, modernizr, foundation, HeaderController, MainPageLayout, MainController, SidebarView, LoadingIconView) {
    "use strict";

    var gosuApp = namespace.app;

    // Cache any data that was fetched from the server.
    gosuApp.GlobalCache = new Backbone.Model();

    gosuApp.vent.on("StartLoadingNewPage", function(data) {
        // Add blue indicator to sidebar link for current page
        $(".navigation").children().removeClass("selected");
        $("#" + data.page +"-nav-item").addClass("selected");

        // Show the loading icon
        gosuApp.loadingIconView = new LoadingIconView();
        $("#content").html("");
        $("#content").append(gosuApp.loadingIconView.render().el);
    });

    gosuApp.vent.on("FinishedLoadingNewPage", function(data) {
        gosuApp.loadingIconView.close();
    });

    gosuApp.Router = Backbone.Marionette.AppRouter.extend( {
        appRoutes: {
            "" : "mainPage",
            "signin" : "login",
            "register" : "register",
            "tracks/:page?*query" : "tracksPage",
            "tracks/:page" : "tracksPage",
            "tracks" : "tracksPage",
            "track" : "singleTrackPage",
            "track/:id" : "singleTrackPage",
            "track/:id/*name" : "singleTrackPage"
        }
    });

    gosuApp.addRegions({
        header : "#header",
        sidebar : "#sidebar",
        content : "#content",
        footer : " #footer"
    });

    gosuApp.on("initialize:after", function() {
        console.log("after initialize");
        if (Backbone.history) {
            Backbone.history.start();
        }
    });

    gosuApp.addInitializer(function() {
        console.log("initialize");

        var headerController = new HeaderController();
        headerController.render();

        gosuApp.sidebar.show(new SidebarView());

        gosuApp.contentLayout = new MainPageLayout();

        new gosuApp.Router({
            controller : MainController
        });

        $(document).foundation(function(response) {
            console.log(response.errors);
        });

    });

    return gosuApp;

});