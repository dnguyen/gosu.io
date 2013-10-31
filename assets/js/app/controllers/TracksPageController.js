define([
    "namespace",
    "jquery",
    "backbone",
    "marionette",
    "../layouts/TracksPageLayout",
    "../views/pages/TracksPageView"
], function(namespace, $, Backbone, Marionette, TracksPageLayout, TracksPageView) {

    var GosuApp = namespace.app;
    var ApiHelper = namespace.ApiHelper;

    var TracksPageController = function(options, queryObj) {
        this.model = new Backbone.Model();

        var tracksCollection = new Backbone.Collection();

        this.model.set("tracksCollection", tracksCollection);

        this.model.set("page", parseInt(options.page, 10));

        this.model.set("isFiltering", false);
        this.model.set("searchTerms", "");

        // TODO: Move to its own model to handle
        if (typeof queryObj == 'undefined') {
            queryObj = { };
            queryObj.sort = "uploaded";
            queryObj.order = "desc";
        }

        if (typeof options.page != 'undefined')
            this.model.set("page", parseInt(options.page, 10));
        else
            this.model.set("page", 1);

        if (typeof queryObj.sort != 'undefined')
            this.model.set("sortType", queryObj.sort);
        else
            this.model.set("sortType", "uploaded");

        if (typeof queryObj.order != 'undefined')
            this.model.set("orderBy", queryObj.order);
        else
            this.model.set("orderBy", "desc");

        var that = this;

        GosuApp.vent.on("tracks:doFilter", function(data) {
            that.model.set("isFiltering", true);
            that.model.set("searchTerms", data.searchTerms);
            that.render("filter");
        });

        GosuApp.vent.on("tracks:removeFilter", function() {
            that.model.set("isFiltering", false);
            that.model.set("searchTerms", "");
            that.render();
        });
    };

    TracksPageController.prototype.render = function(type) {
        var that = this;

        GosuApp.vent.trigger("StartLoadingNewPage", { page : "tracks" });

        $.when(that.getTrackCollection(type)).then(function(data) {
            that.model.get("tracksCollection").reset(data.tracks);

            that.model.set("pageCount", data.pageCount);

            GosuApp.vent.trigger("FinishedLoadingNewPage");

            var tracksPageView = new TracksPageView({ model : that.model });
            GosuApp.content.show(tracksPageView);
        });

    };

    TracksPageController.prototype.getTrackCollection = function(type, data) {
        if (type === "filter") {
            return ApiHelper.get(
                        "http://localhost/gosukpop-api/public/tracks/search/" + this.model.get("searchTerms"),
                        {
                            sort : this.model.get("sortType"),
                            order : this.model.get("orderBy")
                        },
                        GosuApp.GlobalCache,
                        "tracks_filter_" + this.model.get("searchTerms") + "_s" + this.model.get("sortType") + "_o" + this.model.get("orderBy"));
        } else {
            return ApiHelper.get(
                        "http://localhost/gosukpop-api/public/tracks",
                        {
                            page : this.model.get("page"),
                            sort : this.model.get("sortType"),
                            order : this.model.get("orderBy")
                        },
                        GosuApp.GlobalCache,
                        "tracks_p" + this.model.get("page") + "_s" + this.model.get("sortType") + "_o" + this.model.get("orderBy"));
        }
    };

    return TracksPageController;

});