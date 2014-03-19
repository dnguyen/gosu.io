define([
    "namespace",
    "marionette",
    "text!../templates/PlayerQueueItemTemplate.html"
], function(namespace, Marionette, PlayerQueueItemTemplate) {

    var GosuApp = namespace.app;

    var PlayerQueueItemView = Backbone.Marionette.ItemView.extend({
        tagName: "div",
        className: "small-item queueItem",

        events: {
            "click .Play" : "play",
            "click .Remove" : "removeEvent",
            "click .AddTo" : "addTo"
        },

        template: _.template(PlayerQueueItemTemplate),

        initialize: function() {
            this.model.bind("destroy", this.destroyView, this);
        },

        play: function(e) {
            GosuApp.vent.trigger("player:changeTrack", this.model);
        },

        removeEvent: function(e) {
            GosuApp.vent.trigger("player:removeFromQueue", this.model);
        },

        addTo: function(e) {
            e.stopPropagation();
            GosuApp.vent.trigger("showTrackAddToMenu", {
                model : this.model,
                event : e
            });
        },

        destroyView: function(e) {
            console.log("destroy view");
            this.remove();
        }
    });

    return PlayerQueueItemView;

});