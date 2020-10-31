const assets = [
  '/',
  '/index.html',
  '/pages/about.html',
  '/pages/contact.html',
  '/pages/fallback.html',
  '/css/materialize.min.css',
  '/css/style.css',
  '/src/js/app.js',
  '/src/materialize.min.js',
  '/src/js/ui.js',
  '/img/dish.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
];
const dynamicCacheName = 'site-dynamic-v1';
const staticCacheName = 'site-static-v3';

//cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    caches.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

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
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete())
      );
    })
  );
});

//Fetching ServiceWorker
self.addEventListener('fetch', (event) => {
  if (event.request.url.indexOf('firestore.googleapis.com') === -1) {
    event.respondWith(
      caches
        .match(event.request)
        .then((cacheRes) => {
          return (
            cacheRes ||
            fetch(event.request).then((fetchRes) => {
              return caches.open(dynamicCacheName).then((cache) => {
                cache.put(event.request.url, fetchRes.clone());
                // check cached items size
                limitCacheSize(dynamicCacheName, 15);
                return fetchRes;
              });
            })
          );
        })
        .catch(() => {
          if (event.request.url.indexOf('.html') > -1) {
            return caches.match('/pages/fallback.html');
          }
        })
    );
  }
});
