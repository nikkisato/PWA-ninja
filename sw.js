const assets = [
  '/',
  '/index.html',
  '/pages/about.html',
  '/pages/contact.html',
  '/css/materialize.min.css',
  '/css/style.css',
  '/src/js/app.js',
  '/src/materialize.min.js',
  '/src/js/ui.js',
  '/img/dish.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
];

const staticCacheName = 'site-static-v1';

//Installing ServiceWorker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

//Activating ServiceWorker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete())
      );
    })
  );
});

//Fetching ServiceWorker
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return cacheRes || fetch(event.request);
    })
  );
});
