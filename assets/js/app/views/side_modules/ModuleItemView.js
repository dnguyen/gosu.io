define([
    "backbone",
    "marionette",
    "handlebars",
    "text!../../templates/ModuleItemTemplate.html",
    "text!../../templates/ComingSoonModuleItemTemplate.html"
], function(Backbone, Marionette, Handlebars, ModuleItemTemplate, ComingSoonModuleItemTemplate) {

    var ModuleItemView = Backbone.Marionette.ItemView.extend({

        tagName : 'li',
        className : 'module-item',

        initialize : function(options) {
            this.model.set("moduleType", options.moduleType);
        },

        /*
            Change template based on the module type option when initializing ModuleListCompositeView
         */
        getTemplate : function() {
            var moduleType = this.model.get("moduleType");
            if (moduleType === "coming-soon") {
                return Handlebars.compile(ComingSoonModuleItemTemplate);
            } else {
                return Handlebars.compile(ModuleItemTemplate);
            }
        }

    });

    return ModuleItemView;

});