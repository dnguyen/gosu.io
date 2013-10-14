require.config({
    paths : {
        backbone : '../lib/backbone',
        underscore : '../lib/underscore',
        jquery : '../lib/jquery',
        marionette : "../lib/backbone.marionette",
        "backbone.wreqr" : "../lib/backbone.wreqr",
        "backbone.babysitter" : "../lib/backbone.babysitter",
        handlebars : "../lib/handlebars",
        text : "../lib/text"
    },
    shim : {
        jquery : {
            exports : 'jQuery'
        },

        underscore : {
            exports : '_'
        },

        backbone : {
            deps : ['jquery', 'underscore'],
            exports : 'Backbone'
        },

        'backbone.wreqr' : {
            deps: [
                'backbone'
            ]
        },

        'backbone.babysitter' : {
            deps : [
                'backbone'
            ]
        },

        marionette : {
            deps : ['backbone.wreqr', 'backbone.babysitter'],
            exports : 'Marionette'
        },

        handlebars : {
            exports: 'Handlebars'
        }
    }
}, require(["gosuApp"], function(GosuApp) {
    return GosuApp.start();
}));