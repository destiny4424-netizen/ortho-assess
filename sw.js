// Ortho Assess service worker — only receives files shared to the app (Android share menu).
// It caches nothing, so every visit loads the latest version of the app.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
function inbox() {
  return new Promise((res, rej) => {
    const r = indexedDB.open('oa-inbox', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('files', { autoIncrement: true });
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'POST' || !url.pathname.endsWith('/share-target')) return;
  e.respondWith((async () => {
    try {
      const form = await e.request.formData();
      const files = form.getAll('files').filter(f => f && typeof f === 'object' && f.size);
      const db = await inbox();
      await new Promise((res, rej) => {
        const t = db.transaction('files', 'readwrite');
        for (const f of files) t.objectStore('files').add({ name: f.name, type: f.type, blob: f });
        t.oncomplete = res; t.onerror = () => rej(t.error);
      });
    } catch (err) { /* fall through: the app still opens */ }
    return Response.redirect(new URL('./?shared=1', self.registration.scope).href, 303);
  })());
});
