define([
    "helpers/vent",
    "marionette",
    "text!../../templates/RegisterPageTemplate.html"
], function(vent, Marionette, RegisterPageTemplate) {

    var RegisterPageView = Backbone.Marionette.ItemView.extend({

        className : "app-region",
        template : _.template(RegisterPageTemplate),
        events : {
            "click #register-btn" : "register"
        },

        register : function(e) {
            vent.trigger(
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