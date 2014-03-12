define([
    "namespace",
    "marionette",
    "text!../../templates/RegisterPageTemplate.html"
], function(namespace, Marionette, RegisterPageTemplate) {

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
                    email : $("#email").val(),
                    confirmPassword : $("#confirm-password").val()
                }
            );
        }

    });

    return RegisterPageView;

});