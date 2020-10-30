//Registering ServiceWorker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then((reg) => {
      console.log('[SERVICE WORKER] REGISTERED', reg);
    })
    .catch((err) => {
      console.log('[SERVICE WORKER] NOT REGISTERED', err);
    });
}

//Installing ServiceWorker
self.addEventListener('install', (event) => {
  console.log('[SERVICE WORKER] HAS BEEN INSTALLED', event);
});

//Activating ServiceWorker
self.addEventListener('activate', (event) => {
  console.log('[SERVICE WORKER] HAS BEEN ACTIVATED', event);
});
