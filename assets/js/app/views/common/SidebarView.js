define([
    'helpers/vent',
    'models/Client',
    'marionette',
    '../../helpers/ApiHelper',
    './CreatePlaylistModal',
    'text!../../templates/SidebarTemplate.html'
], function(vent, Client, Marionette, Api, CreatePlaylistModal, SidebarTemplate) {

    var SidebarView = Backbone.Marionette.ItemView.extend({
        template: _.template(SidebarTemplate),
        events: {
            'click .add' : 'showNewPlaylistModal'
        },

        initialize : function() {
            console.log('initialize sidebar view');
            this.model = new Backbone.Model();
            this.model.set('client', Client.toJSON());
            vent.on('playlists:addPlaylist', this.addPlaylist, this);
            Client.get('playlists').on('add', this.addPlaylistToSidebar);
        },

        onShow : function() {
            $.when(Api.request('GET', 'user/playlists', { token: localStorage.getItem('token') })).then(function(data) {
                _.each(data, function(playlist) {
                    Client.get('playlists').add(new Backbone.Model({ id : playlist.id, name : playlist.name }));
                });
            });
        },

        showNewPlaylistModal : function(e) {
            // Make sure the user is authenticated before opening modal
            Client.fetch({
                data : $.param({ token : localStorage.getItem('token') }),
                success: function(data) {
                    var newModal = new CreatePlaylistModal();
                    vent.trigger('showNewModal', { view : newModal });
                },
                error: function(data) {
                    window.location = '#/signin';
                    window.location.reload();
                }
            });
        },

        addPlaylist : function(data) {
            var newPlaylistModel = new Backbone.Model({
                id : data.id,
                name : data.name
            });

            Client.get('playlists').add(newPlaylistModel);
        },

        addPlaylistToSidebar : function(model) {
            $('.playlists').append('<li><a href="#/playlists/' + model.get('id') + '">' + model.get('name') + '</a></li>');
        }

    });

    return SidebarView;

});