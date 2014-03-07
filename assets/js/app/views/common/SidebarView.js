define([
    "namespace",
    "marionette",
    "../../helpers/ApiHelper",
    "./CreatePlaylistModal",
    "text!../../templates/SidebarTemplate.html"
], function(namespace, Marionette, Api, CreatePlaylistModal, SidebarTemplate) {

    var GosuApp = namespace.app;

    var SidebarView = Backbone.Marionette.ItemView.extend({
        template: _.template(SidebarTemplate),
        events: {
            'click .add' : 'showNewPlaylistModal'
        },

        initialize : function() {
            console.log("initialize sidebar view");
            this.model = new Backbone.Model();
            this.model.set("client", GosuApp.Client.toJSON());
            GosuApp.vent.on("playlists:addPlaylist", this.addPlaylist, this);
            GosuApp.Client.get("playlists").on("add", this.addPlaylistToSidebar);
        },

        onShow : function() {
            $.when(Api.request("GET", "user/playlists", { token: localStorage.getItem("token") })).then(function(data) {
                _.each(data, function(playlist) {
                    GosuApp.Client.get("playlists").add(new Backbone.Model({ id : playlist.id, name : playlist.name }));
                });
            });
        },

        showNewPlaylistModal : function(e) {
            console.log('add new playlist');
            // Make sure the user is authenticated before opening modal
            GosuApp.Client.fetch({
                data : $.param({ token : localStorage.getItem("token") }),
                success: function(data) {
                    var newModal = new CreatePlaylistModal();
                    GosuApp.modals.show(newModal);
                },
                error: function(data) {
                    window.location = "#/signin";
                    window.location.reload();
                }
            });
        },

        addPlaylist : function(data) {
            var newPlaylistModel = new Backbone.Model({
                "id" : data.id,
                "name" : data.name
            });

            GosuApp.Client.get("playlists").add(newPlaylistModel);
        },

        addPlaylistToSidebar : function(model) {
            $(".playlists").append('<li><a href="#/playlists/' + model.get("id") + '">' + model.get("name") + '</a></li>');
        }

    });

    return SidebarView;

});