define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "handlebars",
    "text!../../templates/ComingSoonSideModuleTemplate.html"
], function($, _, Backbone, Marionette, Handlebars, ComingSoonSideModuleTemplate) {

    var ComingSoonSideModuleView = Backbone.Marionette.CompositeView.extend({

        template : Handlebars.compile(ComingSoonSideModuleTemplate)

    });

    return ComingSoonSideModuleView;

});