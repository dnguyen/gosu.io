define([
    "jquery",
    "backbone",
    "marionette",
    "namespace",
    "foundation",
    "apps/explore/explore_app",
    "handlebars",
    "controllers/HeaderController",
    "layouts/MainPageLayout",
    "controllers/MainController",
    "views/common/SidebarView"
], function($, Backbone, Marionette, namespace, foundation, ExploreApp, Handlebars, HeaderController, MainPageLayout, MainController, SidebarView) {
    "use strict";

    var gosuApp = namespace.app;

    Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
        return Handlebars.compile(rawTemplate);
    };

    // Cache any data that was fetched from the server.
    gosuApp.GlobalCache = new Backbone.Model();

    gosuApp.switchPage = function() {};

    gosuApp.Router = Backbone.Marionette.AppRouter.extend( {
        appRoutes: {
            "" : "mainPage",
            "tracks/:page?*query" : "tracksPage",
            "tracks/:page" : "tracksPage",
            "tracks" : "tracksPage"
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

        gosuApp.contentLayout = new MainPageLayout();

        var headerController = new HeaderController();
        headerController.render();

        gosuApp.sidebar.show(new SidebarView());

        new gosuApp.Router({
            controller : MainController
        });

        $(document).foundation();

    });

    return gosuApp;

});