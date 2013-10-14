define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "handlebars",
    "text!../../templates/SidebarTemplate.html"
], function($, _, Backbone, Marionette, Handlebars, SidebarTemplate) {

    var SidebarView = Backbone.Marionette.ItemView.extend({
        template: Handlebars.compile(SidebarTemplate),

        initialize : function() {
            console.log("sidebar view init");
        }

    });

    return SidebarView;

});