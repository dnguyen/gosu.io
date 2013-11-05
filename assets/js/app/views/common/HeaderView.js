define([
    "namespace",
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "semantic.dropdown",
    "text!../../templates/HeaderTemplate.html"
], function(namespace, $, _, Backbone, Marionette, SemanticDropdown, HeaderTemplate) {

    var GosuApp = namespace.app;

    var HeaderView = Backbone.Marionette.ItemView.extend({
        template: _.template(HeaderTemplate),

        initialize : function() {
            console.log("Header view init");
        },

        onRender : function() {
            this.$el.find("#user-settings-dropdown").dropdown({
                onChange : function(value, text) {
                    GosuApp.vent.trigger("auth:logout");
                }
            });
        }

    });

    return HeaderView;

});