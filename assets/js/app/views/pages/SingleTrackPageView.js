define([
    "namespace",
    "marionette",
    "text!../../templates/SingleTrackPageTemplate.html"
], function(namespace, Marionette, SingleTrackPageTemplate) {

    var SingleTrackPageView = Backbone.Marionette.ItemView.extend({
        className : 'app-region',
        template : _.template(SingleTrackPageTemplate),
        events: {
            "click .like" : "likeClicked",
            "click .dislike" : "dislikeClicked"
        },

        onShow : function() {
            console.log(this.model.get('trackData'));
            if (this.model.get("trackData").liked === 1) {
                $(".vote").addClass("liked");
            } else if (this.model.get("trackData").liked === -1) {
                $(".vote").addClass("disliked");
            } else {
                $(".vote").addClass("neutral");
            }
        },

        likeClicked : function(e) {
            this.trigger('vote', { e : e, vote : 1});
        },

        dislikeClicked : function(e) {
            this.trigger('vote', { e : e , vote : -1 });
        }
    });

    return SingleTrackPageView;

});