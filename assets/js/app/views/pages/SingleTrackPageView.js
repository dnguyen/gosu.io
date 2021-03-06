define([
    'helpers/vent',
    'marionette',
    'text!../../templates/SingleTrackPageTemplate.html'
], function(vent, Marionette, SingleTrackPageTemplate) {

    var SingleTrackPageView = Backbone.Marionette.ItemView.extend({
        className : 'app-region',
        template : _.template(SingleTrackPageTemplate),
        events: {
            'click .like' : 'likeClicked',
            'click .dislike' : 'dislikeClicked',
            'click .add' : 'addToClicked'
        },

        onShow : function() {
            if (this.model.get('liked') == 1) {
                $('.vote').addClass('liked');
            } else if (this.model.get('liked') == -1) {
                $('.vote').addClass('disliked');
            } else {
                $('.vote').addClass('neutral');
            }
        },

        likeClicked : function(e) {
            this.trigger('vote', { e : e, vote : 1});
        },

        dislikeClicked : function(e) {
            this.trigger('vote', { e : e , vote : -1 });
        },

        addToClicked : function(e) {
            e.stopPropagation();
            vent.trigger('showTrackAddToMenu', {
                model : this.model,
                event : e
            });
        }
    });

    return SingleTrackPageView;

});