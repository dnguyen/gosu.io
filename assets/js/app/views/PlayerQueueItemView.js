define([
    "namespace",
    "underscore",
    "backbone",
    "marionette",
    "text!../templates/PlayerQueueItemTemplate.html"
], function(namespace, _, Backbone, Marionette, PlayerQueueItemTemplate) {
    
    var GosuApp = namespace.app;
    
    var PlayerQueueItemView = Backbone.Marionette.ItemView.extend({
        tagName: "div",
        className: "queueItem",
        
        events: {
            "click .Play" : "play",
            "click .Remove" : "removeEvent",
            "click .AddTo" : "addTo"
        },

        template: _.template(PlayerQueueItemTemplate),
        
        initialize: function() {
            this.model.bind("destroy", this.destroyView, this);
        },

        onRender: function() {
            console.group("Rendering PlayerQueueItemView");
            console.log(this.model);
            console.groupEnd();
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