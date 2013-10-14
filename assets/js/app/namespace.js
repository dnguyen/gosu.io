define([
    "underscore",
    "marionette"
], function(_, Marionette) {

    return {
        app : new Marionette.Application(),

        module : function(additionalProps) {
            return _.extend({}, additionalProps);
        }
    };

});