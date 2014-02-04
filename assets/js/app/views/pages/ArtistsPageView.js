define([
    "namespace",
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "text!../../templates/ArtistsPageLayoutTemplate.html"
], function(namespace, $, _, Backbone, Marionette, ArtistsPageLayoutTemplate) {

    var GosuApp = namespace.app;

    var ArtistsPageView = Backbone.Marionette.ItemView.extend({

    });

    return ArtistsPageView;
});