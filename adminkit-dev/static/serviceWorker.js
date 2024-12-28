const nombreCache = 'ADMINTASK-v7';  // Última versión
const archivos = [
    "/",
    "index.html",
    "login.html",
    "proyecto1.html",
    "./css/app.css",
    "./js/pwa.js"
 
];

// Evento de instalación
self.addEventListener('install', e => {
    console.log('Se instaló el SW');

    e.waitUntil(
        caches.open(nombreCache)
            .then(cache => {
                console.log('Cacheando archivos...');
                return cache.addAll(archivos);
            })
    );
});

// Evento de activación
self.addEventListener('activate', e => {
    console.log('SW activado y actualizado...');

    e.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(
                    keys.filter(key => key !== nombreCache)
                        .map(key => caches.delete(key))
                );
            }).then(() => {
                return self.clients.claim(); // Tomar control inmediato
            })
    );
});

// Interceptar las peticiones de fetch
self.addEventListener('fetch', e => {
    console.log('Fetch:', e.request.url);
    
    e.respondWith(
        caches.match(e.request)
            .then(respuestaCache => {
                return respuestaCache || fetch(e.request).catch(() => caches.match('./error.html'));
            })
    );
});

// Recibir mensajes para forzar el skipWaiting
self.addEventListener('message', (e) => {
    if (e.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});
