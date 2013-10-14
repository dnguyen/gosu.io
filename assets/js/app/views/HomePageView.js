define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "handlebars",
    "text!../templates/HomePageTemplate.html"
], function($, _, Backbone, Marionette, Handlebars, HomePageTemplate) {

    var HomePageView = Backbone.Marionette.ItemView.extend({
        template: Handlebars.compile(HomePageTemplate),

        initialize : function() {
            console.log("homepage view init");
        }

    });

    return HomePageView;

});