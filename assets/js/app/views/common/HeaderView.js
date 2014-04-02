define([
    'helpers/vent',
    'marionette',
    'text!../../templates/HeaderTemplate.html'
], function(vent, Marionette, HeaderTemplate) {

    var HeaderView = Backbone.Marionette.ItemView.extend({
        template: _.template(HeaderTemplate),
        events: {
            'click .SignOut' : 'signOut'
        },

        initialize : function() {
            console.log('Header view init');
        },

        signOut : function(e) {
            vent.trigger('auth:logout');
        }

    });

    return HeaderView;

});