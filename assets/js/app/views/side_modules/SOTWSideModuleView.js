define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "text!../../templates/SOTWSideModuleTemplate.html"
], function($, _, Backbone, Marionette, SOTWSideModuleTemplate) {

    var SOTWSideModuleView = Backbone.Marionette.ItemView.extend({

        template : _.template(SOTWSideModuleTemplate)

    });

    return SOTWSideModuleView;

});