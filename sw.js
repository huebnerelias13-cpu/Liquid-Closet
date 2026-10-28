/* Liquid Closet – Service Worker. Version: 4fb3e49e5e (ändert sich automatisch mit jedem neuen Build) */
const CACHE="liquid-closet-4fb3e49e5e";
const SHELL=["./","index.html","manifest.json","icon-192.png","icon-512.png","icon-maskable-512.png","apple-touch-icon.png","favicon-32.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("liquid-closet-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
async function page(e){const cache=await caches.open(CACHE),net=fetch(e.request).then(r=>{if(r&&r.ok)cache.put("index.html",r.clone());return r});e.waitUntil(net.catch(()=>{}));
const hit=(await cache.match("index.html"))||(await cache.match("./"));if(!hit)return net.catch(()=>Response.error());
try{return await Promise.race([net,new Promise((_,no)=>setTimeout(no,3500))])}catch(err){return hit}}
async function asset(r){const hit=await caches.match(r,{ignoreSearch:true});if(hit)return hit;const res=await fetch(r);if(res&&res.ok){const c=await caches.open(CACHE);c.put(r,res.clone())}return res}
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);if(u.origin!==self.location.origin)return;e.respondWith(r.mode==="navigate"?page(e):asset(r))});
