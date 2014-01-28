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
            GosuApp.vent.on("player:trackEnded", this.changeToNextTrack, this);
            this.model.on("change:currentTrackIndex", this.currentTrackIndexChanged, this);
        },
        
        /*
        *   Once the el has been added to the dom, render the YouTube player with the api.
        *   Also render the queue from our model
        */
        onShow: function() {
            var that = this;
            if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
                
                window.onYouTubeIframeAPIReady = function() {
                    that.loadPlayer("zVO5xTAbxm8");
                };
                
                $.getScript('//www.youtube.com/iframe_api');
            } else {
                this.loadPlayer("zVO5xTAbxm8");
            }
            
            var queueFragment = document.createDocumentFragment();
            this.model.get("tracks").forEach(function(track) {
                var playerQueueItem = new PlayerQueueItemView({ model: track });
                queueFragment.appendChild(playerQueueItem.render().el);
            });
            $(".queueItems").append(queueFragment);
        },
        
        loadPlayer: function(videoId) {                
            this.ytplayer = new YT.Player('ytPlayer', {
                height: '200',
                width: '328',
                videoId: videoId,
                playerVars : {
                    'controls' : 1
                },
                events: {
                    'onReady': this.onPlayerReady,
                    'onStateChange': this.onPlayerStateChange
                }
            });
        },
        
        onPlayerReady: function() {
            console.log("yt player ready");
            
        },
        
        onPlayerStateChange: function(e) {
            console.log("player state change");
            if (e.data === YT.PlayerState.ENDED) {
                GosuApp.vent.trigger("player:trackEnded");
            }
        },
        
        /*
            When currentTrackIndex changes, load the new track into the Youtube player
        */
        currentTrackIndexChanged: function() {
            console.log("index changed");
            var trackAtCurrentIndex = this.model.get("tracks").at(this.model.get("currentTrackIndex"));
            this.ytplayer.loadVideoById(trackAtCurrentIndex.get("videoId"), 0, "hd720");
        },
        
        /*
            Click event for clicking a track on the queue
        */
        changeTrack: function(trackModel) {
            console.log("change track app event");
            this.model.set("currentTrackIndex", this.model.get("tracks").indexOf(trackModel));
        },
        
        /*
            Increment currentTrackIndex by 1 to move to the next track.
            If we're on the last track in the queue reset the currentTrackIndex to 0
        */
        changeToNextTrack: function() {
            console.log("changing to next track");
            var currentTrackIndex = this.model.get("currentTrackIndex");
            if (currentTrackIndex + 1 >= this.model.get("tracks").length) {
                console.log("reset queue to 0");
                this.model.set("currentTrackIndex", 0);
            } else {
                this.model.set("currentTrackIndex", currentTrackIndex + 1);
            }
        }
        
    });
    
    return PlayerView;
    
});