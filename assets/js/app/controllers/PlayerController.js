define([
    "namespace",
    "jquery",
    "backbone",
    "marionette",
    "../models/Player",
    "../views/common/PlayerView"
], function(namespace, $, Backbone, Marionette, PlayerModel, PlayerView) {
    
    var GosuApp = namespace.app;
    
    var PlayerController = function() {
        // Get data from localStorage for users who are not logged in.
        // TODO: Get data from server for logged in users.
        /*
            Queue {
                currentTrack
                tracks []
            }
                
        */
        // Create model for the player and store it in localStorage
        this.model = new PlayerModel();
        //testdata
        this.model.get("tracks").add(new Backbone.Model({
            title: 'Something',
            artist: "Girl's Day",
            videoId: "zVO5xTAbxm8"
        }));
        this.model.get("tracks").add(new Backbone.Model({
            title: 'Fxxk You',
            artist: 'GAIN',
            videoId: 'VSAVsstaj4E'
        }));
        this.model.get("tracks").add(new Backbone.Model({
            title: 'Friday',
            artist: 'IU',
            videoId: 'EiVmQZwJhsA'
        }));
        // If player_queue does not exist in localstorage, create it.
        if (localStorage.getItem("player_queue") === null) {
            this.model.saveLocal();
        } else {
            this.model.loadLocal();
            console.group("player queue model loaded from localstorage");
            console.log(this.model);
            console.groupEnd();
        }
    };
    
    PlayerController.prototype.render = function() {
        GosuApp.player.show(new PlayerView({ model: this.model }));
    };
    
    return PlayerController;
    
});