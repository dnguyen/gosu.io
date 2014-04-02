define([
    'namespace',
    'marionette'
], function(namespace, Marionette) {

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
            var data = JSON.parse(localStorage.getItem('playerData'));
            var that = this;

            _.each(data.tracks, function(track) {
                var trackModel = new Backbone.Model({
                    trackId: track.trackId,
                    title: track.title,
                    artistId: track.artistId,
                    artistName: track.artistName,
                    videoId: track.videoId,
                    uploaded: track.uploaded,
                    viewCount: track.viewCount
                });
                that.get('tracks').add(trackModel);
            });
        },

        /*
            Saves model to localStorage
        */
        saveLocal: function() {
            localStorage.setItem('playerData', JSON.stringify(this));
        }

    });

    return PlayerModel;

});