define([
    "namespace",
    "underscore",
    "backbone",
    "marionette",
    "text!../templates/TrackGroupItemTemplate.html"
], function(namespace, _, Backbone, Marionette, TrackGroupItemTemplate) {

    var GosuApp = namespace.app;
    
    var TrackGroupItemView = Backbone.Marionette.ItemView.extend({

        tagName : 'li',
        className : 'item',

        template: _.template(TrackGroupItemTemplate),

        events : {
            "click .Play" : "playTrack",
            "click .AddTo" : "addTrackTo"
        },

        initialize: function() {
        },
        
        playTrack: function (e) {
            console.log("play track");
            console.log(this.model);
            GosuApp.vent.trigger("player:playTrackDirect", this.model);
        },
        
        addTrackTo: function (e) {
            console.log("add track to");
            e.stopPropagation();
            GosuApp.vent.trigger("showTrackAddToMenu", {
                model : this.model,
                event : e
            });
        }
    });

    return TrackGroupItemView;

});