define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'text!../../templates/RadioSideModuleTemplate.html'
], function($, _, Backbone, Marionette, RadioSideModuleTemplate) {

    var RadioSideModuleView = Backbone.Marionette.ItemView.extend({

        template : _.template(RadioSideModuleTemplate)

    });

    return RadioSideModuleView;

});