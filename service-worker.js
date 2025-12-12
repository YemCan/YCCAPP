const CACHE_NAME = 'ycc-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './English/index.html',
  './English/style.css',
  './English/script.js',
  './Arabic/index.html',
  './Arabic/style.css',
  './Arabic/script.js',
  './icons/40.png',
  './icons/72.png',
  './icons/120.png',
  './icons/256.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});