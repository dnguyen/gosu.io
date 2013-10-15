define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "handlebars",
    "text!../../templates/RadioSideModuleTemplate.html"
], function($, _, Backbone, Marionette, Handlebars, RadioSideModuleTemplate) {

    var RadioSideModuleView = Backbone.Marionette.ItemView.extend({

        template : Handlebars.compile(RadioSideModuleTemplate)

    });

    return RadioSideModuleView;

});