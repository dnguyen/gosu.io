define([
    "underscore",
    "backbone",
    "marionette",
    "text!../templates/TracksPageLayoutTemplate.html"
], function(_, Backbone, Marionette, TracksPageLayoutTemplate) {

    var TracksPageLayout = Backbone.Marionette.Layout.extend({
        template : _.template(TracksPageLayoutTemplate),
        className : "app-region uk-animation-slide-left",
        regions : {
            content : ".content"
        }
    });

    return TracksPageLayout;

});