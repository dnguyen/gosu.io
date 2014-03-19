/*global define,document,console*/
define([
    "marionette",
    "models/Client"
], function(Marionette, Client) {
    "use strict";

    //var gosuApp = namespace.app;
    var gosuApp = new Backbone.Marionette.Application();

    //gosuApp.Client = new ClientModel();

    gosuApp.addRegions({
        header : "#header",
        sidebar : "#sidebar",
        content : "#content",
        player : "#player",
        modals : ".modals"
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

    gosuApp.on("initialize:after", function() {
        require([
            "helpers/vent",
            "controllers/HeaderController",
            "controllers/PlayerController",
            "controllers/MainController",
            "layouts/MainPageLayout",
            "controllers/AppController",
            "views/common/SidebarView",
            "apps/player/PlayerModule"
        ], function(vent, HeaderController, PlayerController, MainController, MainPageLayout, AppController, SidebarView, PlayerModule) {

            gosuApp.appController = new AppController();
            gosuApp.setUpAppEvents(vent, gosuApp.appController);

            var mainRouter = new gosuApp.Router({
                controller : MainController
            });

            if (Backbone.history) {
                Backbone.history.start();
            }

            gosuApp.contentLayout = new MainPageLayout();
            var headerController = new HeaderController();
            var playerController = new PlayerController();

            // Verify authentication before rendering header, sidebar, and player
            $.when(
                Client.fetch({
                    data: $.param({ token: localStorage.getItem("token") })
                })
            ).then(function(data) {
                Client.set({
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
                Client.set({
                    "loggedin" : false
                });

                headerController.render();
                playerController.render();
                gosuApp.sidebar.show(new SidebarView());
            });
        });
    });

    gosuApp.addInitializer(function() {
        console.log("initialize");

    });

    // Setup global application events
    gosuApp.setUpAppEvents = function(vent, appController) {
        vent.on("StartLoadingNewPage", appController.loadNewPage);
        vent.on("FinishedLoadingNewPage", appController.doneLoadingNewPage);
        vent.on("UpdateTitle", appController.updateTitle);
        vent.on("showHeader", appController.showHeader);
        vent.on("showTrackAddToMenu", appController.showAddToMenu);
        vent.on("showNewModal", appController.showNewModal);
    };

    return gosuApp;

});