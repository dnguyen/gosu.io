define([
    "namespace",
    "backbone",
    "marionette"
], function(namespace, Backbone, Marionette) {
    
    var PlayerModel = Backbone.Model.extend({
        
        defaults: {
            currentTrackIndex: 0,
            playing: false,
            tracks: new Backbone.Collection()
        },
        
        initialize: function() {
        },
        
        /*
            Loads model from localStorage
        */
        loadLocal: function() {
            this.attributes = JSON.parse(localStorage.getItem("player_queue"));
        },
        
        /*
            Saves model to localStorage
        */
        saveLocal: function() {
            localStorage.setItem("player_queue", JSON.stringify(this));
        }
        
    });
    
    return PlayerModel;
    
});