define([
    'helpers/vent',
    'marionette',
    '../TrackGroupCollectionView',
    'text!../../templates/TracksPageLayoutTemplate.html'
], function(vent, Marionette, TrackGroupCollectionView, TracksPageTemplate) {

    var TracksPageView = Backbone.Marionette.ItemView.extend({

        className : 'app-region uk-animation-slide-left',
        template : _.template(TracksPageTemplate),

        events : {
            'keypress #filter-input' : 'filterKeyPress',
            'click .Remove' : 'filterRemove',
            'click .Filter' : 'addFilter',
            'change #sort-dropdown' : 'applySort',
            'change #order-dropdown' : 'applyOrder',
            'click .ThumbView' : 'switchToThumbView',
            'click .ListView' : 'switchToListView'
        },

        initialize : function() {
        },

        onRender : function() {
            if (localStorage.getItem('tracksPage:renderType') === null) {
                localStorage.setItem('tracksPage:renderType', 'thumb');
            }

            // After rendering entire layout, start rendering the tracks
            var trackGroupCollectionView = new TrackGroupCollectionView({
                collection : this.model.get('tracksCollection'),
                renderType : localStorage.getItem('tracksPage:renderType')
            });

            this.$el.find('.content').append(trackGroupCollectionView.render().$el);
        },

        applySort : function() {
            var sort = $('#sort-dropdown').val();
            this.model.set('sortType', sort);
            window.location = '#/tracks/' + this.model.get('page') + '?sort=' + sort + '&order=' + this.model.get('orderBy');
        },

        applyOrder : function() {
            var order = $('#order-dropdown').val();
            this.model.set('orderBy', order);
            window.location = '#/tracks/' + this.model.get('page') + '?sort=' + this.model.get('sortType') + '&order=' + order;
        },

        addFilter : function(e) {
            var searchTerms = $("#filter-input").val();
            vent.trigger("tracks:doFilter", { searchTerms : searchTerms });
        },

        filterKeyPress : function(e) {
            // If enter key is entered while filter input box is focused, do a filter.
            if (e.which === 13) {
                var searchTerms = $('#filter-input').val();
                vent.trigger('tracks:doFilter', { searchTerms : searchTerms });
            }
        },

        filterRemove : function(e) {
            vent.trigger('tracks:removeFilter');
        },

        switchViewType : function(options) {
            localStorage.setItem('tracksPage:renderType', options.viewType);
            $(this.el).find('.content .item-group').empty();

            var trackGroupCollectionView = new TrackGroupCollectionView({
                collection : this.model.get('tracksCollection'),
                renderType : options.viewType
            });

            this.$el.find('.content .item-group').append(trackGroupCollectionView.render().$el);
        },

        switchToThumbView : function(e) {
            this.switchViewType({ viewType: 'thumb' });
        },

        switchToListView : function(e) {
            this.switchViewType({ viewType: 'list' });
        }

    });

    return TracksPageView;

});