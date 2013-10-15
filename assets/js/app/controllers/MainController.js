define([
    "namespace",
    "jquery",
    "backbone",
    "marionette",
    "handlebars",
    "../views/HomePageView",
    "../views/TrackGroupCollectionView",
    "../views/side_modules/SOTWSideModuleView",
    "../views/side_modules/RadioSideModuleView",
    "../views/side_modules/ModuleListCompositeView",
    "../layouts/SideModulesLayout"
], function(namespace, $, Backbone, Marionette, Handlebars, HomePageView, TrackGroupCollectionView, SOTWSideModuleView, RadioSideModuleView, ModuleListCompositeView, SideModulesLayout) {

    var GosuApp = namespace.app;

    function LoadMetaCollection(collection, url, count) {
        collection.url = url;
        return collection.fetch({
            data : { count : count }
        });
    }

    return {
        // TODO: put rendering in views
        //       move sidebar logic to its own controller
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

                // Render popular tracks
                var popularTracksCompositeView = new TrackGroupCollectionView({
                    collection : popularTracksCollection
                });

                // Render new releases
                var newReleasesCollectionView = new TrackGroupCollectionView({
                    collection : newReleasesCollection
                });

                // Start rendering content region
                GosuApp.content.show(GosuApp.contentLayout);
                GosuApp.contentLayout.popular.show(popularTracksCompositeView);
                GosuApp.contentLayout.newReleases.show(newReleasesCollectionView);

                // Render side modules
                var sideModulesLayout = new SideModulesLayout();
                var sotwView = new SOTWSideModuleView();
                var radioView = new RadioSideModuleView();
                var moduleListView = new ModuleListCompositeView({
                    collection : comingSoonCollection,
                    // Pass module type so we can change the template based on the side module
                    // Uses 1 side module view instead of a seperate view file for each side module
                    itemViewOptions: {
                        moduleType : "coming-soon"
                    }
                });

                GosuApp.contentLayout.sideModules.show(sideModulesLayout);
                sideModulesLayout.sotw.show(sotwView);
                sideModulesLayout.radio.show(radioView);
                sideModulesLayout.comingSoon.show(moduleListView);
            });

        },

        tracksPage : function() {
            console.log("tracks route");
        }
    };

});