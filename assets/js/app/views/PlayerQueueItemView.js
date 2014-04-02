define([
    'helpers/vent',
    'namespace',
    'marionette',
    'text!../templates/PlayerQueueItemTemplate.html'
], function(vent, namespace, Marionette, PlayerQueueItemTemplate) {

    var PlayerQueueItemView = Backbone.Marionette.ItemView.extend({
        tagName: 'div',
        className: 'small-item queueItem',

        events: {
            'click .Play' : 'play',
            'click .Remove' : 'removeEvent',
            'click .AddTo' : 'addTo'
        },

        template: _.template(PlayerQueueItemTemplate),

        initialize: function() {
            this.model.bind('destroy', this.destroyView, this);
        },

        play: function(e) {
            vent.trigger('player:changeTrack', this.model);
        },

        removeEvent: function(e) {
            vent.trigger('player:removeFromQueue', this.model);
        },

        addTo: function(e) {
            e.stopPropagation();
            vent.trigger('showTrackAddToMenu', {
                model : this.model,
                event : e
            });
        },

        destroyView: function(e) {
            this.remove();
        }
    });

    return PlayerQueueItemView;

});