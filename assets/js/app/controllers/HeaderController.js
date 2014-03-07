define([
    "namespace",
    "marionette",
    "helpers/ApiHelper",
    "views/common/HeaderView"
], function(namespace, Marionette, ApiHelper, HeaderView) {

    var GosuApp = namespace.app,
        config = namespace.config;

    var HeaderController = function(options) {
        this.loginModel = new Backbone.Model();

        var that = this;
        GosuApp.vent.on("auth:logout", function() {
            that.logout();
        });
    };

    HeaderController.prototype.render = function() {
        console.log('rendering');
        GosuApp.header.show(new HeaderView({ model : GosuApp.Client }));
    };

    HeaderController.prototype.logout = function() {
        $.when(ApiHelper.request("DELETE", "auth", { "token" : localStorage.getItem("token") })).then(function(data) {
            localStorage.setItem("token", "");
            GosuApp.Client = null;
            window.location.reload();
        });
    };

    return HeaderController;

});