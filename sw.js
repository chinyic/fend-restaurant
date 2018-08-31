var cacheName = 'v1';

// Default files to always cache
var cacheFiles = [
	'./',
	'./index.html',
  './restaurant.html',
	'./js/main.js',
  './js/dbhelper.js',
  './js/restaurant_info.js',
	'./css/style.css',
	'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700,400italic,700italic'
]


self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Installed');

});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activated');

});

self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetching');

});
