define([
    "backbone",
    "marionette",
    "handlebars",
    "text!../templates/MainPageSideModulesTemplate.html"
], function(Backbone, Marionette, Handlebars, MainPageSideModulesTemplate) {

    var SideModulesLayout = Backbone.Marionette.Layout.extend({
        template: Handlebars.compile(MainPageSideModulesTemplate),

        regions : {
            sotw : "#sotw",
            radio : "#radio-side-module",
            comingSoon : "#coming-soon-side-module"
        }
    });

    return SideModulesLayout;

});