define([
    "helpers/vent",
    "models/Cache",
    "marionette",
    "helpers/ApiHelper",
    "../views/pages/TracksPageView"
], function(vent, Cache, Marionette, ApiHelper, TracksPageView) {

    var TracksPageController = function(options, queryObj) {
        console.log('new trackspagecontroller');
        this.model = new Backbone.Model();

        var tracksCollection = new Backbone.Collection();

        this.model.set("tracksCollection", tracksCollection);

        this.model.set("page", parseInt(options.page, 10));

        this.model.set("isFiltering", false);
        this.model.set("searchTerms", "");

        // Set up our model
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

        vent.on("tracks:doFilter", function(data) {
            that.model.set("isFiltering", true);
            that.model.set("searchTerms", data.searchTerms);
            that.render("filter");
        });

        vent.on("tracks:removeFilter", function() {
            that.model.set("isFiltering", false);
            that.model.set("searchTerms", "");
            that.render();
        });
    };

    TracksPageController.prototype.render = function(type) {
        var that = this;

        vent.trigger("StartLoadingNewPage", {
            title: "Tracks",
            page : "tracks"
        });

        $.when(that.getTrackCollection(type)).then(function(data) {
            that.model.get("tracksCollection").reset(data.tracks);

            that.model.set("pageCount", data.pageCount);

            var tracksPageView = new TracksPageView({ model : that.model });

            vent.trigger("FinishedLoadingNewPage", { view : tracksPageView });
        });

    };

    TracksPageController.prototype.getTrackCollection = function(type, data) {
        if (type === "filter") {
            return ApiHelper.request(
                        "GET",
                        "tracks/search/" + this.model.get("searchTerms"),
                        {
                            sort : this.model.get("sortType"),
                            order : this.model.get("orderBy")
                        },
                        Cache,
                        "tracks_filter_" + this.model.get("searchTerms") + "_s" + this.model.get("sortType") + "_o" + this.model.get("orderBy"));
        } else {
            return ApiHelper.request(
                        "GET",
                        "tracks",
                        {
                            page : this.model.get("page"),
                            sort : this.model.get("sortType"),
                            order : this.model.get("orderBy")
                        },
                        Cache,
                        "tracks_p" + this.model.get("page") + "_s" + this.model.get("sortType") + "_o" + this.model.get("orderBy"));
        }
    };

    return TracksPageController;

});