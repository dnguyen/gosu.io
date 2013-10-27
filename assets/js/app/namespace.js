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
             *  Simple GET request
             *      Also stores the data that was fetched into a cache for faster loading.
             *      Thanks to http://stackoverflow.com/a/8960587 for the caching :)
             *
             *  @param {string} url - url to make ajax request
             *  @param {object} data - data to pass to ajaa request
             *  @param {model} cache - where to get cached data from
             *  @param {string} cacheName - name of the data in cache
             *  @return {jXHR object} Returns either the cached data or data from server.
             */
            get : function(url, data, cache, cacheName) {
                // Store the cache into a promise
                var promise = cache.get(cacheName);

                // If the promise doesn't exist, get it from the server
                if (!promise) {
                    promise = $.ajax(url, {
                        type : 'GET',
                        data : data,
                        dataType : 'json'
                    });

                    // Set the cache to the data that was retrieved.
                    cache.set(cacheName, promise);
                }

                // return the promise
                return promise;
            }
        }
    };

});