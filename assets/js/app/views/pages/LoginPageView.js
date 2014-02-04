define([
    "namespace",
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "text!../../templates/LoginPageTemplate.html"
], function(namespace, $, _, Backbone, Marionette, LoginPageTemplate) {

    var GosuApp = namespace.app;

    var LoginPageView = Backbone.Marionette.ItemView.extend({
        className : "app-region",
        template: _.template(LoginPageTemplate),
        events: {
            "click #login-btn" : "doLogin"
        },

        doLogin : function(e) {
            GosuApp.vent.trigger("login:doLogin", { username : $("#username").val(), password : $("#password").val()});
        }

    });

    return LoginPageView;

});