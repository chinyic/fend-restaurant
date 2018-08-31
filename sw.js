var cacheName = 'v1';

// Default files to always cache
var cacheFiles = [
	'./',
	'./index.html',
	'./js/main.js',
//  './js/dbhelper.js',
	'./css/styles.css'
]


self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Installed');
//wait until promise is resolved
    e.waitUntil(
      // Open the cache
	    caches.open(cacheName).then(function(cache) {

	    	// Add all the default files to the cache
			console.log('ServiceWorker Caching cacheFiles');
			return cache.addAll(cacheFiles);
	    })
	); // end e.waitUntil
});

self.addEventListener('activate', function(e) {
    console.log('ServiceWorker Activated');

    e.waitUntil(

       	// Get all the cache keys (cacheName)
   		caches
      .keys()
      .then(function(cacheNames) {
        //return promise that settles when outdated caches are deleted
   			return Promise.all(
          cacheNames
          .map(function(thisCacheName) {

   				// If a cached item does not correspond
   				if (thisCacheName !== cacheName) {

   					// Delete cached file
   					console.log('ServiceWorker deleting outdated cache files', thisCacheName);
   					return caches.delete(thisCacheName);
   				}
   			}));
   		})
   	); // end e.waitUntil
});

self.addEventListener('fetch', function(e) {
    console.log('ServiceWorker fetching', e.request.url);
    // e.respondWith responds to the fetch event
    	e.respondWith(

    		// Check in cache for the request being made
    		caches.match(e.request)

    			.then(function(response) {

    				// If the request is in the cache
    				if (response) {
    					console.log("Found in cache", e.request.url, response);
    					// Return the cached version
    					return response;
    				}

    				// If the request is NOT in the cache, fetch and cache

    				var requestClone = e.request.clone();
    				return fetch(requestClone)
    					.then(function(response) {

    						if ( !response ) {
    							console.log("ServiceWorker no response from fetch ")
    							return response;
    						}
//if we get response clone the response
    						var responseClone = response.clone();

    						//  Open the cache
    						caches.open(cacheName).then(function(cache) {

    							// Put the fetched response in the cache
    							cache.put(e.request, responseClone);
    							console.log('ServiceWorker new data cached', e.request.url);

    							// Return the response
    							return response;

    				        }); // end caches.open

    					})
    					.catch(function(err) {
    						console.log('ServiceWorker error fetching and caching new data', err);
    					});


    			}) // end caches.match(e.request)
    	); // end e.respondWith
});
