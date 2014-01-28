define([
    "namespace",
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "../PlayerQueueItemView",
    "text!../../templates/PlayerTemplate.html"
], function(namespace, $, _, Backbone, Marionette, PlayerQueueItemView, PlayerTemplate) {
    
    var GosuApp = namespace.app;
    
    var PlayerView = Backbone.Marionette.ItemView.extend({
        className: 'player-container',
        template: _.template(PlayerTemplate),
        
        initialize: function() {
            console.group("initialize PlayerView");
            console.log(this.model);
            console.groupEnd();
            GosuApp.vent.on("player:changeTrack", this.changeTrack, this);
        },
        
        /*
        *   Once the el has been added to the dom, render the YouTube player with the api.
        *   Also render the queue from our model
        */
        onShow: function() {
            var that = this;
            if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
                
                window.onYouTubeIframeAPIReady = function() {
                    that.ytplayer = new YT.Player('ytPlayer', {
                        height: '200',
                        width: '328',
                        videoId: 'zVO5xTAbxm8',
                        playerVars : {
                            'controls' : 1
                        },
                        events: {
                            'onReady': that.onPlayerReady,
                            'onStateChange': that.onPlayerStateChange
                        }
                    });
                };
                
                $.getScript('//www.youtube.com/iframe_api');
            } else {
                this.ytplayer = new YT.Player('ytPlayer', {
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
            }
            console.log(this.model.get("tracks"));
            this.model.get("tracks").forEach(function(track) {
                var playerQueueItem = new PlayerQueueItemView({ model: track });
                
                console.log("Start rendering tracks");
                $(".queueItems").append(playerQueueItem.render().el);
                
            });
        },
        
        onPlayerReady: function() {
            console.log("yt player ready");
            
        },
        
        onPlayerStateChange: function() {
            console.log("player state change");
        },
        
        changeTrack: function(trackModel) {
            console.log("change track app event");
            this.ytplayer.loadVideoById(trackModel.get("videoId"), 0, "hd720");
        }
        
    });
    
    return PlayerView;
    
});