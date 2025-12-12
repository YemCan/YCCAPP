const CACHE_NAME = 'ycc-v2';  // Changed version
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
  // Add ALL icons
  './icons/40.png',
  './icons/50.png',
  './icons/72.png',
  './icons/100.png',
  './icons/120.png',
  './icons/256.png',
  './icons/android-launchericon-48-48.png',
  './icons/android-launchericon-72-72.png',
  './icons/android-launchericon-512-512.png'
];
// ... rest of code remains same

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

