define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "text!../../templates/LoadingIconTemplate.html"
], function($, _, Backbone, Marionette, LoadingIconTemplate) {

    var LoadingIcon = Backbone.Marionette.ItemView.extend({
        className : "row",
        template: _.template(LoadingIconTemplate)
    });

    return LoadingIcon;

});
