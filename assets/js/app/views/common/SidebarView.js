define([
    "namespace",
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "handlebars",
    "text!../../templates/SidebarTemplate.html"
], function(namespace, $, _, Backbone, Marionette, Handlebars, SidebarTemplate) {

    var GosuApp = namespace.app;

    var SidebarView = Backbone.Marionette.ItemView.extend({
        template: Handlebars.compile(SidebarTemplate),

        initialize : function() {
        },

        onRender : function() {
        }

    });

    return SidebarView;

});