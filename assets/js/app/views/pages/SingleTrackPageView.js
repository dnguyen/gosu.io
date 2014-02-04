define([
    "namespace",
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "text!../../templates/SingleTrackPageTemplate.html"
], function(namespace, $, _, Backbone, Marionette, SingleTrackPageTemplate) {

    var SingleTrackPageView = Backbone.Marionette.ItemView.extend({
        className : 'app-region',
        template : _.template(SingleTrackPageTemplate)
    });

    return SingleTrackPageView;

});