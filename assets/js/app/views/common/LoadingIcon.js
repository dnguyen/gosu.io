define([
    'marionette',
    'text!../../templates/LoadingIconTemplate.html'
], function(Marionette, LoadingIconTemplate) {

    var LoadingIcon = Backbone.Marionette.ItemView.extend({
        className : 'row',
        template: _.template(LoadingIconTemplate)
    });

    return LoadingIcon;

});
