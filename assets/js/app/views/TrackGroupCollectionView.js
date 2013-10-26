define([
    "backbone",
    "marionette",
    "handlebars",
    "views/TrackGroupItemView",
    "text!../templates/TrackGroupCollection_4_Template.html",
    "text!../templates/TrackGroupCollection_6_Template.html"
], function(Backbone, Marionette, Handlebars, TrackGroupItemView, TrackGroupCollection_4_Template, TrackGroupCollection_6_Template) {

    var TrackGroupCollectionView = Backbone.Marionette.CompositeView.extend({

        itemView: TrackGroupItemView,
        itemViewContainer : ".tracks-group",

        initialize : function(options) {
            var GroupModel = new Backbone.Model();
            GroupModel.set("size", options.size);
            this.model = GroupModel;
        },

        getTemplate : function() {
            var blockSize = this.model.get("size");

            if (blockSize == 4) {
                return Handlebars.compile(TrackGroupCollection_4_Template);
            } else if (blockSize == 6) {
                return Handlebars.compile(TrackGroupCollection_6_Template);
            }
            return trackGroupTemplate;
        }

    });

    return TrackGroupCollectionView;

});