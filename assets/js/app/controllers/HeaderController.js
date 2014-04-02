define([
    'helpers/vent',
    'models/Client',
    'namespace',
    'marionette',
    'helpers/ApiHelper',
    'views/common/HeaderView'
], function(vent, Client, namespace, Marionette, ApiHelper, HeaderView) {

    //var GosuApp = namespace.app,
        var config = namespace.config;

    var HeaderController = function(options) {
        this.loginModel = new Backbone.Model();

        var that = this;
        vent.on('auth:logout', function() {
            that.logout();
        });
    };

    HeaderController.prototype.render = function() {
        vent.trigger('showHeader', { view : new HeaderView({ model : Client })});
    };

    HeaderController.prototype.logout = function() {
        $.when(ApiHelper.request('DELETE', 'auth', { token : localStorage.getItem('token') })).then(function(data) {
            localStorage.setItem('token', '');
            window.location.reload();
        });
    };

    return HeaderController;

});