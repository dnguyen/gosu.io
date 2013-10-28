define([
    "jquery",
    "backbone",
    "marionette",
    "handlebars",
    "../TrackGroupCollectionView",
    "text!../../templates/TracksPageLayoutTemplate.html"
], function($, Backbone, Marionette, Handlebars, TrackGroupCollectionView, TracksPageTemplate) {

    var TracksPageView = Backbone.Marionette.ItemView.extend({

        className : "app-region",
        template : Handlebars.compile(TracksPageTemplate),

        initialize : function() {

        },

        onRender : function() {
            var trackGroupCollectionView = new TrackGroupCollectionView({
                collection : this.model.get("tracksCollection"),
                size : 6
            });

            this.$el.find(".content .tracks-group-col").append(trackGroupCollectionView.render().$el);
        }

    });

    return TracksPageView;

});