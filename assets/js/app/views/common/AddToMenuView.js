define([
    "namespace",
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "text!../../templates/AddToMenuTemplate.html"
], function(namespace, $, _, Backbone, Marionette, AddToMenuTemplate) {

    var GosuApp = namespace.app;
    
    var AddToMenuView = Backbone.Marionette.ItemView.extend({
        className : "AddToMenu",
        template: _.template(AddToMenuTemplate),
        
        events: {
            "click .AddToQueue" : "addToQueue"
        },
        
        addToQueue : function () {
            GosuApp.vent.trigger("player:addToQueue", new Backbone.Model({
                trackId: this.model.get("trackId"),
                title: this.model.get("title"),
                artistId: this.model.get("artistId"),
                artistName: this.model.get("artistName"),
                videoId: this.model.get("videoId"),
                uploaded: this.model.get("uploaded"),
                viewCount: this.model.get("viewCount")
            }));
        }
        
    });

    return AddToMenuView;

});
