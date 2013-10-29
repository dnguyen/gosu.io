define([
    "underscore",
    "backbone",
    "marionette",
    "text!../templates/MainPageSideModulesTemplate.html"
], function(_, Backbone, Marionette, MainPageSideModulesTemplate) {

    var SideModulesLayout = Backbone.Marionette.Layout.extend({
        template: _.template(MainPageSideModulesTemplate),

        regions : {
            sotw : "#sotw",
            radio : "#radio-side-module",
            comingSoon : "#coming-soon-side-module"
        }
    });

    return SideModulesLayout;

});