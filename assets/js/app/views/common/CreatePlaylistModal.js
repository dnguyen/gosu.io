define([
	'namespace',
	'marionette',
	'text!../../templates/CreatePlaylistModal.html'
], function(namespace, Marionette, CreatePlaylistModalTemplate) {

	var CreatePlaylistModal = Marionette.ItemView.extend({

		className: "modal-container",
		template: _.template(CreatePlaylistModalTemplate),
		events: {
			'click .close' : 'close'
		},

		initialize: function(options) {
		},

		onShow: function() {
            var that = this;

            // Clicking document fires after clicking the add button...so introduce a slight delay before
            // assigning the click event. temporary fix?
            setTimeout(function() {
                // Close the menu if we click anywhere outside of the modal element.
                $(document).click(function(e) {
                    if ($(e.target).closest('.small-modal').length == 0) {
                        that.close();
                        $(document).unbind("click");
                    }
                });
            }, 250);
		}

	});

	return CreatePlaylistModal;

});