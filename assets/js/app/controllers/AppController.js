/**
 * Controller that handles application level events.
 *     ex: Showing loading icon, updating document title, and opening addtomenu
 */

define([
    'models/Client',
    'helpers/vent',
    'namespace',
    '../views/common/AddToMenuView',
    '../views/common/LoadingIcon'
], function(Client, vent, namespace, AddToMenuView, LoadingIconView) {

    var AppController = function() {
        console.log('initialize appcontroller');
    };

    AppController.prototype.setup = function() {

        // Create scrollbar for playlists list on sidebar
        $('.sidebar .scrollable-navigation').css('height', $(document).height() - 610);
        $('.sidebar .scrollable-navigation .playlists').css('height', $(document).height() - 610);

        // Resize playlists list on sidebar when window is resized.
        $(window).on('resize', function() {
            $('.sidebar .scrollable-navigation').css('height', $(this).height() - 610);
            $('.sidebar .scrollable-navigation .playlists').css('height', $(this).height() - 610);
        });
    };

    AppController.prototype.loadNewPage = function(data) {
        vent.trigger('UpdateTitle', data.title ? data.title : null);

        // Add blue indicator to sidebar link for current page
        $('.navigation').children().removeClass('selected');
        $('#' + data.page +'-nav-item').addClass('selected');

        // Show the loading icon
        this.loadingIconView = new LoadingIconView();

        this.content.reset();
        $('#content').append(this.loadingIconView.render().el);
    };

    AppController.prototype.doneLoadingNewPage = function(data) {
        this.loadingIconView.close();
        this.content.show(data.view);
    };

    AppController.prototype.handleSuccessfulAuthentication = function(data) {
        Client.set({
            loggedin : true,
            id : data.id,
            username : data.username,
            token : data.token
        });

        this.headerController.render();
        this.playerController.render();
        this.sidebarController.render();

        this.appController.setup();
    };

    AppController.prototype.handleFailedAuthentication = function(data) {
        Client.set({
            loggedin : false
        });

        this.headerController.render();
        this.playerController.render();
        this.sidebarController.render();

        this.appController.setup();
    };

    AppController.prototype.updateTitle = function(title) {
        document.title = title ? title + ' – ' + namespace.config.title : namespace.config.title;
    };

    AppController.prototype.showHeader = function(data) {
        this.header.show(data.view);
    };

    AppController.prototype.showAddToMenu = function(data) {
        $('.AddToMenu').remove();
        var newAddToMenuView = new AddToMenuView({ model : data.model });
        var $clickedEl = $(data.event.target);
        var $documentEl = $(document);
        var offsetLeftAmt = 10;

        $('body').append(newAddToMenuView.render().el);

        // Calculate where to place menu. We want to make sure it doesn't open off screen.
        if ($clickedEl.offset().left + 150 > $documentEl.width()) {
            offsetLeftAmt = 150;
        }

        $('.AddToMenu').css({
            'left' : ($clickedEl.offset().left - offsetLeftAmt) + 'px',
            'top' : ($clickedEl.offset().top - 15) + 'px'
        });

        // Close the menu if we click anywhere outside of the AddToMenu element.
        $documentEl.click(function(e) {
            if ($(e.target).closest('.AddToMenu').length == 0) {
                $('.AddToMenu').remove();
                $documentEl.unbind("click");
            }
        });
    };

    AppController.prototype.showNewModal = function(data) {
        this.modals.show(data.view);
    };

    AppController.prototype.renderPlayer = function(data) {
        this.player.show(data.view);
    };

    AppController.prototype.renderSidebar = function(data) {
        this.sidebar.show(data.view);
    };

    return AppController;

});