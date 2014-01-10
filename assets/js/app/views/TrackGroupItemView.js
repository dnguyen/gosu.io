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
            "mouseover .thumb" : "thumbnailHover",
            "mouseleave .thumb" : "thumbnailLeaveHover"
        },

        // Display overlay navigation over thumbnail when hovering over the thumbnail
        thumbnailHover : function(e) {
            // If thumbnail doesn't already have an overlay, append an overlay.
            if ($(e.currentTarget).find(".overlay").length <= 0) {
                $(e.currentTarget).append('<div class="overlay"><ul class="nav"><li><a href="#">L</a></li><li><a href="#">+</a></li></ul></div>');
            }
        },

        // Remove any overlay when not hovering over the thumbnail
        thumbnailLeaveHover : function(e) {
            $(e.currentTarget).find(".overlay").remove();
        }

    });

    return TrackGroupItemView;

});