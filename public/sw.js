const CACHE_NAME = 'idea-collision-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Add all images to cache
for (let i = 1; i <= 30; i++) {
  const num = i.toString().padStart(2, '0');
  urlsToCache.push(`/images/spark-${num}.png`);
  urlsToCache.push(`/images/twist-${num}.png`);
  if (i <= 20) urlsToCache.push(`/images/amplify-${num}.png`);
}

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
