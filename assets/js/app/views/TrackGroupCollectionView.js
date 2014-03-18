define([
    "marionette",
    "views/TrackGroupItemView",
    "text!../templates/TrackGroupCollection_4_Template.html",
    "text!../templates/TrackGroupCollection_6_Template.html"
], function(Marionette, TrackGroupItemView, TrackGroupCollection_4_Template, TrackGroupCollection_6_Template) {

    var TrackGroupCollectionView = Backbone.Marionette.CompositeView.extend({
        tagName: "div",
        className: "tracks-group-container",
        template: _.template(TrackGroupCollection_6_Template),
        itemView: TrackGroupItemView,
        itemViewContainer : ".item-group",

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