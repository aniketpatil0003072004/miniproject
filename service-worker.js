const CACHE_NAME = "todo-cache-v1";
const urlsToCache = [

  "/styles.css",
  "/login.js",
  "/todolist.html",
  "/todo.js",
  "/app.js",
  "/register.html",
  "/register.js",
  "/images/icon-192x192.png",
  "/images/icon-512x512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
