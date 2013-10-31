define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "../TrackGroupCollectionView",
    "text!../../templates/TracksPageLayoutTemplate.html",
    "semantic.dropdown"
], function($, _, Backbone, Marionette, TrackGroupCollectionView, TracksPageTemplate, SemanticDropdown) {

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

            var that = this;

            this.$el.find("#sort-dropdown").dropdown({
                onChange : function(value, text) {
                    console.log("sort dropdown changed");
                    that.applySort(value);
                }
            });

            this.$el.find("#order-dropdown").dropdown({
                onChange : function(value, text) {
                    that.applyOrder(value);
                }
            });
        },

        applySort : function(value) {
            window.location = "#/tracks/" + this.model.get("page") + "?sort=" + value + "&order=" + this.model.get("orderBy");
        },

        applyOrder : function(value) {
            window.location = "#/tracks/" + this.model.get("page") + "?sort=" + this.model.get("sortType") + "&order=" + value;
        }

    });

    return TracksPageView;

});