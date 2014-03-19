/*******************************************
 * Main controller for entire application.
 * Redirects to each page's controller.
 *******************************************/
define([
    "helpers/vent",
    "models/Cache",
    "namespace",
    "marionette",
    "helpers/ApiHelper",
    "controllers/HomePageController",
    "controllers/TracksPageController",
    "controllers/ArtistsPageController",
    "controllers/LoginPageController",
    "controllers/RegisterPageController"
], function(vent, Cache, namespace, Marionette, ApiHelper, HomePageController, TracksPageController, ArtistsPageController, LoginPageController, RegisterPageController) {

    var URLHelper = namespace.URLHelper;

    return {
        /**
         *  Home Page
         */
        mainPage : function() {
            console.log("MainPage route");

            var popularTracksCollection = new Backbone.Collection(),
                newReleasesCollection = new Backbone.Collection(),
                comingSoonCollection = new Backbone.Collection();

            // Display the loading icon
            vent.trigger("StartLoadingNewPage", { page : "explore" });

            /**
             *  Only start rendering page once all of the data is ready.
             *  TODO: Move to HomePageController?
             */
            $.when(
                ApiHelper.request("GET", "tracks/filter", { sort: "viewCount", count : 8 }, Cache, "mostViewedTracksMainPage"),
                ApiHelper.request("GET", "tracks/filter", { sort: "uploaded", count : 8 }, Cache, "newReleaesMainPage")
            ).then(function(mostViewed, newTracks, comingSoon) {
                // Array of models should always be at 0th index..so just add those to the collections.
                // TODO: status code check...make sure the requests were actually completed successfully
                //       before trying to render the collection.
                popularTracksCollection.add(mostViewed[0]);
                newReleasesCollection.add(newTracks[0]);

                //vent.trigger("FinishedLoadingNewPage");

                // Pass all our collections to the home page controller, which will render all the views
                var options = {
                    popularTracksCollection : popularTracksCollection,
                    newReleasesCollection : newReleasesCollection
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
         * Single track page
         */
        singleTrackPage : function(id, name) {
            var SingleTrackPageRoute = require(["controllers/SingleTrackPageController"], function(SingleTrackPageController) {
                var singleTrackPageController = new SingleTrackPageController({
                    id : id,
                    name: name
                });
                singleTrackPageController.render();
            });
        },

        artistsPage : function(page, query) {
          //var artistsPage = new ArtistsPageController({ page : page }, URLHelper.getQueryObj(query));
           // artistsPage.render();
        },

        /**
         *  Login page
         */
        login : function() {
            var loginPage = new LoginPageController();
            loginPage.render();
        },

        /**
         *  Register page
         */
        register : function() {
            var registerPage = new RegisterPageController();
            registerPage.render();
        }
    };

});