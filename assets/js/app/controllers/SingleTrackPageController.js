define([
    "namespace",
    "jquery",
    "backbone",
    "marionette",
    "../views/pages/SingleTrackPageView"
], function(namespace, $, Backbone, Marionette, SingleTrackPageView) {

    var GosuApp = namespace.app;
    var ApiHelper = namespace.ApiHelper;

    var SingleTrackPageController = function(options) {
        this.model = new Backbone.Model();

        // Redirect to home page if no id is given in the url
        if (typeof options.id === "undefined") {
            window.location = "#";
            return;
        }

        this.model.set("trackId", options.id);
    };

    SingleTrackPageController.prototype.render = function() {
        var that = this;

        $.when(ApiHelper.request(
            "GET",
            "http://localhost/gosukpop-api/public/tracks/" +  that.model.get("trackId"),
            {}
        )).then(function(data) {
            that.model.set("trackData", data);
            var singleTrackPageView = new SingleTrackPageView({ model : that.model });
            GosuApp.content.show(singleTrackPageView);
        });
    };

    return SingleTrackPageController;
});