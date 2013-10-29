define([
    "underscore",
    "backbone",
    "marionette",
    "text!../../templates/ModuleListTemplate.html",
    "views/side_modules/ModuleItemView"
], function(_, Backbone, Marionette, ModuleListTemplate, ModuleItemView) {

    var ModuleListCompositeView = Backbone.Marionette.CompositeView.extend({

        template: _.template(ModuleListTemplate),
        itemView: ModuleItemView,
        itemViewContainer : ".module-list"

    });

    return ModuleListCompositeView;

});