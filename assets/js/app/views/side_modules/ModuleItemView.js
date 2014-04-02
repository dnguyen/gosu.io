define([
    'underscore',
    'backbone',
    'marionette',
    'text!../../templates/ModuleItemTemplate.html',
    'text!../../templates/ComingSoonModuleItemTemplate.html'
], function(_, Backbone, Marionette, ModuleItemTemplate, ComingSoonModuleItemTemplate) {

    var ModuleItemView = Backbone.Marionette.ItemView.extend({

        tagName : 'li',
        className : 'module-item',

        initialize : function(options) {
            this.model.set('moduleType', options.moduleType);
        },

        /*
            Change template based on the module type option when initializing ModuleListCompositeView
         */
        getTemplate : function() {
            var moduleType = this.model.get('moduleType');
            if (moduleType === 'coming-soon') {
                return _.template(ComingSoonModuleItemTemplate);
            } else {
                return _.template(ModuleItemTemplate);
            }
        }

    });

    return ModuleItemView;

});