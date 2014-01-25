/*global define*/
define([
    "namespace",
    "jquery",
    "backbone",
    "marionette",
    "../views/pages/ArtistsPageView"
], function(namespace, $, Backbone, Marionette, ArtistsPageView) {

    var GosuApp = namespace.app;
    var ApiHelper = namespace.ApiHelper;

    var ArtistsPageController = function(options, queryObj) {
        this.model = new Backbone.Model();

        var artistsCollection = new Backbone.Collection();

        this.model.set("artistsCollection", artistsCollection);

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

        GosuApp.vent.on("artists:doFilter", function(data) {
            that.model.set("isFiltering", true);
            that.model.set("searchTerms", data.searchTerms);
            that.render("filter");
        });

        GosuApp.vent.on("artists:removeFilter", function() {
            that.model.set("isFiltering", false);
            that.model.set("searchTerms", "");
            that.render();
        });
    };

    return ArtistsPageController;
});