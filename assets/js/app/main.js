require.config({
    paths : {
        backbone : '../../../bower_components/backbone/backbone-min',
        underscore : '../../../bower_components/underscore/underscore-min',
        jquery : '../../../bower_components/jquery/jquery.min',
        marionette : "../../../bower_components/backbone.marionette/lib/core/amd/backbone.marionette",
        "backbone.wreqr" : "../../../bower_components/backbone.wreqr/lib/backbone.wreqr.min",
        "backbone.babysitter" : "../../../bower_components/backbone.babysitter/lib/backbone.babysitter.min",
        text : "../../../bower_components/requirejs-text/text",
        foundation : "../../../bower_components/foundation/js/foundation/foundation.min",
        modernizr : "../../../bower_components/foundation/js/vendor/custom.modernizr"
        //YTApi: "../../../bower_components/youtube/player"
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

        foundation : {
            deps: [
                'jquery',
                'modernizr'
            ],
            exports: 'foundation'
        },

        modernizr : {
            exports: 'modernizr'
        }
    }
}, require(["gosuApp"], function(GosuApp) {
    return GosuApp.start();
}));