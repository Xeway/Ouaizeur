const OFFLINE_VERSION = 1;
const CACHE_NAME = "offline";
const OFFLINE_URL = "offline.html";
const BASE = location.protocol + "//" + location.host;
const CACHED_FILES = [
  "https://cdn.jsdelivr.net/npm/kute.js@2.1.2/dist/kute.min.js"
];

self.addEventListener('install', (event) => {
  event.waitUntil((async() => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(
      [...CACHED_FILES, OFFLINE_URL].map((path) => {
        return cache.add(new Request(path, {cache: "reload"}));
      })
    );
    //await cache.add(new Request(OFFLINE_URL, {cache: "reload"}));
  })());

  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    if ("navigationPreload" in self.registration) {
      await self.registration.navigationPreload.enable();
    }
  })());

  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if(event.request.mode === "navigate") {
    event.respondWith((async() => {
      try {
        const preloadResponse = await event.preloadResponse;
        if(preloadResponse) {
          return preloadResponse;
        }

        return await fetch(event.request);
      } catch(e) {
        const cache = await caches.open(CACHE_NAME);
        return await cache.match(OFFLINE_URL);
      }
    })());
  }
  
  /*else if(CACHED_FILES.includes(event.request.url)) {
    event.respondWith(caches.match(event.request));
  }*/
});