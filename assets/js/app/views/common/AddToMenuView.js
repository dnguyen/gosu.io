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
            GosuApp.vent.trigger("player:addToQueue", this.model);
        }
        
    });

    return AddToMenuView;

});
