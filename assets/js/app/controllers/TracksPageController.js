define([
    "namespace",
    "jquery",
    "backbone",
    "marionette",
    "../layouts/TracksPageLayout"
], function(namespace, $, Backbone, Marionette, TracksPageLayout) {

    var GosuApp = namespace.app;

    var TracksPageController = function(options) {

    };

    TracksPageController.prototype.render = function() {
        GosuApp.contentLayout = new TracksPageLayout();
        GosuApp.content.show(GosuApp.contentLayout);
    };

    return TracksPageController;

});