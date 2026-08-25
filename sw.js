const CACHE='treino-feminino-test-v9';
const ASSETS=['./index.html','./manifest.json','./config-tools.js','./history-tools.js','./workout-input-tools.js','./block-workout-tools.js','./female-enhancements.js','./lances-theme.js'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
function injectTools(text){
  if(!text.includes('config-tools.js'))text=text.replace('</body>','<script src="./config-tools.js"></script></body>');
  if(!text.includes('history-tools.js'))text=text.replace('</body>','<script src="./history-tools.js"></script></body>');
  if(!text.includes('workout-input-tools.js'))text=text.replace('</body>','<script src="./workout-input-tools.js"></script></body>');
  if(!text.includes('block-workout-tools.js'))text=text.replace('</body>','<script src="./block-workout-tools.js"></script></body>');
  if(!text.includes('female-enhancements.js'))text=text.replace('</body>','<script src="./female-enhancements.js"></script></body>');
  if(!text.includes('lances-theme.js'))text=text.replace('</body>','<script src="./lances-theme.js"></script></body>');
  return text;
}
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(url.pathname.endsWith('/index.html')||url.pathname.endsWith('/')){event.respondWith(fetch(event.request,{cache:'no-store'}).then(async response=>new Response(injectTools(await response.text()),{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}})).catch(()=>caches.match('./index.html').then(async response=>{if(!response)return new Response('Offline',{status:503});return new Response(injectTools(await response.text()),{headers:{'Content-Type':'text/html; charset=utf-8'}})})));return;}event.respondWith(fetch(event.request,{cache:'no-store'}).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response;}).catch(()=>caches.match(event.request)));});