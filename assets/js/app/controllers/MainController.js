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
    "views/common/LoadingIcon"
], function(namespace, $, Backbone, Marionette, HomePageController, TracksPageController, LoadingIconView) {

    var GosuApp = namespace.app;
    var ApiHelper = namespace.ApiHelper;

    return {
        /**
         *  Home Page
         */
        mainPage : function() {
            var popularTracksCollection = new Backbone.Collection();
            var newReleasesCollection = new Backbone.Collection();
            var comingSoonCollection = new Backbone.Collection();

            // Display the loading icon
            var loadingIconView = new LoadingIconView();
            $("#content").html("");
            $("#content").append(loadingIconView.render().el);

            /**
             *  Only start rendering page once all of the data is ready.
             *  TODO: Move to HomePageController?
             */
            $.when(
                ApiHelper.get("http://localhost/gosukpop-api/public/MostViewedTracks", { count : 8 }, GosuApp.GlobalCache, "mostViewedTracksMainPage"),
                ApiHelper.get("http://localhost/gosukpop-api/public/NewTrackReleases", { count : 8 }, GosuApp.GlobalCache, "newReleaesMainPage"),
                ApiHelper.get("http://localhost/gosukpop-api/public/ComingSoonTracks", { count : 5 }, GosuApp.GlobalCache, "comingSoonMainPage")
            ).then(function(mostViewed, newTracks, comingSoon) {
                // Array of models should always be at 0th index..so just add those to the collections.
                // TODO: status code check...make sure the requests were actually completed successfully
                //       before trying to render the collection.
                popularTracksCollection.add(mostViewed[0]);
                newReleasesCollection.add(newTracks[0]);
                comingSoonCollection.add(comingSoon[0]);

                // Properly remove the loading icon.
                loadingIconView.close();

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
        tracksPage : function() {
            console.log("tracks route");
            var tracksPage = new TracksPageController();
            tracksPage.render();
        }
    };

});