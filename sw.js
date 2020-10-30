//Installing ServiceWorker
self.addEventListener('install', (event) => {
  console.log('[SERVICE WORKER] HAS BEEN INSTALLED', event);
});

//Activating ServiceWorker
self.addEventListener('activate', (event) => {
  console.log('[SERVICE WORKER] HAS BEEN ACTIVATED', event);
});

//Fetching ServiceWorker
self.addEventListener('fetch', (event) => {
  console.log('[SERVICE WORKER] CURRENTLY FETCHING', event);
});
