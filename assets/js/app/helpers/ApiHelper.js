define([
	'namespace'
], function(namespace) {

	var config = namespace.config;

	var ApiHelper = {
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
            var promise;
            // Get the data from cache if it exists
            if (cache)
                promise = cache.get(cacheName);
            else
                promise = false;

            // If the promise doesn't exist, get it from the server
            if (!promise) {
                promise = $.ajax(config.serverUrl + url, {
                    type : type,
                    data : data,
                    dataType : 'json'
                });

                // Set the cache to the data that was retrieved.
                if (cache)
                    cache.set(cacheName, promise);
            }

            // return the promise
            return promise;
        }
	};

	return ApiHelper;

});