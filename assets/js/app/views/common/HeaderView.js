define([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "text!../../templates/HeaderTemplate.html"
], function($, _, Backbone, Marionette, HeaderTemplate) {

    var HeaderView = Backbone.Marionette.ItemView.extend({
        template: _.template(HeaderTemplate),

        initialize : function() {
            console.log("Header view init");
        }

    });

    return HeaderView;

});