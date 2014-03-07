define([
    'namespace',
    'marionette',
    "../../helpers/ApiHelper",
    'text!../../templates/CreatePlaylistModal.html'
], function(namespace, Marionette, Api, CreatePlaylistModalTemplate) {

    var GosuApp = namespace.app;

    var CreatePlaylistModal = Marionette.ItemView.extend({

        className: "modal-container",
        template: _.template(CreatePlaylistModalTemplate),
        events: {
            "click .create" : "create",
            "click .close" : "close"
        },

        initialize: function(options) {
        },

        onShow: function() {
            var that = this;

            // Clicking document fires after clicking the add button...so add a slight delay before
            // assigning the click event. temporary fix?
            setTimeout(function() {
                // Close the menu if we click anywhere outside of the modal element.
                $(document).click(function(e) {
                    if ($(e.target).closest(".small-modal").length == 0) {
                        that.close();
                        $(document).unbind("click");
                    }
                });
            }, 250);
        },

        create: function(e) {
            var that = this;

            $.when(Api.request("POST", "playlists", {
                token : localStorage.getItem("token"),
                name : $("#name").val(),
                private : $("#private").is(":checked") ? 1 : 0
            })).then(function(data) {
                that.close();
                GosuApp.vent.trigger("playlists:addPlaylist", data);
            })
            .fail(function() {
                console.log("failed to insert");
            });
        }

    });

    return CreatePlaylistModal;

});