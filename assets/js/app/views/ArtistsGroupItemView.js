define([
    'helpers/vent',
    'marionette',
    'text!../templates/ArtistGroupItemTemplate.html',
    'text!../templates/ArtistGroupListItemTemplate.html'
], function(vent, Marionette, ArtistGroupItemTemplate, ArtistGroupListItemTemplate) {

    var ArtistsGroupItemView = Backbone.Marionette.ItemView.extend({

        tagName : 'div',
        className : 'item',

        template: _.template(ArtistGroupItemTemplate),

        events : {
        },

        initialize: function() {
        },

        onRender: function() {
            if (this.options.renderType === 'list') {
                $(this.el).addClass('listItem');
            }
        },

        getTemplate: function() {
            if (this.options.renderType === 'list') {
                return _.template(ArtistGroupListItemTemplate);
            } else {
                return _.template(ArtistGroupItemTemplate);
            }
        }
    });

    return ArtistsGroupItemView;

});