const CACHE_NAME = "warung-cache-v1";
const urlsToCache = [
  "index.html",
  "About.html",
  "contact.html",
  "favicon.jpg",
  "icon-192.jpg",
  "icon-512.jpg",
  "1.jpg",
  "2.jpg",
  "3.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Caching files...");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
                  .map(name => caches.delete(name))
      );
    })
  );
});