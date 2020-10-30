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
