define([
    "backbone",
    "marionette",
    "handlebars",
    "text!../templates/TrackGroupItemTemplate.html"
], function(Backbone, Marionette, Handlebars, TrackGroupItemTemplate) {

    var TrackGroupItemView = Backbone.Marionette.ItemView.extend({

        tagName : 'li',
        className : 'item',

        template: Handlebars.compile(TrackGroupItemTemplate)

    });

    return TrackGroupItemView;

});