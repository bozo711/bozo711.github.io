// JARVIS service worker — installs the app to the home screen + offline support.
// NETWORK-FIRST for same-origin files so updates show up immediately when online,
// falling back to cache when offline. API calls are never cached.
// Bump CACHE to force clients onto a new version (they get a "new version" toast).
const CACHE = 'jarvis-v3';
const SHELL = [
  './',
  './index.html',
  './jarvis-core.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './vendor/wasm_exec.js',
  './vendor/forecast.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.all(SHELL.map((u) => c.add(u).catch(() => null))))  // one missing file must not brick the install
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || /api\.groq\.com|api\.openai\.com|api\.telegram\.org|r\.jina\.ai|image\.pollinations\.ai|discord\.com|gumroad\.com|\/api\/chat/.test(url.href)) return;
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
