define([
    "backbone",
    "marionette",
    "handlebars",
    "text!../templates/TracksPageLayoutTemplate.html"
], function(Backbone, Marionette, Handlebars, TracksPageLayoutTemplate) {

    var TracksPageLayout = Backbone.Marionette.Layout.extend({
        template : Handlebars.compile(TracksPageLayoutTemplate),
        className : "app-region",
        regions : {
            content : ".content"
        }
    });

    return TracksPageLayout;

});