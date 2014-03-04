define([
    "namespace",
    "marionette",
    "./CreatePlaylistModal",
    "text!../../templates/SidebarTemplate.html"
], function(namespace, Marionette, CreatePlaylistModal, SidebarTemplate) {

    var GosuApp = namespace.app;

    var SidebarView = Backbone.Marionette.ItemView.extend({
        template: _.template(SidebarTemplate),
        events: {
            'click .add' : 'addNewPlaylist'
        },

        initialize : function() {
        },

        addNewPlaylist : function(e) {
            console.log('add new playlist');
            var newModal = new CreatePlaylistModal();
            GosuApp.modals.show(newModal);
        }

    });

    return SidebarView;

});