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
    "views/common/LoadingIcon"
], function(namespace, $, Backbone, Marionette, HomePageController, LoadingIconView) {

    var GosuApp = namespace.app;

    /*
        Fetches meta data from API and stores it in a collection.
     */
    function LoadMetaCollection(collection, url, count) {
        collection.url = url;
        return collection.fetch({
            data : { count : count }
        });
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
            $("#content").append(loadingIconView.render().el);

            /*
                Only start rendering page once all of the data is ready.
             */
            $.when(
                LoadMetaCollection(popularTracksCollection, "http://localhost/gosukpop-api/public/MostViewedTracks", 8),
                LoadMetaCollection(newReleasesCollection, "http://localhost/gosukpop-api/public/NewTrackReleases", 8),
                LoadMetaCollection(comingSoonCollection, "http://localhost/gosukpop-api/public/ComingSoonTracks", 5)
            ).then(function() {
                // Properly remove the loading icon.
                loadingIconView.close();
                // Pass all our collections to the home page controller, which will render all the views
                var options = {
                    popularTracksCollection : popularTracksCollection,
                    newReleasesCollection : newReleasesCollection,
                    comingSoonCollection : comingSoonCollection
                };
                var pagecontroler = new HomePageController(options);
                pagecontroler.render();
            });

        },

        /*
         * Tracks page
         */
        tracksPage : function() {
            console.log("tracks route");
        }
    };

});