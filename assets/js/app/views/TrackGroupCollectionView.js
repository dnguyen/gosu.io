define([
    "backbone",
    "marionette",
    "handlebars",
    "text!../templates/TrackGroupCollectionTemplate.html",
    "views/TrackGroupItemView"
], function(Backbone, Marionette, Handlebars, TrackGroupCollectionTemplate, TrackGroupItemView) {

    var TrackGroupCollectionView = Backbone.Marionette.CompositeView.extend({

        template: Handlebars.compile(TrackGroupCollectionTemplate),
        itemView: TrackGroupItemView,
        itemViewContainer : ".tracks-group"

    });

    return TrackGroupCollectionView;

});