define([
    "marionette",
    "text!../../templates/ArtistsPageLayoutTemplate.html"
], function(Marionette, ArtistsPageLayoutTemplate) {

    var ArtistsPageView = Backbone.Marionette.ItemView.extend({
        className: "app-region uk-animation-slide-left",
        template: _.template(ArtistsPageLayoutTemplate)
    });

    return ArtistsPageView;
});