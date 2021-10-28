self.importScripts('./js/indexedDB.js');

// the cache version gets updated every time there is a new deployment
const CACHE_VERSION = 10;
const CURRENT_CACHE = `main-${CACHE_VERSION}`;

// these are the routes we are going to cache for offline support
const cacheFiles = [
  "/",
  "./index.html",
  "./play.html",
  "./css/style.css",
  "./js/main.js",
  "./js/indexedDB.js",
  "./js/game.js",
  "./js/stats.js",
  "./js/pwa.webmanifest",
  "/play/",
  "/stats/",
  "/rules/",
  "./images/paper.png",
  "./images/rock.png",
  "./images/scissors.png"
];

// on activation we clean up the previously registered service workers
self.addEventListener('activate', evt =>
   evt.waitUntil(
      caches.keys().then(cacheNames => {
         return Promise.all(
            cacheNames.map(cacheName => {
               if (cacheName !== CURRENT_CACHE) {
                  return caches.delete(cacheName);
               }
            })
         );
      })
   )
);

// on install we download the files and routes we want to cache
self.addEventListener('install', evt =>
   evt.waitUntil(
      caches.open(CURRENT_CACHE).then(cache => {
         console.log('[Service Worker] Saving resources: ');
         return cache.addAll(cacheFiles);
      })
   )
);

//on fetch we get current items on cache
self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((r) => {
      console.log('[Service Worker] Getting resources: '+evt.request.url);
      return r || fetch(evt.request).then((response) => {
          return caches.open(CURRENT_CACHE).then((cache) => {
            console.log('[Service Worker] Saving new resource: '+evt.request.url);
            cache.put(evt.request, response.clone());
            return response;
        });
      });
    })
  );
});