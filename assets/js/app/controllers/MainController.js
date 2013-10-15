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

    return {
        // TODO: put rendering in views
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

            var comingSoonCollection = new Backbone.Collection();
            comingSoonCollection.url = "http://localhost/gosukpop-api/public/ComingSoonTracks";
            comingSoonCollection.fetch({
                data : { count : 5 }
            });
            console.log(comingSoonCollection);
            /*
                Render content layout
             */
            GosuApp.content.show(GosuApp.contentLayout);
            GosuApp.contentLayout.popular.show(popularTracksCompositeView);
            GosuApp.contentLayout.newReleases.show(newReleasesCollectionView);

            /*
                Render side bar modules
             */
            var sideModulesLayout = new SideModulesLayout();
            var sotwView = new SOTWSideModuleView();
            var radioView = new RadioSideModuleView();
            var moduleListView = new ModuleListCompositeView({
                collection : comingSoonCollection,
                itemViewOptions: {
                    moduleType : "coming-soon"
                }
            });

            GosuApp.contentLayout.sideModules.show(sideModulesLayout);
            sideModulesLayout.sotw.show(sotwView);
            sideModulesLayout.radio.show(radioView);
            sideModulesLayout.comingSoon.show(moduleListView);
        },

        tracksPage : function() {
            console.log("tracks route");
        }
    };

});