const CACHE_NAME = "branchops-personal-ai-shell-v2";
const APP_SHELL = [
	"/",
	"/index.html",
	"/chat.js",
	"/manifest.webmanifest",
	"/icon.svg",
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)),
	);
	self.skipWaiting();
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) =>
				Promise.all(
					cacheNames
						.filter((cacheName) => cacheName !== CACHE_NAME)
						.map((cacheName) => caches.delete(cacheName)),
				),
			),
	);
	self.clients.claim();
});

self.addEventListener("fetch", (event) => {
	const request = event.request;
	const url = new URL(request.url);

	if (request.method !== "GET" || url.origin !== self.location.origin) {
		return;
	}

	if (url.pathname.startsWith("/api/")) {
		return;
	}

	if (request.mode === "navigate") {
		event.respondWith(
			fetch(request).catch(() => caches.match("/index.html")),
		);
		return;
	}

	event.respondWith(
		caches.match(request).then((cachedResponse) => {
			if (cachedResponse) return cachedResponse;

			return fetch(request).then((networkResponse) => {
				const responseToCache = networkResponse.clone();
				caches
					.open(CACHE_NAME)
					.then((cache) => cache.put(request, responseToCache));
				return networkResponse;
			});
		}),
	);
});
