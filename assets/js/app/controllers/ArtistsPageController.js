define([
    "helpers/vent",
    "models/Cache",
    "marionette",
    "helpers/ApiHelper",
    "../views/pages/ArtistsPageView"
], function(vent, Cache, Marionette, ApiHelper, ArtistsPageView) {

    var ArtistsPageController = function(options, queryObj) {
        var artistsCollection = new Backbone.Collection(),
            that = this;

        queryObj || (queryObj = { sort: "name", order: "desc" });

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

    ArtistsPageController.prototype.render = function(type) {
        var that = this;
        vent.trigger("StartLoadingNewPage", {
            title: "Artists",
            page : "artists"
        });

        $.when(this.getArtistCollection(type)).then(function(data) {
            that.model.get('artistsCollection').reset(data.artists);
            that.model.set('pageCount', data.pageCount);

            var artistsPageView = new ArtistsPageView({ model : that.model });
            vent.trigger("FinishedLoadingNewPage", { view : artistsPageView });
        });

    };

    ArtistsPageController.prototype.getArtistCollection = function(type, data) {
        if (type === "filter") {
            return ApiHelper.request(
                        "GET",
                        "artists/search/" + this.model.get("searchTerms"),
                        {
                            sort : this.model.get("sortType"),
                            order : this.model.get("orderBy")
                        },
                        Cache,
                        "artists_filter_" + this.model.get("searchTerms") + "_s" + this.model.get("sortType") + "_o" + this.model.get("orderBy"));
        } else {
            return ApiHelper.request(
                        "GET",
                        "artists",
                        {
                            page : this.model.get("page"),
                            sort : this.model.get("sortType"),
                            order : this.model.get("orderBy")
                        },
                        Cache,
                        "artists_p" + this.model.get("page") + "_s" + this.model.get("sortType") + "_o" + this.model.get("orderBy"));
        }
    };

    return ArtistsPageController;
});