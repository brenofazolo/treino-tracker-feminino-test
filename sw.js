const CACHE='treino-feminino-test-v3';
const ASSETS=['./','./index.html','./manifest.json','./config-tools.js','./history-tools.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.pathname.endsWith('/index.html')||u.pathname.endsWith('/')){
    e.respondWith(caches.match('./index.html').then(r=>r||fetch(e.request)).then(async r=>{
      const text=await r.text();
      if(text.includes('history-tools.js'))return new Response(text,{headers:{'Content-Type':'text/html; charset=utf-8'}});
      const injected=text.replace('</body>','<script src="./config-tools.js"></script><script src="./history-tools.js"></script></body>');
      return new Response(injected,{headers:{'Content-Type':'text/html; charset=utf-8'}});
    }));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});