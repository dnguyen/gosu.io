define([
    "helpers/vent",
    "marionette",
    "text!../../templates/LoginPageTemplate.html"
], function(vent, Marionette, LoginPageTemplate) {

    var LoginPageView = Backbone.Marionette.ItemView.extend({
        className : "app-region",
        template: _.template(LoginPageTemplate),
        events: {
            "click #login-btn" : "doLogin"
        },

        doLogin : function(e) {
            vent.trigger("login:doLogin", { username : $("#username").val(), password : $("#password").val()});
        }

    });

    return LoginPageView;

});