/*
 * Service Worker — מאפשר התקנה כאפליקציה (PWA) ושימוש בסיסי גם בלי אינטרנט.
 * שים לב: פועל רק כשהאתר מוגש דרך שרת (http/https/localhost) — לא בפתיחת קובץ ישירה (file://).
 */
const CACHE_NAME = 'tezuna-v2';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './nutrition.js',
  './meals.js',
  './brands.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

// אסטרטגיה: קודם רשת, ובלי לקבל קאש HTTP של הדפדפן (no-store) — כדי שתמיד יגיע קובץ טרי
// באמת בזמן פיתוח. נופל חזרה לעותק השמור רק כשאין רשת בכלל.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
