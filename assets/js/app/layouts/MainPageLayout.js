define([
    "backbone",
    "marionette",
    "handlebars",
    "text!../templates/MainPageLayoutTemplate.html"
], function(Backbone, Marionette, Handlebars, MainPageLayoutTemplate) {

    var MainPageLayout = Backbone.Marionette.Layout.extend({
        template: Handlebars.compile(MainPageLayoutTemplate),

        regions : {
            featured : ".featured",
            content : ".content",
            popular : "#popular-group",
            newReleases : "#new-releases-group"

        }
    });

    return MainPageLayout;

});