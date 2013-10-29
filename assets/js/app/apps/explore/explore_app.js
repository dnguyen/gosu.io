define([
    "namespace",
    "backbone",
    "marionette",
    "jquery",
    "underscore",
    "../../views/common/HeaderView",
    "../../views/common/SidebarView"
], function(namespace, Backbone, Marionette, $, _, HeaderView, SidebarView) {

    var GosuApp = namespace.app;

    GosuApp.module("ExploreApp", function(ExploreApp, GosuApp, Backbone, Marionette, $, _) {

        // Explore App will route to tracks, artists, playlists, search, etc.
        ExploreApp.Router = Marionette.AppRouter.extend({
            "explore" : "main",
            "tracks" : "tracks"
        });

        // Explore controller
        // Will create views and render regions of GosuApp
        var API = {
            main : function() {
                console.log("api main");
            },

            tracks : function() {
                console.log("api tracks");
            }
        };

        ExploreApp.on("start", function() {
            console.log("ExploreApp started");
        });

        GosuApp.on("explore:main", function() {
            console.log("explore:main");
            API.main();
        });

        GosuApp.addInitializer(function() {
            new ExploreApp.Router({
                controller : API
            });
        });
    });

    return GosuApp.ExploreApp;
});