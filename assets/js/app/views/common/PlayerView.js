/*global define,document,window,console,YT*/
define([
    "namespace",
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "../PlayerQueueItemView",
    "text!../../templates/PlayerTemplate.html"
], function (namespace, $, _, Backbone, Marionette, PlayerQueueItemView, PlayerTemplate) {
    "use strict";
    
    var GosuApp = namespace.app;
    
    var PlayerView = Backbone.Marionette.ItemView.extend({
        className: 'player-container',
        template: _.template(PlayerTemplate),
        
        events: {
            "click .uk-progress" : "progressBarClicked"
        },
        
        initialize: function () {
            console.group("initialize PlayerView");
            console.log(this.model);
            console.groupEnd();
            GosuApp.vent.on("player:changeTrack", this.changeTrack, this);
            GosuApp.vent.on("player:trackEnded", this.changeToNextTrack, this);
            GosuApp.vent.on("player:playing", this.playerPlaying, this);
            GosuApp.vent.on("player:paused", this.playerPaused, this);
            GosuApp.vent.on("player:incProgress", this.playerIncProgress, this);
            GosuApp.vent.on("player:seekPlayer", this.seekPlayer, this);
            
            this.model.on("change:currentTrackIndex", this.currentTrackIndexChanged, this);
            this.model.on("change:playing", this.playingStateChanged, this);
        },
        
        /*
        *   Once the el has been added to the dom, render the YouTube player with the api.
        *   Also render the queue from our model
        */
        onShow: function () {
            var that = this;
            if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
                
                window.onYouTubeIframeAPIReady = function () {
                    that.loadPlayer("zVO5xTAbxm8");
                };
                
                $.getScript('//www.youtube.com/iframe_api');
            } else {
                this.loadPlayer("zVO5xTAbxm8");
            }
            
            var queueFragment = document.createDocumentFragment();
            this.model.get("tracks").forEach(function (track) {
                var playerQueueItem = new PlayerQueueItemView({ model: track });
                queueFragment.appendChild(playerQueueItem.render().el);
            });
            $(".queueItems").append(queueFragment);
            /*$('.Progress').bind('ondragover', function(e) {
                e.preventDefault();
            });
            $('.Progress').bind('ondrop', function(e) {
                e.preventDefault();
                console.log('slider dropped on progress');
                            
            });
            $('.handle').bind('dragenter', function() {
                console.log("drag enter");
            });
            $('.handle').bind('drag', function(e) {
                console.log('drag');
            });*/
        },
        
        loadPlayer: function (videoId) {
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
        
        progressBarClicked: function (e) {
            GosuApp.vent.trigger("player:seekPlayer", e);
            
        },
        
        seekPlayer: function (e) {
            console.group("progress bar clicked");
            var fullProgressbarWidth = $(".handle").parent().css("width");
            fullProgressbarWidth = fullProgressbarWidth.substring(0, fullProgressbarWidth.length - 2);
            // leftAmt -> left % of handle
            var leftAmt = ((e.pageX - $(".Progress").offset().left) / fullProgressbarWidth) * 100;
            // seekTo -> seconds to jump to in the video
            var seekTo = Math.floor((leftAmt / 100) * this.ytplayer.getDuration());
            
            this.ytplayer.seekTo(seekTo, true);
        },
        
        /*
            Returns seconds formatted as minutes:seconds (eg. 1:02)
        */
        secsToMinSec: function (val) {
            var minutes = Math.floor(val / 60);
            var seconds = Math.floor(val - (minutes * 60));
            
            return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
        },
        
        onPlayerReady: function () {
            console.log("yt player ready");
            
        },
        
        onPlayerStateChange: function (e) {
            console.log("player state change");
            if (e.data === YT.PlayerState.PLAYING) {
                GosuApp.vent.trigger("player:playing");
            } else if (e.data === YT.PlayerState.PAUSED) {
                GosuApp.vent.trigger("player:paused");
            } else if (e.data === YT.PlayerState.ENDED) {
                GosuApp.vent.trigger("player:trackEnded");
            }
        },
        
        /*
            Event handler for when 'playing' model property changes
        */
        playingStateChanged: function () {
            // If player is playing something, show pause button, else show play button
            if (this.model.get("playing")) {
                $(".PausePlay").html('<i class="uk-icon-pause"></i>');
            } else {
                $(".PausePlay").html('<i class="uk-icon-play"></i>');
            }
        },
        
        playerPlaying: function () {
            this.model.set("playing", true);
            this.model.set("progressInterval", setInterval(
                function() {
                    GosuApp.vent.trigger("player:incProgress");   
                }, 250));
            $(".duration").text(this.secsToMinSec(this.ytplayer.getDuration()));
        },
        
        playerPaused: function () {
            clearInterval(this.model.get("progressInterval"));
            this.model.set("playing", false);
        },
        
        playerIncProgress: function () {
            this.setTime();
        },
        
        setTime: function () {
            // Increment the progress bar
            var incrementAmount = (this.ytplayer.getCurrentTime() / this.ytplayer.getDuration()) * 100;
            $('.Progress.uk-progress-bar').attr('style', 'width: ' + incrementAmount + '%');
            
            // Move handle with progress bar
            var fullProgressbarWidth = $(".handle").parent().css("width");
                fullProgressbarWidth = fullProgressbarWidth.substring(0, fullProgressbarWidth.length - 2);
            var leftAmount = fullProgressbarWidth * (this.ytplayer.getCurrentTime() / this.ytplayer.getDuration()) - 10;
            $(".handle").css("left", leftAmount + "px");
            
            // Increment current time
            $(".time").text(this.secsToMinSec(this.ytplayer.getCurrentTime()));
        },
        
        /*
            When currentTrackIndex changes, load the new track into the Youtube player
        */
        currentTrackIndexChanged: function () {
            console.log("index changed");
            var trackAtCurrentIndex = this.model.get("tracks").at(this.model.get("currentTrackIndex"));
            this.ytplayer.loadVideoById(trackAtCurrentIndex.get("videoId"), 0, "hd720");
        },
        
        /*
            Click event for clicking a track on the queue
        */
        changeTrack: function (trackModel) {
            console.log("change track app event");
            this.model.set("currentTrackIndex", this.model.get("tracks").indexOf(trackModel));
        },
        
        /*
            Increment currentTrackIndex by 1 to move to the next track.
            If we're on the last track in the queue reset the currentTrackIndex to 0
        */
        changeToNextTrack: function () {
            console.log("changing to next track");
            
            // Reset the progress bar and interval
            clearInterval(this.model.get("progressInterval"));
            $(".Progress.uk-progress-bar").attr("style", "width: 0%");
            
            // Change model's currentTrackIndex
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