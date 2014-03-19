define([
    "gosuApp",
    "marionette",
    "../models/Player",
    "../views/common/PlayerView"
], function(GosuApp, Marionette, PlayerModel, PlayerView) {

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

        // If player_queue does not exist in localstorage, create it.
        if (localStorage.getItem("playerData") === null) {
            this.model.saveLocal();
        } else {
            this.model.loadLocal();
        }
    };

    PlayerController.prototype.render = function() {
        GosuApp.player.show(new PlayerView({ model: this.model }));
    };

    return PlayerController;

});