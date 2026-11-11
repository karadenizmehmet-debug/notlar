/* Notlar servis çalışanı — Mehmet Karadeniz, 2026-2027 */
const CACHE = 'notlar-v1.1';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/badge-96.png', 'icons/maskable-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Sayfa: önce ağ, olmazsa önbellek (güncellemeler hemen gelsin)
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put('index.html', c)); return r; })
      .catch(() => caches.match('index.html')));
    return;
  }
  // Yazı tipleri ve diğer dosyalar: önce önbellek
  if (url.origin === location.origin || url.host.endsWith('gstatic.com') || url.host.endsWith('googleapis.com')) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (r.ok || r.type === 'opaque') { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); }
      return r;
    })));
  }
});

self.addEventListener('notificationclick', e => {
  const id = e.notification.data?.id;
  const action = e.action || 'open';
  e.notification.close();
  e.waitUntil((async () => {
    const all = await self.clients.matchAll({type: 'window', includeUncontrolled: true});
    if (id && id !== 'test') {
      if (all.length) {
        all[0].postMessage({type: 'action', id, action});
        if (action === 'open') return all[0].focus();
        return;
      }
      if (action === 'open' || action === 'snooze' || action === 'done') {
        return self.clients.openWindow(`./?id=${encodeURIComponent(id)}&action=${action}`);
      }
    }
    if (all.length) return all[0].focus();
    return self.clients.openWindow('./');
  })());
});
