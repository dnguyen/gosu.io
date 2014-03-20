/*global define,document,console*/
define([
    "marionette",
    "models/Client",
    "helpers/vent",
    "controllers/HeaderController",
    "controllers/PlayerController",
    "controllers/MainController",
    "controllers/AppController",
    "views/common/SidebarView"
], function(Marionette, Client, vent, HeaderController, PlayerController, MainController, AppController, SidebarView) {
    "use strict";

    var gosuApp = new Backbone.Marionette.Application();

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
            "apps/player/PlayerModule"
        ], function() {

            var PlayerModule = gosuApp.module("PlayerModule");
            PlayerModule.start();

            gosuApp.appController = new AppController();
            gosuApp.setUpAppEvents(vent, gosuApp.appController);

            var mainRouter = new gosuApp.Router({
                controller : MainController
            });

            if (Backbone.history) {
                Backbone.history.start();
            }

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

                gosuApp.appController.setup();
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
        vent.on("StartLoadingNewPage", appController.loadNewPage, this);
        vent.on("FinishedLoadingNewPage", appController.doneLoadingNewPage, this);
        vent.on("UpdateTitle", appController.updateTitle, this);
        vent.on("showHeader", appController.showHeader, this);
        vent.on("showTrackAddToMenu", appController.showAddToMenu, this);
        vent.on("showNewModal", appController.showNewModal, this);
        vent.on("renderPlayer", appController.renderPlayer, this);
    };

    return gosuApp;

});