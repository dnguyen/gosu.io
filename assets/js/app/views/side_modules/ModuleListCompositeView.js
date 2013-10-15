define([
    "backbone",
    "marionette",
    "handlebars",
    "text!../../templates/ModuleListTemplate.html",
    "views/side_modules/ModuleItemView"
], function(Backbone, Marionette, Handlebars, ModuleListTemplate, ModuleItemView) {

    var ModuleListCompositeView = Backbone.Marionette.CompositeView.extend({

        template: Handlebars.compile(ModuleListTemplate),
        itemView: ModuleItemView,
        itemViewContainer : ".module-list"

    });

    return ModuleListCompositeView;

});