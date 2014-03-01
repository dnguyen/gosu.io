define([
    "namespace",
    "marionette",
    "text!../../templates/SidebarTemplate.html"
], function(namespace, Marionette, SidebarTemplate) {

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