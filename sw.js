const CACHE_NAME = "cbc-master-v4";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./script.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];


/* ==================================================
   INSTALL
================================================== */

self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => {

        return cache.addAll(
          FILES_TO_CACHE
        );

      })
      .then(() => {

        return self.skipWaiting();

      })

  );

});


/* ==================================================
   ACTIVATE
================================================== */

self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys()
      .then(keys => {

        return Promise.all(

          keys
            .filter(
              key => key !== CACHE_NAME
            )
            .map(
              key => caches.delete(key)
            )

        );

      })
      .then(() => {

        return self.clients.claim();

      })

  );

});


/* ==================================================
   FETCH
================================================== */

self.addEventListener("fetch", event => {

  if (
    event.request.method !== "GET"
  ) {

    return;

  }


  event.respondWith(

    fetch(event.request)

      .then(networkResponse => {

        if (
          networkResponse &&
          networkResponse.status === 200 &&
          networkResponse.type !== "opaque"
        ) {

          const responseToCache =
            networkResponse.clone();

          caches.open(CACHE_NAME)
            .then(cache => {

              cache.put(
                event.request,
                responseToCache
              );

            });

        }

        return networkResponse;

      })

      .catch(() => {

        return caches.match(
          event.request
        );

      })

  );

});
