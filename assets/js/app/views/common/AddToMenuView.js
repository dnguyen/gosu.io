define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "text!../../templates/AddToMenuTemplate.html"
], function($, _, Backbone, Marionette, AddToMenuTemplate) {

    var AddToMenuView = Backbone.Marionette.ItemView.extend({
        className : "AddToMenu",
        template: _.template(AddToMenuTemplate)
    });

    return AddToMenuView;

});
