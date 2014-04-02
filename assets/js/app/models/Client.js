define([
    'namespace',
    'marionette'
], function(namespace, Marionette) {

    var config = namespace.config;

    var ClientModel = Backbone.Model.extend({
        defaults: {
            playlists : new Backbone.Collection()
        },

        url: namespace.config.serverUrl + 'auth'
    });

    return new ClientModel();

});