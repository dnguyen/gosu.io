define([
    "namespace",
    "marionette",
    "helpers/ApiHelper",
    "views/common/HeaderView"
], function(namespace, Marionette, ApiHelper, HeaderView) {

    var GosuApp = namespace.app,
        config = namespace.config;

    /*
     * Get's login status from API
     */
    function getLoginStatus(model) {
        return ApiHelper.request("GET", "auth", { token: localStorage.getItem("token") });
    }

    var HeaderController = function(options) {
        this.loginModel = new Backbone.Model();

        var that = this;
        GosuApp.vent.on("auth:logout", function() {
            that.logout();
        });
    };

    HeaderController.prototype.render = function() {
        var that = this;

        $.when(
            getLoginStatus(that.loginModel)
        ).then(function(data) {
            that.loginModel.set({
                "loggedin" : true,
                "id" : data.id,
                "username" : data.username,
                "token" : data.token
            });
            GosuApp.header.show(new HeaderView({ model : that.loginModel }));
        })
        .fail(function(data) {
            that.loginModel.set({
                "loggedin" : false
            });
            GosuApp.header.show(new HeaderView({ model : that.loginModel }));
        });
    };

    HeaderController.prototype.logout = function() {
        $.when(ApiHelper.request("DELETE", "auth", { "token" : localStorage.getItem("token") })).then(function(data) {
            localStorage.setItem("token", "");
            window.location.reload();
        });
    };

    return HeaderController;

});