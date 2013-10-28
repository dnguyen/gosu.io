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

    var TracksPageController = function(page, queryObj) {
        this.model = new Backbone.Model();

        // TODO: Move to its own model to handle
        if (typeof queryObj == 'undefined') {
            queryObj = { };
            queryObj.sort = "uploaded";
            queryObj.order = "desc";
        }

        if (typeof page != 'undefined')
            this.model.set("page", page);
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

        console.log(this.model);
    };

    TracksPageController.prototype.render = function() {
        this.model.set("tracksCollection", new Backbone.Collection());
        var that = this;

        $.when(ApiHelper.get(
            "http://localhost/gosukpop-api/public/tracks",
            {
                page : this.model.get("page"),
                sort : this.model.get("sortType"),
                order : this.model.get("orderBy")
            },
            GosuApp.GlobalCache,
            "tracks_p" + this.model.get("page")
        )).then(function(data) {
            that.model.get("tracksCollection").add(data.tracks);
            this.model.set("pageCount", data.pageCount);

            var tracksPageView = new TracksPageView({ model : that.model });
            GosuApp.content.show(tracksPageView);
        });

    };

    return TracksPageController;

});