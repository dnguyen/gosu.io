define([
    "namespace",
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "text!../../templates/RegisterPageTemplate.html"
], function(namespace, $, _, Backbone, Marionette, RegisterPageTemplate) {

    var GosuApp = namespace.app;

    var RegisterPageView = Backbone.Marionette.ItemView.extend({

        className : "app-region",
        template : _.template(RegisterPageTemplate),
        events : {
            "click #register-btn" : "register"
        },

        register : function(e) {
            GosuApp.vent.trigger(
                "auth:register",
                {
                    username : $("#username").val(),
                    password : $("#password").val(),
                    confirmPassword : $("#confirm-password").val()
                }
            );
        }

    });

    return RegisterPageView;

});