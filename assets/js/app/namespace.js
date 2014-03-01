define([
    "marionette"
], function(Marionette) {

    return {
        app : new Marionette.Application(),

        module : function(additionalProps) {
            return _.extend({}, additionalProps);
        },

        config : {
            serverUrl: 'http://localhost/gosukpop-api/public/',
            title: 'gosu.io'
        },

        /**
         *  Helper methods for URLS
         */
        URLHelper : {
            /**
             * Returns the query string as an object.
             * @param  {string} queryString - url query string
             * @return {object} Returns an object with the query string keys as properties
             */
            getQueryObj : function(queryString) {
                if (!_.isString(queryString))
                    return;

                queryString = queryString.substring( queryString.indexOf('?') + 1 );
                var params = {};
                var queryParts = decodeURI(queryString).split(/&/g);

                _.each(queryParts, function(val) {
                    var parts = val.split('=');

                    if (parts.length >= 1) {

                        if (parts.length == 2)
                            val = parts[1];

                        params[parts[0]] = val;
                    }
                });

                return params;
            }
        }
    };

});