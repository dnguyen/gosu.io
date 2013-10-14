define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "handlebars",
    "text!../../templates/HeaderTemplate.html"
], function($, _, Backbone, Marionette, Handlebars, HeaderTemplate) {

    var HeaderView = Backbone.Marionette.ItemView.extend({
        template: Handlebars.compile(HeaderTemplate),

        initialize : function() {
            console.log("Header view init");
        }

    });

    return HeaderView;

});