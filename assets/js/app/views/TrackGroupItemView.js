define([
    "underscore",
    "backbone",
    "marionette",
    "text!../templates/TrackGroupItemTemplate.html"
], function(_, Backbone, Marionette, TrackGroupItemTemplate) {

    var TrackGroupItemView = Backbone.Marionette.ItemView.extend({

        tagName : 'li',
        className : 'item',

        template: _.template(TrackGroupItemTemplate),

        events : {
        },

    });

    return TrackGroupItemView;

});