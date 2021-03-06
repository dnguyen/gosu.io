define([
    'helpers/vent',
    'marionette',
    'moment',
    'helpers/ApiHelper',
    '../views/pages/SingleTrackPageView'
], function(vent, Marionette, moment, ApiHelper, SingleTrackPageView) {

    var SingleTrackPageController = function(options) {
        this.model = new Backbone.Model();

        // Redirect to home page if no id is given in the url
        if (typeof options.id === 'undefined') {
            window.location = '#';
            return;
        }

        this.model.set('trackId', options.id);
    };

    SingleTrackPageController.prototype.render = function() {
        var that = this;
        vent.trigger('StartLoadingNewPage', {
            page : 'tracks'
        });

        $.when(ApiHelper.request(
            'GET',
            'tracks/' +  that.model.get('trackId'),
            {
                token : localStorage.getItem('token')
            }
        )).then(function(data) {
            vent.trigger('UpdateTitle', data.artistName + ' - ' + data.title);

            // Parse and format YouTube's API date using momentjs
            var newDate = new Date(Date.parse(data.uploaded));
            data.uploaded = moment(newDate.getTime()).format('MMM DD, YYYY')

            that.model.set(data);

            var singleTrackPageView = new SingleTrackPageView({ model : that.model });
            singleTrackPageView.on('vote', that.vote);

            vent.trigger('FinishedLoadingNewPage', { view : singleTrackPageView });
        });
    };

    SingleTrackPageController.prototype.vote = function(data) {
        var that = this;
        var voteEl = $('.vote');

        // Just do a basic auth check. Server will check auth when doing a POST vote anyways.
        if (localStorage.getItem('token')) {
            // Update colors of icons based on vote.
            //
            // If user selects same vote, reset vote to neutral
            if ((data.vote === 1 && voteEl.hasClass('liked')) || (data.vote === -1 && voteEl.hasClass('disliked'))) {
                voteEl.removeClass('liked');
                voteEl.removeClass('disliked');
                voteEl.addClass('neutral');
            }
            // If user chooses like, but vote is currently disliked or neutral
            else if (data.vote === 1 && (voteEl.hasClass('disliked') || voteEl.hasClass('neutral'))) {
                voteEl.removeClass('neutral');
                voteEl.removeClass('disliked');
                voteEl.addClass('liked');
            }
            // If user chooses dislike, but vote is currently liked or neutral
            else if (data.vote === -1 && (voteEl.hasClass('liked') || voteEl.hasClass('neutral'))) {
                voteEl.removeClass('neutral');
                voteEl.removeClass('liked');
                voteEl.addClass('disliked');
            }
        } else {
            // If user isn't logged in, redirect to login.
            window.location = '#/signin';
        }

        $.when(ApiHelper.request(
            'POST',
            'votes',
            {
                liked : data.vote,
                trackid : that.model.get('trackId'),
                token : localStorage.getItem('token')
            }
        )).then(function(rtrdata) {
            console.log('like vote done');
            console.log(rtrdata);
        })
        .fail(function(e) {
            console.log('like vote failed');
        });
    };

    return SingleTrackPageController;
});