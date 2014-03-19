/**
 * Controller that handles application level events.
 *     ex: Showing loading icon, updating document title, and opening addtomenu
 */

define([
    "gosuApp",
    "helpers/vent",
    "namespace",
    "../views/common/AddToMenuView",
    "../views/common/LoadingIcon"
], function(GosuApp, vent, namespace, AddToMenuView, LoadingIconView) {

    var AppController = function() {
        console.log('initialize appcontroller');
    };

    AppController.prototype.loadNewPage = function(data) {
        vent.trigger("UpdateTitle", data.title ? data.title : null);

        // Add blue indicator to sidebar link for current page
        $(".navigation").children().removeClass("selected");
        $("#" + data.page +"-nav-item").addClass("selected");

        // Show the loading icon
        GosuApp.loadingIconView = new LoadingIconView();
        //$("#content").html("");
        GosuApp.content.reset();
        $("#content").append(GosuApp.loadingIconView.render().el);
    };

    AppController.prototype.doneLoadingNewPage = function(data) {
        GosuApp.loadingIconView.close();
        GosuApp.content.show(data.view);
    };

    AppController.prototype.updateTitle = function(title) {
        document.title = title ? title + " – " + namespace.config.title : namespace.config.title;
    };

    AppController.prototype.showHeader = function(data) {
        GosuApp.header.show(data.view);
    };

    AppController.prototype.showAddToMenu = function(data) {
        $(".AddToMenu").remove();
        var newAddToMenuView = new AddToMenuView({ model : data.model });
        var $clickedEl = $(data.event.target);
        var $documentEl = $(document);
        var offsetLeftAmt = 10;

        $("body").append(newAddToMenuView.render().el);

        // Calculate where to place menu. We want to make sure it doesn't open off screen.
        if ($clickedEl.offset().left + 150 > $documentEl.width()) {
            offsetLeftAmt = 150;
        }

        $(".AddToMenu").css({
            "left" : ($clickedEl.offset().left - offsetLeftAmt) + "px",
            "top" : ($clickedEl.offset().top - 15) + "px"
        });

        // Close the menu if we click anywhere outside of the AddToMenu element.
        $documentEl.click(function(e) {
            if ($(e.target).closest('.AddToMenu').length == 0) {
                $(".AddToMenu").remove();
                $documentEl.unbind("click");
            }
        });
    };

    AppController.prototype.showNewModal = function(data) {
        GosuApp.modals.show(data.view);
    };

    return AppController;

});