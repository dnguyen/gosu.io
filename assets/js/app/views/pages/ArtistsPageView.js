define([
    "helpers/vent",
    "marionette",
    "../ArtistsGroupCompositeView",
    "text!../../templates/ArtistsPageLayoutTemplate.html"
], function(vent, Marionette, ArtistsGroupCompositeView, ArtistsPageLayoutTemplate) {

    var ArtistsPageView = Backbone.Marionette.ItemView.extend({
        className: "app-region uk-animation-slide-left",
        template: _.template(ArtistsPageLayoutTemplate),
        events : {
            "keypress #filter-input" : "filterKeyPress",
            "click .Remove" : "filterRemove",
            "click .Filter" : "addFilter",
            "change #sort-dropdown" : "applySort",
            "change #order-dropdown" : "applyOrder",
            "click .ThumbView" : "switchToThumbView",
            "click .ListView" : "switchToListView"
        },

        initialize : function() {

        },

        onRender : function() {
            console.log(this.model.get('artistsCollection'));
            if (localStorage.getItem("artistsPage:renderType") === null) {
                localStorage.setItem("artistsPage:renderType", "thumb");
            }

            var trackGroupCollectionView = new ArtistsGroupCompositeView({
                collection : this.model.get("artistsCollection"),
                renderType : localStorage.getItem("artistsPage:renderType")
            });

            this.$el.find(".content").append(trackGroupCollectionView.render().$el);
        },

        applySort : function() {
            var sort = $("#sort-dropdown").val();
            this.model.set("sortType", sort);
            window.location = "#/artists/" + this.model.get("page") + "?sort=" + sort + "&order=" + this.model.get("orderBy");
        },

        applyOrder : function() {
            var order = $("#order-dropdown").val();
            this.model.set("orderBy", order);
            window.location = "#/artists/" + this.model.get("page") + "?sort=" + this.model.get("sortType") + "&order=" + order;
        },

        addFilter : function(e) {
            var searchTerms = $("#filter-input").val();
            vent.trigger("artists:doFilter", { searchTerms : searchTerms });
        },

        filterKeyPress : function(e) {
            // If enter key is entered while filter input box is focused, do a filter.
            if (e.which === 13) {
                var searchTerms = $("#filter-input").val();
                vent.trigger("artists:doFilter", { searchTerms : searchTerms });
            }
        },

        filterRemove : function(e) {
            vent.trigger("artists:removeFilter");
        },

        switchViewType : function(options) {
            localStorage.setItem("tracksPage:renderType", options.viewType);
            $(this.el).find(".content .item-group").empty();

            var trackGroupCollectionView = new TrackGroupCollectionView({
                collection : this.model.get("tracksCollection"),
                renderType : options.viewType
            });

            this.$el.find(".content .item-group").append(trackGroupCollectionView.render().$el);
        },

        switchToThumbView : function(e) {
            this.switchViewType({ viewType: "thumb" });
        },

        switchToListView : function(e) {
            this.switchViewType({ viewType: "list" });
        }
    });

    return ArtistsPageView;
});