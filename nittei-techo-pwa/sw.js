// 日程手帳 Service Worker — アプリ本体をキャッシュしてオフラインでも起動できるようにする
const VERSION = "v8";
const CORE = ["./", "index.html", "manifest.json", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE.map(u => new Request(u, { cache: "reload" })))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // ページ本体：ネット優先、つながらなければキャッシュ
  if (req.mode === "navigate") {
    // ブラウザの一時保存を使わず毎回サーバーに確認する（更新がすぐ反映される）
    e.respondWith(fetch(req.url, { cache: "no-cache", credentials: "same-origin" }).then(r => {
        if (r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put("index.html", copy)); }
        return r.ok ? r : caches.match("index.html").then(hit => hit || r);
      })
      .catch(() => caches.match("index.html")));
    return;
  }
  // それ以外（アイコン・フォントなど）：キャッシュ優先、なければ取得して保存
  if (url.origin === location.origin || url.hostname.endsWith("fonts.googleapis.com") || url.hostname.endsWith("fonts.gstatic.com")) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (r.ok || r.type === "opaque") { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return r;
    })));
  }
});
