const CACHE='moneyflow-v2';
const ASSETS=['/', '/index.html', '/manifest.json'];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});

self.addEventListener('fetch', e=>{
  const url=new URL(e.request.url);
  const external=url.hostname.includes('firebase')||url.hostname.includes('googleapis')||url.hostname.includes('gstatic')||url.hostname.includes('tailwindcss')||url.hostname.includes('fonts.g');
  if(external){
    e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(res=>{
    if(res&&res.status===200&&res.type==='basic'){
      const clone=res.clone();
      caches.open(CACHE).then(c=>c.put(e.request,clone));
    }
    return res;
  })));
});
