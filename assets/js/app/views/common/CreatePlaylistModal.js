define([
	'namespace',
	'marionette',
	'text!../../templates/CreatePlaylistModal.html'
], function(namespace, Marionette, CreatePlaylistModalTemplate) {

	var CreatePlaylistModal = Marionette.ItemView.extend({

		className: "modal-container",
		template: _.template(CreatePlaylistModalTemplate),
		events: {
			'blur .modal' : 'clicked',
			'click .close' : 'close'
		},

		initialize: function(options) {
			console.log('initialize createplaylistmodal');
            var that = this;
		},

		clicked: function() {
			console.log('blue modal');
		},

		onShow: function() {
		}

	});

	return CreatePlaylistModal;

});