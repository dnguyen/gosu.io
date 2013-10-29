define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "../TrackGroupCollectionView",
    "text!../../templates/TracksPageLayoutTemplate.html"
], function($, _, Backbone, Marionette, TrackGroupCollectionView, TracksPageTemplate) {

    var TracksPageView = Backbone.Marionette.ItemView.extend({

        className : "app-region",
        template : _.template(TracksPageTemplate),

        initialize : function() {

        },

        onRender : function() {
            // After rendering entire layout, start rendering the tracks
            var trackGroupCollectionView = new TrackGroupCollectionView({
                collection : this.model.get("tracksCollection"),
                size : 6
            });

            this.$el.find(".content .tracks-group-col").append(trackGroupCollectionView.render().$el);
        }

    });

    return TracksPageView;

});