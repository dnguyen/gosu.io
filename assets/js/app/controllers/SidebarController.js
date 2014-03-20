define([
    "helpers/vent",
    "marionette",
    "../views/common/SidebarView"
], function(vent, Marionette, SidebarView) {

    var SidebarController = function() {
    };

    SidebarController.prototype.render = function() {
        vent.trigger("renderSidebar", { view : new SidebarView() });
    };

    return SidebarController;

});