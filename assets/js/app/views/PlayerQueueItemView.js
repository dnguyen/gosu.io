define([
    "namespace",
    "underscore",
    "backbone",
    "marionette",
    "text!../templates/PlayerQueueItemTemplate.html"
], function(namespace, _, Backbone, Marionette, PlayerQueueItemTemplate) {
    
    var GosuApp = namespace.app;
    
    var PlayerQueueItemView = Backbone.Marionette.ItemView.extend({
        tagName: "li",
        className: "queueItem",
        events: {
            "click" : "clicked"
        },
        template: _.template(PlayerQueueItemTemplate),
        
        onRender: function() {
            console.group("Rendering PlayerQueueItemView");
            console.log(this.model);
            console.groupEnd();
        },
        
        clicked: function(e) {
            GosuApp.vent.trigger("player:changeTrack", this.model);
        }
    });
    
    return PlayerQueueItemView;
    
});