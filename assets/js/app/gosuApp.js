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
    "views/common/SidebarView",
    "views/common/LoadingIcon"
], function($, Backbone, Marionette, namespace, foundation, ExploreApp, Handlebars, HeaderController, MainPageLayout, MainController, SidebarView, LoadingIconView) {
    "use strict";

    var gosuApp = namespace.app;

    Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
        return Handlebars.compile(rawTemplate);
    };

    // TODO: Move handlebars helpers somewhere else...
    Handlebars.registerHelper('ifCond', function (v1, operator, v2, opts) {
        var isTrue = false;
        switch (operator) {
            case '===':
                isTrue = v1 === v2;
                break;
            case '!==':
                isTrue = v1 !== v2;
                break;
            case '<':
                isTrue = v1 < v2;
                break;
            case '<=':
                isTrue = v1 <= v2;
                break;
            case '>':
                isTrue = v1 > v2;
                break;
            case '>=':
                isTrue = v1 >= v2;
                break;
            case '||':
                isTrue = v1 || v2;
                break;
            case '&&':
                isTrue = v1 && v2;
                break;
        }
        return isTrue ? opts.fn(this) : opts.inverse(this);
    });

    Handlebars.registerHelper('math', function(v1, operator, v2) {
        var returnVal;
        v1 = parseInt(v1, 10);
        v2 = parseInt(v2, 10);

        switch (operator) {
            case '-':
                returnVal = v1 - v2;
                break;
            case '+':
                returnVal = v1 + v2;
                break;
        }

        return returnVal;

    });

    // Cache any data that was fetched from the server.
    gosuApp.GlobalCache = new Backbone.Model();

    gosuApp.vent.on("StartLoadingNewPage", function() {
        gosuApp.loadingIconView = new LoadingIconView();
        $("#content").html("");
        $("#content").append(gosuApp.loadingIconView.render().el);
    });

    gosuApp.vent.on("FinishedLoadingNewPage", function() {
        gosuApp.loadingIconView.close();
    });

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