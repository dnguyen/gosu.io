define([
    "marionette",
    "../ArtistsGroupCompositeView",
    "text!../../templates/ArtistsPageLayoutTemplate.html"
], function(Marionette, ArtistsGroupCompositeView, ArtistsPageLayoutTemplate) {

    var ArtistsPageView = Backbone.Marionette.ItemView.extend({
        className: "app-region uk-animation-slide-left",
        template: _.template(ArtistsPageLayoutTemplate),

        initialize : function() {

        },

        onRender : function() {
            if (localStorage.getItem("artistsPage:renderType") === null) {
                localStorage.setItem("artistsPage:renderType", "thumb");
            }

            var trackGroupCollectionView = new ArtistsGroupCompositeView({
                collection : this.model.get("artistsCollection"),
                renderType : localStorage.getItem("artistsPage:renderType")
            });

            this.$el.find(".content").append(trackGroupCollectionView.render().$el);
        }
    });

    return ArtistsPageView;
});