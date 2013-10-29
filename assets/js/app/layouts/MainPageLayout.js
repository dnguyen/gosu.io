define([
    "underscore",
    "backbone",
    "marionette",
    "text!../templates/MainPageLayoutTemplate.html"
], function(_, Backbone, Marionette, MainPageLayoutTemplate) {

    var MainPageLayout = Backbone.Marionette.Layout.extend({
        template: _.template(MainPageLayoutTemplate),
        className : "app-region",
        regions : {
            featured : ".featured",
            content : ".content",
            popular : "#popular-group",
            newReleases : "#new-releases-group",
            sideModules : ".side-modules"
        }
    });

    return MainPageLayout;

});