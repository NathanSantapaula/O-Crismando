// shortcut: cache só do shell (network-first); dados do Supabase sempre online
const C = 'fidelingo-v2'
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(['./', 'icon-192.png', 'manifest.webmanifest']))) })
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()))
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url)
  if (e.request.method !== 'GET' || u.origin !== location.origin) return
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(C).then(c => c.put(e.request, copy)); return r }).catch(() => caches.match(e.request).then(r => r || caches.match('./'))))
})
