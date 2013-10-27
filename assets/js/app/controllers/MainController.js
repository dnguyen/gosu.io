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

    /*
        Make request to server to get data for any kind of simple meta data (most viewed tracks, new releaes, coming soon, etc).
        Also stores the data that was fetched into a cache for faster loading.
        Thanks to http://stackoverflow.com/a/8960587 for the caching :)
     */
    function getMetaData(url, type, count) {

        // Store the cache into a promise
        var promise = GosuApp.GlobalCache.get(type);

        // If the promise doesn't exist, get it from the server
        if (!promise) {
            promise = $.ajax(url, {
                type : 'GET',
                data : { count : count },
                dataType : 'json'
            });

            // Set the cache to the data that was retrieved.
            GosuApp.GlobalCache.set(type, promise);
        }

        // return the promise
        return promise;
    }

    return {
        /*
         * Home Page
         */
        mainPage : function() {
            var popularTracksCollection = new Backbone.Collection();
            var newReleasesCollection = new Backbone.Collection();
            var comingSoonCollection = new Backbone.Collection();

            // Display the loading icon
            var loadingIconView = new LoadingIconView();
            $("#content").html("");
            $("#content").append(loadingIconView.render().el);

            /*
                Only start rendering page once all of the data is ready.
             */
            $.when(
                getMetaData("http://localhost/gosukpop-api/public/MostViewedTracks", "mostViewedTracksMainPage", 8),
                getMetaData("http://localhost/gosukpop-api/public/NewTrackReleases", "newReleaesMainPage", 8),
                getMetaData("http://localhost/gosukpop-api/public/ComingSoonTracks", "comingSoonMainPage", 5)
            ).then(function(mostViewed, newTracks, comingSoon) {
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

        /*
         * Tracks page
         */
        tracksPage : function() {
            console.log("tracks route");
            var tracksPage = new TracksPageController();
            tracksPage.render();
        }
    };

});