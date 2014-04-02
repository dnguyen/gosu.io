define([
    "gosuApp",
    "marionette"
], function(GosuApp, Marionette) {

    var PlayerModule = GosuApp.module('PlayerModule', { startWithParent: false });

    PlayerModule.on('start', function() {
        console.log('starting player module');
    });

    PlayerModule.on('stop', function() {
        console.log('stopping player module');
    });

    GosuApp.addInitializer(function() {
        console.log('add player module initializer');
    });

    return PlayerModule;
});