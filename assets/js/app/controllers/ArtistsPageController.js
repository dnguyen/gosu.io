define([
    "helpers/vent",
    "marionette",
    "../views/pages/ArtistsPageView"
], function(vent, Marionette, ArtistsPageView) {

    var ArtistsPageController = function(options, queryObj) {
        var artistsCollection = new Backbone.Collection(),
            that = this;

        queryObj || (queryObj = { sort: "uploaded", order: "desc" });

        this.model = new Backbone.Model();

        this.model.set("artistsCollection", artistsCollection);
        this.model.set("page", parseInt(options.page, 10));
        this.model.set("isFiltering", false);
        this.model.set("searchTerms", "");
        this.model.set("sortType", queryObj.sort);
        this.model.set("orderBy", queryObj.order);

        if (options.page) {
            this.model.set("page", parseInt(options.page, 10));
        } else {
            this.model.set("page", 1);
        }

        vent.on("artists:doFilter", function(data) {
            that.model.set("isFiltering", true);
            that.model.set("searchTerms", data.searchTerms);
            that.render("filter");
        });

        vent.on("artists:removeFilter", function() {
            that.model.set("isFiltering", false);
            that.model.set("searchTerms", "");
            that.render();
        });
    };

    ArtistsPageController.prototype.render = function() {
        vent.trigger("StartLoadingNewPage", {
            title: "Artists",
            page : "artists"
        });
        this.model.set("pageCount", 20);
        var artistsPageView = new ArtistsPageView({ model : this.model });
        vent.trigger("FinishedLoadingNewPage", { view : artistsPageView });

    };

    return ArtistsPageController;
});