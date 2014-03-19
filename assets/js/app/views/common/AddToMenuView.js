define([
    "helpers/vent",
    "marionette",
    "text!../../templates/AddToMenuTemplate.html"
], function(vent, Marionette, AddToMenuTemplate) {

    var AddToMenuView = Backbone.Marionette.ItemView.extend({
        className : "AddToMenu",
        template: _.template(AddToMenuTemplate),

        events: {
            "click .AddToQueue" : "addToQueue"
        },

        addToQueue : function () {
            vent.trigger("player:addToQueue", new Backbone.Model({
                trackId: this.model.get("trackId"),
                title: this.model.get("title"),
                artistId: this.model.get("artistId"),
                artistName: this.model.get("artistName"),
                videoId: this.model.get("videoId"),
                uploaded: this.model.get("uploaded"),
                viewCount: this.model.get("viewCount")
            }));

            this.close();
        }

    });

    return AddToMenuView;

});
