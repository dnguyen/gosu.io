define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "handlebars",
    "text!../../templates/LoadingIconTemplate.html"
], function($, _, Backbone, Marionette, Handlebars, LoadingIconTemplate) {

    var LoadingIcon = Backbone.Marionette.ItemView.extend({
        className : "row",
        template: Handlebars.compile(LoadingIconTemplate)
    });

    return LoadingIcon;

});
