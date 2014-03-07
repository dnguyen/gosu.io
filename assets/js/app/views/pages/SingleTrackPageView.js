define([
    "namespace",
    "marionette",
    "text!../../templates/SingleTrackPageTemplate.html"
], function(namespace, Marionette, SingleTrackPageTemplate) {

    var SingleTrackPageView = Backbone.Marionette.ItemView.extend({
        className : 'app-region',
        template : _.template(SingleTrackPageTemplate)
    });

    return SingleTrackPageView;

});