define([
    "namespace",
    "jquery",
    "backbone",
    "marionette",
    "views/common/HeaderView"
], function(namespace, $, Backbone, Marionette, HeaderView) {

    var GosuApp = namespace.app;
    var ApiHelper = namespace.ApiHelper;

    /*
     * Get's login status from API
     */
    function getLoginStatus(model) {
        model.url = "http://api.gosukpop.com/session";

        return model.fetch();
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
            GosuApp.header.show(new HeaderView({ model : that.loginModel }));
        });
    };

    HeaderController.prototype.logout = function() {
        $.when(ApiHelper.request("DELETE", "http://localhost/gosukpop-api/public/auth"), { }).then(function(data) {
            window.location.reload();
        });
    };

    return HeaderController;

});