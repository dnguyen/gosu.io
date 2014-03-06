define([
    "namespace",
    "marionette"
], function(namespace, Marionette) {

    var config = namespace.config;

    var ClientModel = Backbone.Model.extend({
        defaults: {
        },

        url: namespace.config.serverUrl + "auth"
    });

    return ClientModel;

});