var cacheName = 'v1';

// Default files to always cache
var cacheFiles = [
	'./',
	'./index.html',
  './restaurant.html',
	'./js/main.js',
  './js/dbhelper.js',
  './js/restaurant_info.js',
	'./css/styles.css',
	'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700,400italic,700italic'
]


self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Installed');
//wait until promise is resolved
    e.waitUntil(
      // Open the cache
	    caches.open(cacheName).then(function(cache) {

	    	// Add all the default files to the cache
			console.log('[ServiceWorker] Caching cacheFiles');
			return cache.addAll(cacheFiles);
	    })
	); // end e.waitUntil
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activated');

});

self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetching');

});
