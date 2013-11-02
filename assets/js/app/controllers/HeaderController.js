define([
    "namespace",
    "jquery",
    "backbone",
    "marionette",
    "views/common/HeaderView"
], function(namespace, $, Backbone, Marionette, HeaderView) {

    var GosuApp = namespace.app;

    /*
     * Get's login status from API
     */
    function getLoginStatus(model) {
        model.url = "http://api.gosukpop.com/session";

        return model.fetch();
    }

    var HeaderController = function(options) {
        this.loginModel = new Backbone.Model();
    };

    HeaderController.prototype.render = function() {
        var that = this;

        $.when(
            getLoginStatus(that.loginModel)
        ).then(function(data) {
            GosuApp.header.show(new HeaderView({ model : that.loginModel }));
        });
    };

    return HeaderController;

});