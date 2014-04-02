/*global define,document,console*/
define([
    'marionette',
    'models/Client',
    'helpers/vent',
    'controllers/HeaderController',
    'controllers/PlayerController',
    'controllers/MainController',
    'controllers/AppController',
    'controllers/SidebarController'
], function(Marionette, Client, vent, HeaderController, PlayerController, MainController, AppController, SidebarController) {
    'use strict';

    var gosuApp = new Backbone.Marionette.Application();

    gosuApp.addRegions({
        header : '#header',
        sidebar : '#sidebar',
        content : '#content',
        player : '#player',
        modals : '.modals'
    });

    gosuApp.Router = Backbone.Marionette.AppRouter.extend( {
        appRoutes: {
            '' : 'mainPage',
            'signin' : 'login',
            'register' : 'register',
            'tracks/:page?*query' : 'tracksPage',
            'tracks/:page' : 'tracksPage',
            'tracks' : 'tracksPage',
            'track' : 'singleTrackPage',
            'track/:id' : 'singleTrackPage',
            'track/:id/*name' : 'singleTrackPage',
            'artists/:page?*query' : 'artistsPage',
            'artists/:page' : 'artistsPage',
            'artists' : 'artistsPage'
        }
    });

    gosuApp.on('initialize:after', function() {
        require([
            'apps/player/PlayerModule'
        ], function() {

            var PlayerModule = gosuApp.module('PlayerModule');
            PlayerModule.start();

            gosuApp.appController = new AppController();
            gosuApp.setUpAppEvents(vent, gosuApp.appController);

            var mainRouter = new gosuApp.Router({
                controller : MainController
            });

            if (Backbone.history) {
                Backbone.history.start();
            }

            gosuApp.headerController = new HeaderController();
            gosuApp.playerController = new PlayerController();
            gosuApp.sidebarController = new SidebarController();

            // Verify authentication before rendering header, sidebar, and player
            $.when(
                Client.fetch({
                    data: $.param({ token: localStorage.getItem('token') })
                })
            ).then(function(data) {
                vent.trigger('handleSuccessfulAuth', data);
            })
            .fail(function(data) {
                vent.trigger('handleFailedAuth', data);
            });
        });
    });

    gosuApp.addInitializer(function() {
        console.log('initialize');

    });

    // Setup global application events
    gosuApp.setUpAppEvents = function(vent, appController) {
        vent.on('StartLoadingNewPage', appController.loadNewPage, this);
        vent.on('FinishedLoadingNewPage', appController.doneLoadingNewPage, this);
        vent.on('UpdateTitle', appController.updateTitle, this);
        vent.on('showHeader', appController.showHeader, this);
        vent.on('showTrackAddToMenu', appController.showAddToMenu, this);
        vent.on('showNewModal', appController.showNewModal, this);
        vent.on('renderPlayer', appController.renderPlayer, this);
        vent.on('renderSidebar', appController.renderSidebar, this);
        vent.on('handleSuccessfulAuth', appController.handleSuccessfulAuthentication, this);
        vent.on('handleFailedAuth', appController.handleFailedAuthentication, this);
    };

    return gosuApp;

});