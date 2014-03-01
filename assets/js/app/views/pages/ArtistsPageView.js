define([
    "namespace",
    "marionette",
    "text!../../templates/ArtistsPageLayoutTemplate.html"
], function(namespace, Marionette, ArtistsPageLayoutTemplate) {

    var GosuApp = namespace.app;

    var ArtistsPageView = Backbone.Marionette.ItemView.extend({

    });

    return ArtistsPageView;
});