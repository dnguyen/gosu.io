define([
    "namespace",
    "jquery",
    "backbone",
    "marionette",
    "controllers/HomePageController"
], function(namespace, $, Backbone, Marionette, HomePageController) {

    var GosuApp = namespace.app;

    function LoadMetaCollection(collection, url, count) {
        collection.url = url;
        return collection.fetch({
            data : { count : count }
        });
    }

    return {
        mainPage : function() {
            var popularTracksCollection = new Backbone.Collection();
            var newReleasesCollection = new Backbone.Collection();
            var comingSoonCollection = new Backbone.Collection();

            /*
                Only start rendering page once all of the data is ready.
             */
            $.when(
                LoadMetaCollection(popularTracksCollection, "http://localhost/gosukpop-api/public/MostViewedTracks", 8),
                LoadMetaCollection(newReleasesCollection, "http://localhost/gosukpop-api/public/NewTrackReleases", 8),
                LoadMetaCollection(comingSoonCollection, "http://localhost/gosukpop-api/public/ComingSoonTracks", 5)
            ).then(function() {
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

        tracksPage : function() {
            console.log("tracks route");
        }
    };

});