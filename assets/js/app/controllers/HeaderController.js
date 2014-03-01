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
        model.url = config.serverUrl + "session";

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
        $.when(ApiHelper.request("DELETE", "auth"), { }).then(function(data) {
            window.location.reload();
        });
    };

    return HeaderController;

});