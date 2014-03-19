/**
 * Controller that handles application level events.
 *     ex: Showing loading icon, updating document title, and opening addtomenu
 */

define([
    "namespace",
    "../views/common/AddToMenuView",
    "../views/common/LoadingIcon"
], function(namespace, AddToMenuView, LoadingIconView) {

    var gosuApp = namespace.app;

    var AppController = function() {
        console.log('initialize appcontroller');
    };

    AppController.prototype.loadNewPage = function(data) {
        gosuApp.vent.trigger("UpdateTitle", data.title ? data.title : null);

        // Add blue indicator to sidebar link for current page
        $(".navigation").children().removeClass("selected");
        $("#" + data.page +"-nav-item").addClass("selected");

        // Show the loading icon
        gosuApp.loadingIconView = new LoadingIconView();
        $("#content").html("");
        $("#content").append(gosuApp.loadingIconView.render().el);
    };

    AppController.prototype.doneLoadingNewPage = function() {
        gosuApp.loadingIconView.close();
    };

    AppController.prototype.updateTitle = function(title) {
        document.title = title ? title + " – " + namespace.config.title : namespace.config.title;
    };

    AppController.prototype.showAddToMenu = function(data) {
        $(".AddToMenu").remove();
        var newAddToMenuView = new AddToMenuView({ model : data.model });
        var $clickedEl = $(data.event.target);
        var offsetLeftAmt = 10;

        $("body").append(newAddToMenuView.render().el);

        // Calculate where to place menu. We want to make sure it doesn't open off screen.
        if ($clickedEl.offset().left + 150 > $(document).width()) {
            offsetLeftAmt = 150;
        }

        $(".AddToMenu").css({
            "left" : ($clickedEl.offset().left - offsetLeftAmt) + "px",
            "top" : ($clickedEl.offset().top - 15) + "px"
        });

        // Close the menu if we click anywhere outside of the AddToMenu element.
        $(document).click(function(e) {
            if ($(e.target).closest('.AddToMenu').length == 0) {
                $(".AddToMenu").remove();
                $(document).unbind("click");
            }
        });
    }

    return AppController;

});