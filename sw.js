const CACHE='moneyflow-v3';
const ASSETS=['/', '/index.html', '/manifest.json'];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', e=>{
  const url=new URL(e.request.url);
  const ext=url.hostname.includes('firebase')||url.hostname.includes('googleapis')||
    url.hostname.includes('gstatic')||url.hostname.includes('tailwindcss')||
    url.hostname.includes('fonts.g')||url.hostname.includes('excelapi');
  if(ext){
    e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{
    if(r&&r.status===200&&r.type==='basic'){const cl=r.clone();caches.open(CACHE).then(cache=>cache.put(e.request,cl));}
    return r;
  })));
});
