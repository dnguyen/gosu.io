define([
    "namespace",
    "marionette",
    "text!../../templates/HeaderTemplate.html"
], function(namespace, Marionette, HeaderTemplate) {

    var GosuApp = namespace.app;

    var HeaderView = Backbone.Marionette.ItemView.extend({
        template: _.template(HeaderTemplate),
        events: {
            "click .SignOut" : "signOut"
        },

        initialize : function() {
            console.log("Header view init");
        },

        onRender : function() {
            /*this.$el.find("#user-settings-dropdown").dropdown({
                onChange : function(value, text) {
                    GosuApp.vent.trigger("auth:logout");
                }
            });*/
        },

        signOut : function(e) {
            GosuApp.vent.trigger("auth:logout");
        }

    });

    return HeaderView;

});