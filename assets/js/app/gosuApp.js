/*global define,document,console*/
define([
    "marionette",
    "namespace",
    "models/Client",
    "controllers/HeaderController",
    "controllers/PlayerController",
    "layouts/MainPageLayout",
    "controllers/MainController",
    "controllers/AppController",
    "views/common/SidebarView",
], function(Marionette, namespace, ClientModel, HeaderController, PlayerController, MainPageLayout, MainController, AppController, SidebarView) {
    "use strict";

    var gosuApp = namespace.app;

    // Cache any data that was fetched from the server.
    // TODO: evict caches that haven't been accessed recently.
    gosuApp.GlobalCache = new Backbone.Model();
    gosuApp.Client = new ClientModel();
    gosuApp.appController = new AppController();

    // Setup global application events
    gosuApp.vent.on("StartLoadingNewPage", gosuApp.appController.loadNewPage);
    gosuApp.vent.on("FinishedLoadingNewPage", gosuApp.appController.doneLoadingNewPage);
    gosuApp.vent.on("UpdateTitle", gosuApp.appController.updateTitle);
    gosuApp.vent.on("showTrackAddToMenu", gosuApp.appController.showAddToMenu);

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