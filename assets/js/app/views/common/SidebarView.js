define([
    "namespace",
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "text!../../templates/SidebarTemplate.html"
], function(namespace, $, _, Backbone, Marionette, SidebarTemplate) {

    var GosuApp = namespace.app;

    var SidebarView = Backbone.Marionette.ItemView.extend({
        template: _.template(SidebarTemplate),

        initialize : function() {
        },

        onRender : function() {
        }

    });

    return SidebarView;

});