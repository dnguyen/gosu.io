define([
    "namespace",
    "marionette",
    "text!../templates/TrackGroupItemTemplate.html",
    "text!../templates/TrackGroupListItemTemplate.html"
], function(namespace, Marionette, TrackGroupItemTemplate, TrackGroupListItemTemplate) {

    var GosuApp = namespace.app;

    var TrackGroupItemView = Backbone.Marionette.ItemView.extend({

        tagName : 'div',
        className : 'item',

        template: _.template(TrackGroupItemTemplate),

        events : {
            "click .Play" : "playTrack",
            "click .AddTo" : "addTrackTo"
        },

        initialize: function() {
        },

        onRender: function() {
            if (this.options.renderType === "list") {
                $(this.el).addClass("listItem");
            }
        },

        getTemplate: function() {
            if (this.options.renderType === "list") {
                return _.template(TrackGroupListItemTemplate);
            } else {
                return _.template(TrackGroupItemTemplate);
            }
        },

        playTrack: function (e) {
            GosuApp.vent.trigger("player:addToQueue", new Backbone.Model({
                    trackId: this.model.get("trackId"),
                    title: this.model.get("title"),
                    artistId: this.model.get("artistId"),
                    artistName: this.model.get("artistName"),
                    videoId: this.model.get("videoId"),
                    uploaded: this.model.get("uploaded"),
                    viewCount: this.model.get("viewCount")
                }));
        },

        addTrackTo: function (e) {
            console.log("add track to");
            e.stopPropagation();
            GosuApp.vent.trigger("showTrackAddToMenu", {
                model : new Backbone.Model({
                    trackId: this.model.get("trackId"),
                    title: this.model.get("title"),
                    artistId: this.model.get("artistId"),
                    artistName: this.model.get("artistName"),
                    videoId: this.model.get("videoId"),
                    uploaded: this.model.get("uploaded"),
                    viewCount: this.model.get("viewCount")
                }),
                event : e
            });
        }
    });

    return TrackGroupItemView;

});