define([
    "namespace",
    "jquery",
    "backbone",
    "marionette",
    "../views/pages/RegisterPageView"
], function(namespace, $, Backbone, Marionette, RegisterPageView) {

    var GosuApp = namespace.app;
    var ApiHelper = namespace.ApiHelper;

    var RegisterPageController = function() {
        var that = this;
        GosuApp.vent.on("auth:register", function(data) {
            that.doRegister(data);
        });
    };

    RegisterPageController.prototype.render = function() {
        var registerView = new RegisterPageView();
        GosuApp.content.show(registerView);
    };

    RegisterPageController.prototype.doRegister = function(data) {
        if (this.validateForm(data)) {
            console.log("valid registeration");
            $.when(ApiHelper.request(
                "POST",
                "http://localhost/gosukpop-api/public/users",
                {
                    username: data.username,
                    password : data.password,
                    confirm_password : data.confirmPassword
                })
            ).then(function(data) {
                // If registration was successfull, redirect to home page
                if (data.status) {
                    window.location = "#/";
                    window.location.reload();
                }
                // Else, display error messages recieved
                else {
                    $("#login-form").addClass("error");
                    $("#errors").prepend('<div id="error-segment" class="ui red segment"><p>' + data.message + '</p></div>');
                }
            });
        }
    };

    RegisterPageController.prototype.validateForm = function(data) {
        var usernameField = $("#username").parent();
        var passwordField = $("#password").parent();
        var confirmPasswordField = $("#confirm-password").parent();

        var errors = false;

        // Clear any previous errors
        $("#error-segment").remove();
        $("#login-form").removeClass("error");
        $(".error-message").remove();
        usernameField.removeClass("error");
        passwordField.removeClass("error");
        confirmPasswordField.removeClass("error");

        // Check if username is filled
        if (data.username === "") {
            usernameField.addClass("error");
            usernameField.append('<div class="error-message ui red pointing above ui label">Please enter a username.</div>');
            errors = true;
        }

        // Check if password is filled
        if (data.password === "") {
            passwordField.addClass("error");
            passwordField.append('<div class="error-message ui red pointing above ui label">Please enter a password.</div>');
            errors = true;
        }

        // Check if confirm password is filled
        if (data.confirmPassword === "") {
            confirmPasswordField.addClass("error");
            confirmPasswordField.append('<div class="error-message ui red pointing above ui label">Please confirm your password.</div>');
            errors = true;
        }

        if (data.confirmPassword !== data.password) {
            confirmPasswordField.addClass("error");
            confirmPasswordField.append('<div class="error-message ui red pointing above ui label">Passwords do not match.</div>');
            errors = true;
        }

        if (!errors)
            return true;
        else
            return false;
    };

    return RegisterPageController;

});