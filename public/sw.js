const CACHE_NAME = "bazarlink-v1";
const APP_SHELL = ["/", "/index.html", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// নেটওয়ার্ক-ফার্স্ট: ইন্টারনেট থাকলে সবসময় সর্বশেষ ভার্সন দেখাবে
// (Firestore ডেটা লাইভ থাকা জরুরি), নেট না থাকলে ক্যাশ থেকে অ্যাপ-শেল দেখাবে।
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
        return res;
      })
      .catch(() => caches.match(event.request).then((res) => res || caches.match("/index.html")))
  );
});
