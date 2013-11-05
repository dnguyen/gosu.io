/*******************************************
 * Main controller for entire application.
 * Redirects to each page's controller.
 *******************************************/
define([
    "namespace",
    "jquery",
    "backbone",
    "marionette",
    "controllers/HomePageController",
    "controllers/TracksPageController",
    "controllers/LoginPageController"
], function(namespace, $, Backbone, Marionette, HomePageController, TracksPageController, LoginPageController) {

    var GosuApp = namespace.app;
    var ApiHelper = namespace.ApiHelper;
    var URLHelper = namespace.URLHelper;

    return {
        /**
         *  Home Page
         */
        mainPage : function() {
            var popularTracksCollection = new Backbone.Collection();
            var newReleasesCollection = new Backbone.Collection();
            var comingSoonCollection = new Backbone.Collection();

            // Display the loading icon
            GosuApp.vent.trigger("StartLoadingNewPage", { page : "explore" });

            /**
             *  Only start rendering page once all of the data is ready.
             *  TODO: Move to HomePageController?
             */
            $.when(
                ApiHelper.request("GET", "http://localhost/gosukpop-api/public/MostViewedTracks", { count : 8 }, GosuApp.GlobalCache, "mostViewedTracksMainPage"),
                ApiHelper.request("GET", "http://localhost/gosukpop-api/public/NewTrackReleases", { count : 8 }, GosuApp.GlobalCache, "newReleaesMainPage"),
                ApiHelper.request("GET", "http://localhost/gosukpop-api/public/ComingSoonTracks", { count : 5 }, GosuApp.GlobalCache, "comingSoonMainPage")
            ).then(function(mostViewed, newTracks, comingSoon) {
                // Array of models should always be at 0th index..so just add those to the collections.
                // TODO: status code check...make sure the requests were actually completed successfully
                //       before trying to render the collection.
                popularTracksCollection.add(mostViewed[0]);
                newReleasesCollection.add(newTracks[0]);
                comingSoonCollection.add(comingSoon[0]);

                GosuApp.vent.trigger("FinishedLoadingNewPage");

                // Pass all our collections to the home page controller, which will render all the views
                var options = {
                    popularTracksCollection : popularTracksCollection,
                    newReleasesCollection : newReleasesCollection,
                    comingSoonCollection : comingSoonCollection
                };
                var pageController = new HomePageController(options);
                pageController.render();
            });

        },

        /**
         *  Tracks page
         */
        tracksPage : function(page, query) {
            console.log("tracks route");
            var tracksPage = new TracksPageController({ page : page }, URLHelper.getQueryObj(query));
            tracksPage.render();
        },

        /**
         *  Login page
         */
        login : function() {
            var loginPage = new LoginPageController();
            loginPage.render();
        }
    };

});