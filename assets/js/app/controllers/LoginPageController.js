define([
    'helpers/vent',
    'namespace',
    'marionette',
    'helpers/ApiHelper',
    '../views/pages/LoginPageView'
], function(vent, namespace, Marionette, ApiHelper, LoginPageView) {

    var LoginPageController = function() {

        var that = this;
        vent.on('login:doLogin', function(data) {
            that.doLogin(data);
        });

    };

    LoginPageController.prototype.render = function() {
        var loginPageView = new LoginPageView();

        vent.trigger('StartLoadingNewPage', {
            title: 'Sign In',
            page : 'login'
        });

        vent.trigger('FinishedLoadingNewPage', { view : loginPageView });
    };

    /**
     *  Attempt to do a login with given username and password.
     *      Displays error messages next to inputs if there are invalid inputs.
     *
     *      If there are no errors, make AJAX request to server to do login.
     *           Server should also check for valid inputs, and return either a success or
     *           fail with errors.
     */
    LoginPageController.prototype.doLogin = function(data) {
        var usernameInput = $('#username');
        var passwordInput = $('#password');
        var errors = false;

        // Clear out any error messages
        $('.error-message').remove();
        $('#error-segment').remove();
        $('#login-form').removeClass('error');
        usernameInput.removeClass('uk-form-danger');
        passwordInput.removeClass('uk-form-danger');

        // Check if there's anything in username input
        if (data.username === '') {
            usernameInput.addClass('uk-form-danger');
            usernameInput.parent().append('<p class="uk-form-help-block">Please enter a username.</p>');
            errors = true;
        }

        // Check if there's anything in password input
        if (data.password === '') {
            passwordInput.addClass('uk-form-danger');
            passwordInput.parent().append('<p class="uk-form-help-block">Please enter a password.</p>');
            errors = true;
        }

        // If there are no errors, make AJAX request to server
        if (!errors) {
            $.when(
                ApiHelper.request(
                    'POST',
                    'auth',
                    {
                        username : data.username,
                        password : data.password
                    })
            ).then(function(data) {
                localStorage.setItem('token', data.token);
                // TODO: CHange so we don't have to reload the entire page...
                //       Should just re render header view and update user model
                window.location = '#/';
                window.location.reload();
            })
            .fail(function(data) {
                $('#login-form').addClass('error');
                $('#errors').prepend('<div id="error-segment" class="uk-alert uk-alert-danger"><p>The username or password is not correct.</p></div>');
                $('.uk-form-help-block').remove();
            });
        }

    };

    return LoginPageController;
});