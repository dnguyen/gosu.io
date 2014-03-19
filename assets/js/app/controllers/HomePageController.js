define([
    "helpers/vent",
    "marionette",
    "../views/TrackGroupCollectionView",
    "../views/side_modules/SOTWSideModuleView",
    "../views/side_modules/RadioSideModuleView",
    "../views/side_modules/ModuleListCompositeView",
    "../layouts/SideModulesLayout",
    "../layouts/MainPageLayout"
], function(vent, Marionette, TrackGroupCollectionView, SOTWSideModuleView, RadioSideModuleView, ModuleListCompositeView, SideModulesLayout, MainPageLayout) {

    var HomePageController = function(options) {
        this.popularTracksCollection = options.popularTracksCollection;
        this.comingSoonCollection = options.comingSoonCollection;
        this.newReleasesCollection = options.newReleasesCollection;
    };

    HomePageController.prototype.render = function() {
        console.log("Home page controller render");

        // Render popular tracks
        var popularTracksCompositeView = new TrackGroupCollectionView({
            collection : this.popularTracksCollection,
            size : 4
        });

        // Render new releases
        var newReleasesCollectionView = new TrackGroupCollectionView({
            collection : this.newReleasesCollection,
            size : 4
        });

        // Start rendering content region with our home page layout
        var newMainPageLayout = new MainPageLayout();

        vent.trigger("FinishedLoadingNewPage", { view : newMainPageLayout });

        newMainPageLayout.popular.show(popularTracksCompositeView);
        newMainPageLayout.newReleases.show(newReleasesCollectionView);
        //GosuApp.contentLayout = new MainPageLayout();
        //GosuApp.content.show(GosuApp.contentLayout);
        //GosuApp.contentLayout.popular.show(popularTracksCompositeView);
        //GosuApp.contentLayout.newReleases.show(newReleasesCollectionView);

        // Render side modules
        /*var sideModulesLayout = new SideModulesLayout();
        var sotwView = new SOTWSideModuleView();
        var radioView = new RadioSideModuleView();
        var moduleListView = new ModuleListCompositeView({
            collection : this.comingSoonCollection,
            // Pass module type so we can change the template based on the side module
            // Uses 1 side module view instead of a seperate view file for each side module
            itemViewOptions: {
                moduleType : "coming-soon"
            }
        });

        GosuApp.contentLayout.sideModules.show(sideModulesLayout);
        sideModulesLayout.sotw.show(sotwView);
        sideModulesLayout.radio.show(radioView);
        sideModulesLayout.comingSoon.show(moduleListView);*/

    };

    return HomePageController;
});