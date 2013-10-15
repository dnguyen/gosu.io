define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "handlebars",
    "text!../../templates/SOTWSideModuleTemplate.html"
], function($, _, Backbone, Marionette, Handlebars, SOTWSideModuleTemplate) {

    var SOTWSideModuleView = Backbone.Marionette.ItemView.extend({

        template : Handlebars.compile(SOTWSideModuleTemplate)

    });

    return SOTWSideModuleView;

});