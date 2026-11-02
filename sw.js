// Service worker: deja la app disponible sin conexión.
// Al cambiar index.html u otro archivo de SHELL, sube VERSION para que los móviles se actualicen.
const VERSION = "vestidor-v1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./img/icon-192.png", "./img/icon-512.png", "./img/apple-touch-icon.png"];
const FONTS = "vestidor-fuentes";

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== FONTS).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // El tiempo siempre en directo (la página guarda el último dato por su cuenta).
  if (url.hostname.endsWith("open-meteo.com")) return;

  if (url.origin === location.origin) {
    // La página: primero la red (para recibir actualizaciones), si no hay conexión, la copia guardada.
    if (req.mode === "navigate") {
      e.respondWith(fetch(req).then(r => {
        if (r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put("./index.html", copy)); }
        return r;
      }).catch(() => caches.match("./index.html")));
      return;
    }
    e.respondWith(caches.match(req, { ignoreSearch: true }).then(r => r || fetch(req)));
    return;
  }

  // Tipografía Inter de Google Fonts: se guarda la primera vez.
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.open(FONTS).then(async c => {
      const hit = await c.match(req);
      if (hit) return hit;
      const r = await fetch(req);
      if (r.ok || r.type === "opaque") c.put(req, r.clone());
      return r;
    }));
  }
});
