// JARVIS service worker — installs the app to the home screen + offline support.
// NETWORK-FIRST for same-origin files so updates show up immediately when online,
// falling back to cache when offline. API calls are never cached.
const CACHE = 'jarvis-v2';
const SHELL = [
  './',
  './index.html',
  './jarvis-core.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// ── PUSH — Bam reaches the lock screen: approvals, sales, previews ──
self.addEventListener('push', (e) => {
  let d = {}; try { d = e.data.json(); } catch (err) {}
  e.waitUntil(self.registration.showNotification(d.title || 'BAM', {
    body: d.body || '', icon: './icon-192.png', badge: './icon-192.png',
    tag: d.tag || 'bam', data: { url: d.url || './' },
  }));
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    for (const c of list) { if ('focus' in c) return c.focus(); }
    return clients.openWindow(e.notification.data && e.notification.data.url || './');
  }));
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || /api\.groq\.com|api\.openai\.com|discord\.com|gumroad\.com|\/api\/chat/.test(url.href)) return;
  if (url.origin !== location.origin) return;
  // network-first: fresh when online, cached when offline
  e.respondWith(
    fetch(e.request).then((res) => {
      const copy = res.clone();
      if (res.ok) caches.open(CACHE).then((c) => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request).then((hit) => hit || caches.match('./index.html')))
  );
});
