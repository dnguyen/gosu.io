define([
    "marionette",
    "views/TrackGroupItemView",
    "text!../templates/TrackGroupCollectionTemplate.html"
], function(Marionette, TrackGroupItemView, TrackGroupCollectionTemplate) {

    var TrackGroupCollectionView = Backbone.Marionette.CompositeView.extend({
        tagName: "div",
        className: "tracks-group-container",
        template: _.template(TrackGroupCollectionTemplate),
        itemView: TrackGroupItemView,
        itemViewContainer : ".item-group",

        initialize : function(options) {
            var GroupModel = new Backbone.Model();
            GroupModel.set("renderType", options.renderType);
            this.model = GroupModel;
        },

        itemViewOptions: function(model, index) {
            return {
                renderType: this.model.get("renderType")
            };
        },

        onRender: function() {
            if (this.model.get("renderType") === "list") {
                $(this.el).find(".item-group").addClass("list");
            }
        }

        /*getTemplate : function() {
            var blockSize = this.model.get("size");

            if (blockSize == 4) {
                return _.template(TrackGroupCollection_4_Template);
            } else if (blockSize == 6) {
                return _.template(TrackGroupCollection_6_Template);
            }
            return trackGroupTemplate;
        }*/

    });

    return TrackGroupCollectionView;

});