// Service worker desligado: ele guardava versões antigas do app no celular.
// Este arquivo existe só para limpar quem ainda tem o antigo instalado.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const k of await caches.keys()) await caches.delete(k)
  await self.registration.unregister()
  for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate(c.url)
})()))
