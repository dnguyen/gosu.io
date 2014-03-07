define([
    "marionette",
    "text!../templates/MainPageLayoutTemplate.html"
], function(Marionette, MainPageLayoutTemplate) {

    var MainPageLayout = Backbone.Marionette.Layout.extend({
        template: _.template(MainPageLayoutTemplate),
        className : "app-region uk-animation-slide-left",
        regions : {
            featured : ".featured",
            content : ".content",
            popular : "#popular-group",
            newReleases : "#new-releases-group"
            //sideModules : ".side-modules"
        }
    });

    return MainPageLayout;

});