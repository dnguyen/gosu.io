define([
    "namespace",
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "../TrackGroupCollectionView",
    "text!../../templates/TracksPageLayoutTemplate.html",
    "semantic.dropdown"
], function(namespace, $, _, Backbone, Marionette, TrackGroupCollectionView, TracksPageTemplate, SemanticDropdown) {

    var GosuApp = namespace.app;

    var TracksPageView = Backbone.Marionette.ItemView.extend({

        className : "app-region",
        template : _.template(TracksPageTemplate),

        events : {
            "keypress #filter-input" : "filterKeyPress",
            "click .filter-remove" : "filterRemove"
        },

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

            // Create sort dropdown
            this.$el.find("#sort-dropdown").dropdown({
                onChange : function(value, text) {
                    that.applySort(value);
                }
            });

            // Create order dropdown
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
        },

        filterKeyPress : function(e) {
            // If enter key is entered while filter input box is focused, do a filter.
            if (e.which === 13) {
                var searchTerms = $("#filter-input").val();
                GosuApp.vent.trigger("tracks:doFilter", { searchTerms : searchTerms });
            }
        },

        filterRemove : function(e) {
            GosuApp.vent.trigger("tracks:removeFilter");
        }

    });

    return TracksPageView;

});