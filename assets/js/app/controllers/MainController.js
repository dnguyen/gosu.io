define([
    "namespace",
    "jquery",
    "backbone",
    "marionette",
    "../views/HomePageView",
    "../views/TrackGroupCollectionView"
], function(namespace, $, Backbone, Marionette, HomePageView, TrackGroupCollectionView) {

    var GosuApp = namespace.app;

    return {
        mainPage : function() {

            /*
                Get popular
                Temp use most viewed.
                TODO: Create popular algorithm
             */
            var popularTracksCollection = new Backbone.Collection();
            popularTracksCollection.url = "http://localhost/gosukpop-api/public/MostViewedTracks";
            popularTracksCollection.fetch({
                data : { count : 8 }
            });

            var popularTracksCompositeView = new TrackGroupCollectionView({
                collection : popularTracksCollection
            });

            /*
                Get new releases
             */
            var newReleasesCollection = new Backbone.Collection();
            newReleasesCollection.url = "http://localhost/gosukpop-api/public/NewTrackReleases";
            newReleasesCollection.fetch({
                data : { count : 8 }
            });

            var newReleasesCollectionView = new TrackGroupCollectionView({
                collection : newReleasesCollection
            });

            GosuApp.content.show(GosuApp.contentLayout);
            GosuApp.contentLayout.popular.show(popularTracksCompositeView);
            GosuApp.contentLayout.newReleases.show(newReleasesCollectionView);
            //GosuApp.content.show(new HomePageView());
        },

        tracksPage : function() {
            console.log("tracks route");
        }
    };

});