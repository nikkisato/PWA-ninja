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
];

const staticCacheName = 'site-static';

//Installing ServiceWorker
self.addEventListener('install', (event) => {
  caches.open(staticCacheName).then((cache) => {
    cache.addAll(assets);
  });
});

//Activating ServiceWorker
self.addEventListener('activate', (event) => {});

//Fetching ServiceWorker
self.addEventListener('fetch', (event) => {});
