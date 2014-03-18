/*global define,document,console*/
define([
    "marionette",
    "namespace",
    "models/Client",
    "controllers/HeaderController",
    "controllers/PlayerController",
    "layouts/MainPageLayout",
    "controllers/MainController",
    "views/common/SidebarView",
    "views/common/LoadingIcon",
    "views/common/AddToMenuView"
], function(Marionette, namespace, ClientModel, PlayerController, HeaderController, MainPageLayout, MainController, SidebarView, LoadingIconView, AddToMenuView) {
    "use strict";

    var gosuApp = namespace.app;

    // Cache any data that was fetched from the server.
    // TODO: evict caches that haven't been accessed recently.
    gosuApp.GlobalCache = new Backbone.Model();
    gosuApp.Client = new ClientModel();

    gosuApp.vent.on("StartLoadingNewPage", function(data) {
        gosuApp.vent.trigger("UpdateTitle", data.title ? data.title : null);

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

    // Updates document title
    gosuApp.vent.on("UpdateTitle", function(title) {
        document.title = title ? title + " – " + namespace.config.title : namespace.config.title;
    });

    gosuApp.vent.on("showTrackAddToMenu", function(data) {
        $(".AddToMenu").remove();
        var newAddToMenuView = new AddToMenuView({ model : data.model });

        $("body").append(newAddToMenuView.render().el);
        $(".AddToMenu").css({
            "left" : ($(data.event.target).offset().left - 10) + "px",
            "top" : ($(data.event.target).offset().top - 15) + "px"
        });

        // Close the menu if we click anywhere outside of the AddToMenu element.
        $(document).click(function(e) {
            if ($(e.target).closest('.AddToMenu').length == 0) {
                $(".AddToMenu").remove();
                $(document).unbind("click");
            }
        });
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
            "track/:id/*name" : "singleTrackPage",
            "artists/:page?*query" : "artistsPage",
            "artists/:page" : "artistsPage",
            "artists" : "artistsPage"
        }
    });

    gosuApp.addRegions({
        header : "#header",
        sidebar : "#sidebar",
        content : "#content",
        player : "#player",
        modals : ".modals"
    });

    gosuApp.on("initialize:after", function() {
        console.log("after initialize");
        if (Backbone.history) {
            Backbone.history.start();
        }

        var headerController = new HeaderController();
        var playerController = new PlayerController();

        // Verify authentication before rendering header, sidebar, and player
        $.when(
            gosuApp.Client.fetch({
                data: $.param({ token: localStorage.getItem("token") })
            })
        ).then(function(data) {
            gosuApp.Client.set({
                "loggedin" : true,
                "id" : data.id,
                "username" : data.username,
                "token" : data.token
            });

            headerController.render();
            playerController.render();
            gosuApp.sidebar.show(new SidebarView());

        })
        .fail(function(data) {
            gosuApp.Client.set({
                "loggedin" : false
            });

            headerController.render();
            playerController.render();
            gosuApp.sidebar.show(new SidebarView());
        });
    });

    gosuApp.addInitializer(function() {
        console.log("initialize");

        var mainRouter = new gosuApp.Router({
            controller : MainController
        });

        gosuApp.contentLayout = new MainPageLayout();


    });

    return gosuApp;

});