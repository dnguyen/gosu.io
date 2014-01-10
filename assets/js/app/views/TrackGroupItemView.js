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
            var that = this;
            // If thumbnail doesn't already have an overlay, append an overlay.
            if ($(e.currentTarget).find(".overlay").length <= 0) {
                $(e.currentTarget).append('<a href="#/track/' + that.model.get("id") + '/' + that.model.get("title") + '" ><div class="overlay"><div class="nav"><button>Listen</button><button>+</button></div></div></a>');
            }
        },

        // Remove any overlay when not hovering over the thumbnail
        thumbnailLeaveHover : function(e) {
            $(e.currentTarget).find(".overlay").remove();
        }

    });

    return TrackGroupItemView;

});