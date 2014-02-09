define([
    "underscore",
    "backbone",
    "marionette",
    "views/TrackGroupItemView",
    "text!../templates/TrackGroupCollection_4_Template.html",
    "text!../templates/TrackGroupCollection_6_Template.html"
], function(_, Backbone, Marionette, TrackGroupItemView, TrackGroupCollection_4_Template, TrackGroupCollection_6_Template) {

    var TrackGroupCollectionView = Backbone.Marionette.CompositeView.extend({

        itemView: TrackGroupItemView,
        itemViewContainer : ".tracks-group",

        initialize : function(options) {
            var GroupModel = new Backbone.Model();
            GroupModel.set("size", options.size);
            GroupModel.set("renderType", options.renderType);
            this.model = GroupModel;
        },

        itemViewOptions: function(model, index) {
            return {
                renderType: this.model.get("renderType")
            };
        },

        getTemplate : function() {
            var blockSize = this.model.get("size");

            if (blockSize == 4) {
                return _.template(TrackGroupCollection_4_Template);
            } else if (blockSize == 6) {
                return _.template(TrackGroupCollection_6_Template);
            }
            return trackGroupTemplate;
        }

    });

    return TrackGroupCollectionView;

});