define([
    "underscore",
    "backbone",
    "marionette",
    "text!../templates/PlayerQueueItemTemplate.html"
], function(_, Backbone, Marionette, PlayerQueueItemTemplate) {
    
    var PlayerQueueItemView = Backbone.Marionette.ItemView.extend({
        tagName: "li",
        className: "queueItem",
        events: {
            "click" : "clicked"
        },
        template: _.template(PlayerQueueItemTemplate),
        
        onRender: function() {
            console.log(this.model);
        },
        
        clicked: function(e) {
            console.log("queue item clicked");
        }
    });
    
    return PlayerQueueItemView;
    
});