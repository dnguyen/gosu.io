define([
    "namespace",
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "../PlayerQueueItemView",
    "text!../../templates/PlayerTemplate.html"
], function(namespace, $, _, Backbone, Marionette, PlayerQueueItemView, PlayerTemplate) {
    
    var PlayerView = Backbone.Marionette.ItemView.extend({
        className: 'player-container',
        template: _.template(PlayerTemplate),
        
        initialize: function() {
            console.group("initialize PlayerView");
            console.log(this.model);
            console.groupEnd();
        },
        
        /*
        *   Once the el has been added to the dom, render the YouTube player with the api.
        *   Also render the queue from our model
        */
        onShow: function() {
            var ytplayer = new YT.Player('ytPlayer', {
                height: '200',
                width: '328',
                videoId: 'zVO5xTAbxm8',
                playerVars : {
                    'controls' : 1
                },
                events: {
                    'onReady': this.onPlayerReady,
                    'onStateChange': this.onPlayerStateChange
                }
            });
            
            _.each(this.model.get("tracks"), function(track) {
                var trackModel = new Backbone.Model({
                    title: track.title,
                    artist: track.artist,
                    videoId: track.videoId
                });
                var playerQueueItem = new PlayerQueueItemView({ model: trackModel });
                
                console.log("Start rendering tracks");
                $(".queueItems").append(playerQueueItem.render().el);
                
            });
        },
        
        onPlayerReady: function() {
            console.log("yt player ready");
            
        },
        
        onPlayerStateChange: function() {
            console.log("player state change");
        }
        
    });
    
    return PlayerView;
    
});