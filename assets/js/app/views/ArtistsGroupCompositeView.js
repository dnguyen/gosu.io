define([
    'marionette',
    'views/ArtistsGroupItemView',
    'text!../templates/ArtistGroupCompositeTemplate.html'
], function(Marionette, ArtistGroupItemView, ArtistGroupCompositeTemplate) {

    var ArtistsGroupCompositeView = Backbone.Marionette.CompositeView.extend({
        tagName: 'div',
        className: 'tracks-group-container',
        template: _.template(ArtistGroupCompositeTemplate),
        itemView: ArtistGroupItemView,
        itemViewContainer : '.item-group',

        initialize : function(options) {
            var GroupModel = new Backbone.Model();
            GroupModel.set('renderType', options.renderType);
            this.model = GroupModel;
        },

        itemViewOptions: function(model, index) {
            return {
                renderType: this.model.get('renderType')
            };
        },

        onRender: function() {
            if (this.model.get('renderType') === 'list') {
                $(this.el).find('.item-group').addClass('list');
            }
        }
    });

    return ArtistsGroupCompositeView;

});