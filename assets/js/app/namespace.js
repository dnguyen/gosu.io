define([
    "underscore",
    "marionette"
], function(_, Marionette) {

    return {
        app : new Marionette.Application(),

        module : function(additionalProps) {
            return _.extend({}, additionalProps);
        },

        /**
         *  Helper methods for fetching data from the API
         *  TODO: Move to its own file
         */
        ApiHelper : {
            /**
             *  AJAX Request
             *      Also stores the data that was fetched into a cache for faster loading.
             *      Thanks to http://stackoverflow.com/a/8960587 for the caching :)
             *  @param {string} type - request type (GET, POST, DELETE, etc)
             *  @param {string} url - url to make ajax request
             *  @param {object} data - data to pass to ajaa request
             *  @param {model} cache (OPTIONAL) - where to get cached data from
             *  @param {string} cacheName (OPTIONAL) - name of the data in cache
             *  @return {jXHR object} Returns either the cached data or data from server.
             */
            request : function(type, url, data, cache, cacheName) {
                // If no cache argument was passed in, don't aquire or store data in cache.
                var useCache = typeof cache != 'undefined' ? true : false;
                var promise;
                // Get the data from cache if it exists
                if (useCache)
                    promise = cache.get(cacheName);
                else
                    promise = false;

                // If the promise doesn't exist, get it from the server
                if (!promise) {
                    promise = $.ajax(url, {
                        type : type,
                        data : data,
                        dataType : 'json'
                    });

                    // Set the cache to the data that was retrieved.
                    if (useCache)
                        cache.set(cacheName, promise);
                }

                // return the promise
                return promise;
            }
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